import { t as pool } from "../../../../../chunks/postgres.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/members/[id]/+server.ts
var GET = async ({ params }) => {
	const memberId = params.id;
	try {
		const memberResult = await pool.query(`
				SELECT
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
				FROM members
				WHERE id = $1
				LIMIT 1;
			`, [memberId]);
		if (memberResult.rows.length === 0) return json({ error: "Member not found." }, { status: 404 });
		const member = memberResult.rows[0];
		const customFieldsResult = await pool.query(`
				SELECT
					id,
					member_id,
					label,
					type,
					value,
					description,
					sort_order
				FROM custom_fields
				WHERE member_id = $1
				ORDER BY sort_order;
			`, [memberId]);
		return json({
			id: member.id,
			name: member.name,
			pronouns: member.pronouns,
			aliases: JSON.parse(member.aliases),
			role: member.role,
			status: member.status,
			about: member.about,
			interests: JSON.parse(member.interests),
			frontTriggers: JSON.parse(member.front_triggers),
			avatar: member.avatar,
			banner: member.banner,
			isFronting: Boolean(member.is_fronting),
			customFields: customFieldsResult.rows.map((field) => ({
				id: field.id,
				memberId: field.member_id,
				label: field.label,
				type: field.type,
				value: field.value,
				description: field.description,
				sortOrder: field.sort_order
			}))
		});
	} catch (error) {
		console.error("Failed to load member:", error);
		return json({ error: "Failed to load member." }, { status: 500 });
	}
};
//#endregion
export { GET };
