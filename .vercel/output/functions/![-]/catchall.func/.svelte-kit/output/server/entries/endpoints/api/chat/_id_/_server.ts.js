import { t as pool } from "../../../../../chunks/postgres.js";
import { error, json } from "@sveltejs/kit";
//#region src/routes/api/chat/[id]/+server.ts
function mapChatMessageRow(row) {
	return {
		id: row.id,
		senderMemberId: row.sender_member_id,
		message: row.message,
		createdAt: row.created_at,
		editedAt: row.edited_at
	};
}
var PATCH = async ({ request, params }) => {
	const body = await request.json();
	const message = typeof body.message === "string" ? body.message.trim() : "";
	if (!message) return json({ error: "Message cannot be empty." }, { status: 400 });
	const editedAt = (/* @__PURE__ */ new Date()).toISOString();
	const result = await pool.query(`
			UPDATE chat_messages
			SET
				message = $1,
				edited_at = $2
			WHERE id = $3
			RETURNING
				id,
				sender_member_id,
				message,
				created_at,
				edited_at
		`, [
		message,
		editedAt,
		params.id
	]);
	if (result.rows.length === 0) throw error(404, "Chat message not found.");
	return json({ message: mapChatMessageRow(result.rows[0]) });
};
var DELETE = async ({ params }) => {
	if ((await pool.query(`
			DELETE FROM chat_messages
			WHERE id = $1
		`, [params.id])).rowCount === 0) throw error(404, "Chat message not found.");
	return new Response(null, { status: 204 });
};
//#endregion
export { DELETE, PATCH };
