import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

import { GetObjectCommand } from '@aws-sdk/client-s3';

import { pool } from '$lib/server/db/postgres';
import {
	MEMBER_MEDIA_BUCKET,
	s3
} from '$lib/server/storage/s3';

type MediaKind = 'avatar' | 'banner';

function isMediaKind(value: string): value is MediaKind {
	return value === 'avatar' || value === 'banner';
}

export const GET: RequestHandler = async ({ params }) => {
	const { memberID, kind } = params;

	if (!memberID || !kind || !isMediaKind(kind)) {
		throw error(400, 'Invalid member media request.');
	}

	const result = await pool.query<{
		avatar: string;
		banner: string;
	}>(
		`
			SELECT avatar, banner
			FROM members
			WHERE id = $1
		`,
		[memberID]
	);

	if (result.rows.length === 0) {
		throw error(404, 'Member not found.');
	}

	const storedPath = result.rows[0][kind];

	if (!storedPath) {
		throw error(404, 'Member does not have this image.');
	}

	const expectedPrefix =
		`members/${memberID}/${kind}.`;

	if (!storedPath.startsWith(expectedPrefix)) {
		throw error(404, 'Member media was not found.');
	}

	const object = await s3.send(
		new GetObjectCommand({
			Bucket: MEMBER_MEDIA_BUCKET,
			Key: storedPath
		})
	);

	if (!object.Body) {
		throw error(404, 'Member media was not found.');
	}

	const bytes =
		await object.Body.transformToByteArray();

	const arrayBuffer =
		new ArrayBuffer(bytes.byteLength);

	new Uint8Array(arrayBuffer).set(bytes);

	return new Response(arrayBuffer, {
		headers: {
			'Content-Type':
				object.ContentType ??
				'application/octet-stream',
			'Cache-Control':
				'private, max-age=3600'
		}
	});
};