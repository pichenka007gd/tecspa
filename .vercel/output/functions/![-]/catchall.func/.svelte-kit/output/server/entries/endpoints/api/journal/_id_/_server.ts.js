import { t as pool } from "../../../../../chunks/postgres.js";
import { error, json } from "@sveltejs/kit";
//#region src/routes/api/journal/[id]/+server.ts
function parseTags(value) {
	if (Array.isArray(value)) return value.filter((item) => typeof item === "string");
	if (typeof value === "string") try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed.filter((item) => typeof item === "string") : [];
	} catch {
		return [];
	}
	return [];
}
function mapJournalEntryRow(row) {
	return {
		id: row.id,
		authorMemberId: row.author_member_id,
		entryType: row.entry_type === "note" ? "note" : "journal",
		title: row.title ?? "",
		body: row.body ?? "",
		tags: parseTags(row.tags),
		isPinned: Boolean(row.is_pinned),
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}
var GET = async ({ params }) => {
	const { id } = params;
	if (!id) throw error(400, "Journal entry ID is required.");
	const result = await pool.query(`
			SELECT
				id,
				author_member_id,
				entry_type,
				title,
				body,
				tags,
				is_pinned,
				created_at,
				updated_at
			FROM journal_entries
			WHERE id = $1
		`, [id]);
	if (result.rows.length === 0) throw error(404, "Journal entry not found.");
	return json(mapJournalEntryRow(result.rows[0]));
};
var PATCH = async ({ params, request }) => {
	const { id } = params;
	if (!id) throw error(400, "Journal entry ID is required.");
	const body = await request.json();
	const authorMemberId = typeof body.authorMemberId === "string" ? body.authorMemberId : null;
	const entryType = body.entryType === "note" ? "note" : "journal";
	const title = typeof body.title === "string" ? body.title : "";
	const entryBody = typeof body.body === "string" ? body.body : "";
	const tags = Array.isArray(body.tags) ? body.tags.filter((item) => typeof item === "string") : [];
	const isPinned = body.isPinned === true ? 1 : 0;
	const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
	const result = await pool.query(`
			UPDATE journal_entries
			SET
				author_member_id = $1,
				entry_type = $2,
				title = $3,
				body = $4,
				tags = $5,
				is_pinned = $6,
				updated_at = $7
			WHERE id = $8
			RETURNING
				id,
				author_member_id,
				entry_type,
				title,
				body,
				tags,
				is_pinned,
				created_at,
				updated_at
		`, [
		authorMemberId,
		entryType,
		title,
		entryBody,
		JSON.stringify(tags),
		isPinned,
		updatedAt,
		id
	]);
	if (result.rows.length === 0) throw error(404, "Journal entry not found.");
	return json(mapJournalEntryRow(result.rows[0]));
};
var DELETE = async ({ params }) => {
	const { id } = params;
	if (!id) throw error(400, "Journal entry ID is required.");
	if ((await pool.query(`
			DELETE FROM journal_entries
			WHERE id = $1
			RETURNING id
		`, [id])).rows.length === 0) throw error(404, "Journal entry not found.");
	return new Response(null, { status: 204 });
};
//#endregion
export { DELETE, GET, PATCH };
