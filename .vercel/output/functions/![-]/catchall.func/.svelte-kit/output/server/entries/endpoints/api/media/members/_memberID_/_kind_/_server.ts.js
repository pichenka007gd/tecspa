import { t as pool } from "../../../../../../../chunks/postgres.js";
import { n as s3, t as MEMBER_MEDIA_BUCKET } from "../../../../../../../chunks/s3.js";
import { error } from "@sveltejs/kit";
import { GetObjectCommand } from "@aws-sdk/client-s3";
//#region src/routes/api/media/members/[memberID]/[kind]/+server.ts
function isMediaKind(value) {
	return value === "avatar" || value === "banner";
}
var GET = async ({ params }) => {
	const { memberID, kind } = params;
	if (!memberID || !kind || !isMediaKind(kind)) throw error(400, "Invalid member media request.");
	const result = await pool.query(`
			SELECT avatar, banner
			FROM members
			WHERE id = $1
		`, [memberID]);
	if (result.rows.length === 0) throw error(404, "Member not found.");
	const storedPath = result.rows[0][kind];
	if (!storedPath) throw error(404, "Member does not have this image.");
	const expectedPrefix = `members/${memberID}/${kind}.`;
	if (!storedPath.startsWith(expectedPrefix)) throw error(404, "Member media was not found.");
	const object = await s3.send(new GetObjectCommand({
		Bucket: MEMBER_MEDIA_BUCKET,
		Key: storedPath
	}));
	if (!object.Body) throw error(404, "Member media was not found.");
	const bytes = await object.Body.transformToByteArray();
	const arrayBuffer = new ArrayBuffer(bytes.byteLength);
	new Uint8Array(arrayBuffer).set(bytes);
	return new Response(arrayBuffer, { headers: {
		"Content-Type": object.ContentType ?? "application/octet-stream",
		"Cache-Control": "private, max-age=3600"
	} });
};
//#endregion
export { GET };
