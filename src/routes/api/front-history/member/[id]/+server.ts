import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

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

export const GET: RequestHandler = async ({ params }) => {
	const { id } = params;

	if (!id) {
		throw error(400, 'Missing member ID.');
	}

	const result = await pool.query<FrontHistoryRow>(
		`
			SELECT
				id,
				member_id,
				started_at,
				ended_at,
				note
			FROM front_history
			WHERE member_id = $1
			ORDER BY started_at DESC
		`,
		[id]
	);

	return json(result.rows.map(mapFrontHistoryRow));
};

export const PATCH: RequestHandler = async ({
	params,
	request
}) => {
	const { id } = params;

	if (!id) {
		throw error(400, 'Missing front history entry ID.');
	}

	const body = (await request.json()) as {
		note?: unknown;
	};

	if (typeof body.note !== 'string') {
		throw error(400, 'Note must be a string.');
	}

	const result = await pool.query<FrontHistoryRow>(
		`
			UPDATE front_history
			SET note = $1
			WHERE id = $2
			RETURNING
				id,
				member_id,
				started_at,
				ended_at,
				note
		`,
		[body.note, id]
	);

	if (result.rows.length === 0) {
		throw error(404, 'Front history entry not found.');
	}

	return json(mapFrontHistoryRow(result.rows[0]));
};

export const DELETE: RequestHandler = async ({ params }) => {
	const { id } = params;

	if (!id) {
		throw error(400, 'Missing front history entry ID.');
	}

	const result = await pool.query(
		`
			DELETE FROM front_history
			WHERE id = $1
		`,
		[id]
	);

	if (result.rowCount === 0) {
		throw error(404, 'Front history entry not found.');
	}

	return json({
		ok: true
	});
};