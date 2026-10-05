import { json } from '@sveltejs/kit';

import { pool } from '$lib/server/db/postgres';

export async function GET() {
	try {
		const membersResult = await pool.query(`
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
			ORDER BY name;
		`);

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
			ORDER BY member_id, sort_order;
		`);

		const customFieldsByMember = new Map<
			string,
			typeof customFieldsResult.rows
		>();

		for (const field of customFieldsResult.rows) {
			const fields = customFieldsByMember.get(field.member_id) ?? [];
			fields.push(field);
			customFieldsByMember.set(field.member_id, fields);
		}

		const members = membersResult.rows.map((member) => ({
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
			customFields: customFieldsByMember.get(member.id) ?? []
		}));

		return json(members);
	} catch (error) {
		console.error('Failed to load members:', error);

		return json(
			{
				error: 'Failed to load members.'
			},
			{ status: 500 }
		);
	}
}