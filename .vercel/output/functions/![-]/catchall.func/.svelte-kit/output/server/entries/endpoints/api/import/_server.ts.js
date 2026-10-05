import { t as pool } from "../../../../chunks/postgres.js";
import { n as s3, t as MEMBER_MEDIA_BUCKET } from "../../../../chunks/s3.js";
import { json } from "@sveltejs/kit";
import { DeleteObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
//#region src/routes/api/import/+server.ts
function extractEmbeddedImage(value) {
	if (!value.startsWith("data:")) return null;
	const commaIndex = value.indexOf(",");
	if (commaIndex === -1) return null;
	const mimeType = value.slice(5, commaIndex).split(";")[0]?.trim() ?? "";
	if (!mimeType) return null;
	return {
		dataUri: value,
		mimeType
	};
}
function dataUriToBytes(dataUri) {
	const commaIndex = dataUri.indexOf(",");
	if (commaIndex === -1) throw new Error("The embedded image data is malformed.");
	const header = dataUri.slice(0, commaIndex);
	const payload = dataUri.slice(commaIndex + 1);
	if (header.includes(";base64")) {
		const binary = Buffer.from(payload, "base64");
		return new Uint8Array(binary);
	}
	return new TextEncoder().encode(decodeURIComponent(payload));
}
function extensionForMimeType(mimeType) {
	switch (mimeType.toLowerCase()) {
		case "image/jpeg":
		case "image/jpg": return "jpg";
		case "image/gif": return "gif";
		case "image/webp": return "webp";
		case "image/bmp": return "bmp";
		default: return "png";
	}
}
async function uploadEmbeddedImage(memberId, kind, dataUri, mimeType) {
	const key = `members/${memberId}/${kind}.${extensionForMimeType(mimeType)}`;
	const bytes = dataUriToBytes(dataUri);
	await s3.send(new PutObjectCommand({
		Bucket: MEMBER_MEDIA_BUCKET,
		Key: key,
		Body: bytes,
		ContentType: mimeType
	}));
	return key;
}
var POST = async ({ request }) => {
	let importData;
	try {
		importData = await request.json();
	} catch {
		return json({ error: "The import data is invalid." }, { status: 400 });
	}
	const client = await pool.connect();
	const uploadedMedia = [];
	let transactionStarted = false;
	try {
		await client.query("BEGIN");
		transactionStarted = true;
		let imageCount = 0;
		let bannerCount = 0;
		for (const item of importData.members) {
			const member = {
				...item.member,
				avatar: "",
				banner: ""
			};
			if (item.member.avatar) {
				const avatarImage = extractEmbeddedImage(item.member.avatar);
				if (avatarImage) {
					const key = await uploadEmbeddedImage(member.id, "avatar", avatarImage.dataUri, avatarImage.mimeType);
					uploadedMedia.push({ key });
					member.avatar = key;
					imageCount += 1;
				}
			}
			if (item.member.banner) {
				const bannerImage = extractEmbeddedImage(item.member.banner);
				if (bannerImage) {
					const key = await uploadEmbeddedImage(member.id, "banner", bannerImage.dataUri, bannerImage.mimeType);
					uploadedMedia.push({ key });
					member.banner = key;
					bannerCount += 1;
				}
			}
			await client.query(`
					INSERT INTO members (
						id,
						name,
						pronouns,
						aliases,
						role,
						status,
						about,
						interests,
						front_triggers,
						avatar,
						banner,
						is_fronting
					)
					VALUES (
						$1,
						$2,
						$3,
						$4,
						$5,
						$6,
						$7,
						$8,
						$9,
						$10,
						$11,
						$12
					)
				`, [
				member.id,
				member.name,
				member.pronouns,
				JSON.stringify(member.aliases),
				member.role,
				member.status,
				member.about,
				JSON.stringify(member.interests),
				JSON.stringify(member.frontTriggers),
				member.avatar,
				member.banner,
				member.isFronting ? 1 : 0
			]);
			for (const field of member.customFields ?? []) await client.query(`
						INSERT INTO custom_fields (
							id,
							member_id,
							label,
							type,
							value,
							description,
							sort_order
						)
						VALUES (
							$1,
							$2,
							$3,
							$4,
							$5,
							$6,
							$7
						)
					`, [
				field.id,
				member.id,
				field.label,
				field.type,
				field.value,
				field.description,
				field.sortOrder
			]);
		}
		for (const entry of importData.frontHistory) await client.query(`
					INSERT INTO front_history (
						id,
						member_id,
						started_at,
						ended_at,
						note
					)
					VALUES (
						$1,
						$2,
						$3,
						$4,
						$5
					)
				`, [
			entry.id,
			entry.memberId,
			entry.startedAt,
			entry.endedAt,
			entry.note
		]);
		await client.query("COMMIT");
		transactionStarted = false;
		const result = {
			memberCount: importData.members.length,
			frontHistoryCount: importData.frontHistory.length,
			imageCount,
			bannerCount
		};
		return json({ result });
	} catch (error) {
		if (transactionStarted) try {
			await client.query("ROLLBACK");
		} catch {}
		for (const media of uploadedMedia) try {
			await s3.send(new DeleteObjectCommand({
				Bucket: MEMBER_MEDIA_BUCKET,
				Key: media.key
			}));
		} catch {}
		console.error("TECSPA import failed:", error);
		return json({ error: error instanceof Error ? error.message : "The system could not be imported." }, { status: 500 });
	} finally {
		client.release();
	}
};
//#endregion
export { POST };
