import { r as verifyMemberMediaStorage } from "../../../../../chunks/s3.js";
import { json } from "@sveltejs/kit";
//#region src/routes/api/health/storage/+server.ts
async function GET() {
	try {
		await verifyMemberMediaStorage();
		return json({ ok: true });
	} catch (error) {
		console.error("Neon Object Storage connection failed:", error);
		return json({
			ok: false,
			error: "Object Storage connection failed."
		}, { status: 500 });
	}
}
//#endregion
export { GET };
