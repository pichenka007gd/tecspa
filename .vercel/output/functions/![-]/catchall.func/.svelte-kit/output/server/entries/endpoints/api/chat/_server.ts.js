import { t as pool } from "../../../../chunks/postgres.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/chat/+server.ts
function mapChatMessageRow(row) {
	return {
		id: row.id,
		senderMemberId: row.sender_member_id,
		message: row.message,
		createdAt: row.created_at,
		editedAt: row.edited_at
	};
}
async function GET() {
	const result = await pool.query(`
			SELECT
				id,
				sender_member_id,
				message,
				created_at,
				edited_at
			FROM chat_messages
			ORDER BY created_at ASC
		`);
	return json({ messages: result.rows.map(mapChatMessageRow) });
}
var POST = async ({ request }) => {
	const body = await request.json();
	const senderMemberId = typeof body.senderMemberId === "string" ? body.senderMemberId : "";
	const message = typeof body.message === "string" ? body.message.trim() : "";
	if (!senderMemberId) return json({ error: "A sender member is required." }, { status: 400 });
	if (!message) return json({ error: "Message cannot be empty." }, { status: 400 });
	const id = crypto.randomUUID();
	const createdAt = (/* @__PURE__ */ new Date()).toISOString();
	const result = await pool.query(`
			INSERT INTO chat_messages (
				id,
				sender_member_id,
				message,
				created_at,
				edited_at
			)
			VALUES (
				$1,
				$2,
				$3,
				$4,
				NULL
			)
			RETURNING
				id,
				sender_member_id,
				message,
				created_at,
				edited_at
		`, [
		id,
		senderMemberId,
		message,
		createdAt
	]);
	if (result.rows.length === 0) return json({ error: "Failed to create chat message." }, { status: 500 });
	return json({ message: mapChatMessageRow(result.rows[0]) }, { status: 201 });
};
//#endregion
export { GET, POST };
