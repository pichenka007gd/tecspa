import { getDatabase } from '../db/database';

export type FrontHistoryEntry = {
	id: string;
	memberId: string;
	startedAt: string;
	endedAt: string | null;
	note: string;
};

function databaseRowToFrontHistory(
	row: any
): FrontHistoryEntry {
	return {
		id: row.id,
		memberId: row.member_id,
		startedAt: row.started_at,
		endedAt: row.ended_at ?? null,
		note: row.note ?? ''
	};
}

export async function getFrontHistory(): Promise<
	FrontHistoryEntry[]
> {
	const db = await getDatabase();

	const rows = await db.select<any[]>(
		`
			SELECT *
			FROM front_history
			ORDER BY started_at DESC
		`
	);

	return rows.map(databaseRowToFrontHistory);
}

export async function getFrontHistoryForMember(
	memberId: string
): Promise<FrontHistoryEntry[]> {
	const db = await getDatabase();

	const rows = await db.select<any[]>(
		`
			SELECT *
			FROM front_history
			WHERE member_id = $1
			ORDER BY started_at DESC
		`,
		[memberId]
	);

	return rows.map(databaseRowToFrontHistory);
}

export async function getCurrentFronting(): Promise<
	FrontHistoryEntry[]
> {
	const db = await getDatabase();

	const rows = await db.select<any[]>(
		`
			SELECT *
			FROM front_history
			WHERE ended_at IS NULL
			ORDER BY started_at ASC
		`
	);

	return rows.map(databaseRowToFrontHistory);
}

export async function updateFrontHistoryNote(
	id: string,
	note: string
) {
	const db = await getDatabase();

	await db.execute(
		`
			UPDATE front_history
			SET note = $1
			WHERE id = $2
		`,
		[note, id]
	);
}

export async function deleteFrontHistoryEntry(
	id: string
) {
	const db = await getDatabase();

	await db.execute(
		'DELETE FROM front_history WHERE id = $1',
		[id]
	);
}