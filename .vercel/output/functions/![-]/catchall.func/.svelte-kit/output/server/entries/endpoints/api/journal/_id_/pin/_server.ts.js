import { t as pool } from "../../../../../../chunks/postgres.js";
import { error, json } from "@sveltejs/kit";
//#region src/routes/api/journal/[id]/pin/+server.ts
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
var PATCH = async ({ params, request }) => {
	const { id } = params;
	if (!id) throw error(400, "Journal entry ID is required.");
	const body = await request.json();
	if (typeof body.isPinned !== "boolean") throw error(400, "isPinned must be a boolean.");
	const isPinned = body.isPinned ? 1 : 0;
	const updatedAt = (/* @__PURE__ */ new Date()).toISOString();
	const result = await pool.query(`
			UPDATE journal_entries
			SET
				is_pinned = $1,
				updated_at = $2
			WHERE id = $3
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
		isPinned,
		updatedAt,
		id
	]);
	if (result.rows.length === 0) throw error(404, "Journal entry not found.");
	return json(mapJournalEntryRow(result.rows[0]));
};
//#endregion
export { PATCH };
