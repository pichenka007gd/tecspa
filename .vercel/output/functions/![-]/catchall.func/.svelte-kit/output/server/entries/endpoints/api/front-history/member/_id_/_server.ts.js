import { t as pool } from "../../../../../../chunks/postgres.js";
import { error, json } from "@sveltejs/kit";
//#region src/routes/api/front-history/member/[id]/+server.ts
function mapFrontHistoryRow(row) {
	return {
		id: row.id,
		memberId: row.member_id,
		startedAt: row.started_at,
		endedAt: row.ended_at,
		note: row.note ?? ""
	};
}
var GET = async ({ params }) => {
	const { id } = params;
	if (!id) throw error(400, "Missing member ID.");
	const result = await pool.query(`
			SELECT
				id,
				member_id,
				started_at,
				ended_at,
				note
			FROM front_history
			WHERE member_id = $1
			ORDER BY started_at DESC
		`, [id]);
	return json(result.rows.map(mapFrontHistoryRow));
};
var PATCH = async ({ params, request }) => {
	const { id } = params;
	if (!id) throw error(400, "Missing front history entry ID.");
	const body = await request.json();
	if (typeof body.note !== "string") throw error(400, "Note must be a string.");
	const result = await pool.query(`
			UPDATE front_history
			SET note = $1
			WHERE id = $2
			RETURNING
				id,
				member_id,
				started_at,
				ended_at,
				note
		`, [body.note, id]);
	if (result.rows.length === 0) throw error(404, "Front history entry not found.");
	return json(mapFrontHistoryRow(result.rows[0]));
};
var DELETE = async ({ params }) => {
	const { id } = params;
	if (!id) throw error(400, "Missing front history entry ID.");
	if ((await pool.query(`
			DELETE FROM front_history
			WHERE id = $1
		`, [id])).rowCount === 0) throw error(404, "Front history entry not found.");
	return json({ ok: true });
};
//#endregion
export { DELETE, GET, PATCH };
