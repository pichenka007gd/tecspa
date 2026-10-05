import { json } from '@sveltejs/kit';

import { pool } from '$lib/server/db/postgres';

type FrontHistoryRow = {
	id: string;
	member_id: string;
	started_at: string;
	ended_at: string | null;
	note: string;
};

function mapFrontHistoryRow(row: FrontHistoryRow) {
	return {
		id: row.id,
		memberId: row.member_id,
		startedAt: row.started_at,
		endedAt: row.ended_at,
		note: row.note ?? ''
	};
}

export async function GET() {
	const result = await pool.query<FrontHistoryRow>(
		`
			SELECT
				id,
				member_id,
				started_at,
				ended_at,
				note
			FROM front_history
			WHERE ended_at IS NULL
			ORDER BY started_at ASC
		`
	);

	return json(
		result.rows.map(mapFrontHistoryRow)
	);
}