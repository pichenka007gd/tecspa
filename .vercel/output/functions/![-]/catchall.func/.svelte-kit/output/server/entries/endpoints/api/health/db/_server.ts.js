import { t as pool } from "../../../../../chunks/postgres.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/health/db/+server.ts
async function GET() {
	try {
		await pool.query("SELECT 1");
		return json({ ok: true });
	} catch (error) {
		console.error("Neon database connection failed:", error);
		return json({
			ok: false,
			error: "Database connection failed."
		}, { status: 500 });
	}
}
//#endregion
export { GET };
