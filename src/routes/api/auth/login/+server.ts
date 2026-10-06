import { json } from '@sveltejs/kit';
import { dev } from '$app/environment';
import type { RequestHandler } from '@sveltejs/kit';

import {
	authenticateAccount,
	createSession,
	getSessionCookieName
} from '$lib/server/auth';

export const POST: RequestHandler = async ({ request, cookies }) => {
	const body = await request.json();

	const email =
		typeof body.email === 'string'
			? body.email
			: '';

	const password =
		typeof body.password === 'string'
			? body.password
			: '';

	if (!email || !password) {
		return json(
			{ error: 'Email and password are required.' },
			{ status: 400 }
		);
	}

	const account = await authenticateAccount(
		email,
		password
	);

	if (!account) {
		return json(
			{ error: 'Invalid email or password.' },
			{ status: 401 }
		);
	}

	const session = await createSession(account.id);

	cookies.set(
		getSessionCookieName(),
		session.token,
		{
			httpOnly: true,
			secure: !dev,
			sameSite: 'lax',
			path: '/',
			expires: session.expiresAt
		}
	);

	return json({
		account
	});
};