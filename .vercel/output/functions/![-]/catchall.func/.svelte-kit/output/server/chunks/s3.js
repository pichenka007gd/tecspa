import { t as private_env } from "./shared-server.js";
import { HeadBucketCommand, S3Client } from "@aws-sdk/client-s3";
//#region src/lib/server/storage/s3.ts
for (const variable of [
	"AWS_ENDPOINT_URL_S3",
	"AWS_ACCESS_KEY_ID",
	"AWS_SECRET_ACCESS_KEY",
	"AWS_REGION"
]) if (!private_env[variable]) throw new Error(`${variable} is not configured.`);
var MEMBER_MEDIA_BUCKET = "member-media";
var s3 = new S3Client({
	endpoint: private_env.AWS_ENDPOINT_URL_S3,
	region: private_env.AWS_REGION,
	credentials: {
		accessKeyId: private_env.AWS_ACCESS_KEY_ID,
		secretAccessKey: private_env.AWS_SECRET_ACCESS_KEY
	},
	forcePathStyle: true
});
async function verifyMemberMediaStorage() {
	await s3.send(new HeadBucketCommand({ Bucket: MEMBER_MEDIA_BUCKET }));
}
//#endregion
export { s3 as n, verifyMemberMediaStorage as r, MEMBER_MEDIA_BUCKET as t };
