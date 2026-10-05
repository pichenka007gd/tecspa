import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { pool } from '$lib/server/db/postgres';
type JournalEntryRow = {
	id: string;
	author_member_id: string | null;
	entry_type: 'journal' | 'note';
	title: string;
	body: string;
	tags: string[] | null;
	is_pinned: boolean;
	created_at: string;
	updated_at: string;
};

function parseTags(value: unknown): string[] {
	if (Array.isArray(value)) {
		return value.filter(
			(item): item is string =>
				typeof item === 'string'
		);
	}

	if (typeof value === 'string') {
		try {
			const parsed = JSON.parse(value);

			return Array.isArray(parsed)
				? parsed.filter(
						(item): item is string =>
							typeof item === 'string'
					)
				: [];
		} catch {
			return [];
		}
	}

	return [];
}

function mapJournalEntryRow(
	row: JournalEntryRow
) {
	return {
		id: row.id,
		authorMemberId: row.author_member_id,
		entryType:
			row.entry_type === 'note'
				? 'note'
				: 'journal',
		title: row.title ?? '',
		body: row.body ?? '',
		tags: parseTags(row.tags),
		isPinned: Boolean(row.is_pinned),
		createdAt: row.created_at,
		updatedAt: row.updated_at
	};
}

export async function GET() {
	const result = await pool.query<JournalEntryRow>(
		`
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
			ORDER BY
				is_pinned DESC,
				created_at DESC
		`
	);

	return json(
		result.rows.map(mapJournalEntryRow)
	);
}

export const POST: RequestHandler = async ({
	request
}) => {
	const body = await request.json();

	const authorMemberId =
		typeof body.authorMemberId === 'string'
			? body.authorMemberId
			: null;

	const entryType =
		body.entryType === 'note'
			? 'note'
			: 'journal';

	const title =
		typeof body.title === 'string'
			? body.title
			: '';

	const entryBody =
		typeof body.body === 'string'
			? body.body
			: '';

	const tags = Array.isArray(body.tags)
		? body.tags.filter(
				(item: unknown): item is string =>
					typeof item === 'string'
			)
		: [];

	const isPinned =
		body.isPinned === true
			? 1
			: 0;

	const id = crypto.randomUUID();
	const now = new Date().toISOString();

	const result = await pool.query<JournalEntryRow>(
		`
			INSERT INTO journal_entries (
				id,
				author_member_id,
				entry_type,
				title,
				body,
				tags,
				is_pinned,
				created_at,
				updated_at
			)
			VALUES (
				$1,
				$2,
				$3,
				$4,
				$5,
				$6,
				$7,
				$8,
				$9
			)
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
		`,
		[
			id,
			authorMemberId,
			entryType,
			title,
			entryBody,
			JSON.stringify(tags),
			isPinned,
			now,
			now
		]
	);

	if (result.rows.length === 0) {
		throw error(
			500,
			'Failed to create journal entry.'
		);
	}

	return json(
		mapJournalEntryRow(result.rows[0]),
		{ status: 201 }
	);
};