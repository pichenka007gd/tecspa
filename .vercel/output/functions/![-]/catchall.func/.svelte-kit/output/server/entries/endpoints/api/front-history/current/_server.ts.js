import { t as pool } from "../../../../../chunks/postgres.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/front-history/current/+server.ts
function mapFrontHistoryRow(row) {
	return {
		id: row.id,
		memberId: row.member_id,
		startedAt: row.started_at,
		endedAt: row.ended_at,
		note: row.note ?? ""
	};
}
async function GET() {
	const result = await pool.query(`
			SELECT
				id,
				member_id,
				started_at,
				ended_at,
				note
			FROM front_history
			WHERE ended_at IS NULL
			ORDER BY started_at ASC
		`);
	return json(result.rows.map(mapFrontHistoryRow));
}
//#endregion
export { GET };
