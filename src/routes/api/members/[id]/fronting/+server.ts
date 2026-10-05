import { json } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';

import { pool } from '$lib/server/db/postgres';

export async function PUT({
	params,
	request
}: {
	params: { id: string };
	request: Request;
}) {
	const { id } = params;

	if (!id) {
		throw error(400, 'Member ID is required.');
	}

	const body = await request.json();

	if (typeof body.isFronting !== 'boolean') {
		throw error(
			400,
			'isFronting must be a boolean.'
		);
	}

	const client = await pool.connect();

	try {
		await client.query('BEGIN');

		const memberResult = await client.query<{
			is_fronting: boolean;
		}>(
			`
				SELECT is_fronting
				FROM members
				WHERE id = $1
				FOR UPDATE
			`,
			[id]
		);

		if (memberResult.rows.length === 0) {
			await client.query('ROLLBACK');

			throw error(404, 'Member not found.');
		}

		const currentlyFronting =
			memberResult.rows[0].is_fronting;

		if (currentlyFronting === body.isFronting) {
			await client.query('COMMIT');

			return json({ ok: true });
		}

		await client.query(
			`
				UPDATE members
				SET is_fronting = $1
				WHERE id = $2
			`,
			[body.isFronting ? 1 : 0, id]
		);

		const now = new Date().toISOString();

		if (body.isFronting) {
			await client.query(
				`
					INSERT INTO front_history (
						id,
						member_id,
						started_at,
						ended_at,
						note
					)
					VALUES (
						$1,
						$2,
						$3,
						NULL,
						''
					)
				`,
				[
					crypto.randomUUID(),
					id,
					now
				]
			);
		} else {
			await client.query(
				`
					UPDATE front_history
					SET ended_at = $1
					WHERE id = (
						SELECT id
						FROM front_history
						WHERE member_id = $2
							AND ended_at IS NULL
						ORDER BY started_at DESC
						LIMIT 1
					)
				`,
				[now, id]
			);
		}

		await client.query('COMMIT');

		return json({ ok: true });
	} catch (error) {
		try {
			await client.query('ROLLBACK');
		} catch {
			// Ignore rollback errors.
		}

		throw error;
	} finally {
		client.release();
	}
}