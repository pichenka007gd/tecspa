import { t as pool } from "../../../../../chunks/postgres.js";
import { error, json } from "@sveltejs/kit";
//#region src/routes/api/front-history/[id]/+server.ts
var PATCH = async ({ params, request }) => {
	const { id } = params;
	if (!id) throw error(400, "Front history entry ID is required.");
	const body = await request.json();
	const note = typeof body.note === "string" ? body.note.trim() : null;
	if (note === null) throw error(400, "A note string is required.");
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
		`, [note, id]);
	if (result.rows.length === 0) throw error(404, "Front history entry not found.");
	return json({
		id: result.rows[0].id,
		memberId: result.rows[0].member_id,
		startedAt: result.rows[0].started_at,
		endedAt: result.rows[0].ended_at,
		note: result.rows[0].note ?? ""
	});
};
var DELETE = async ({ params }) => {
	const { id } = params;
	if (!id) throw error(400, "Front history entry ID is required.");
	if ((await pool.query(`
			DELETE FROM front_history
			WHERE id = $1
			RETURNING id
		`, [id])).rows.length === 0) throw error(404, "Front history entry not found.");
	return new Response(null, { status: 204 });
};
//#endregion
export { DELETE, PATCH };
