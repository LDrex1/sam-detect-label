import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// S3 client
const s3 = new S3Client({ region: process.env.AWS_REGION });
/**
 *
 * @param {*} event
 * @returns { statusCode, body with signedUrl, file key and expiration time}
 * on error,
 * @returns { statuscode, faliure message}
 */
export const handler = async (event) => {
  const bucket = process.env.BUCKET_NAME;
  const key = event.fileName;
  if (!bucket || !key) {
    throw new Error(`LambdaError: no bucket ot key specified`);
  }

  // get object command
  const command = new GetObjectCommand({ Bucket: bucket, Key: key });
  const expiresIn = 3600;
  try {
    const signedUrl = await getSignedUrl(s3, command, { expiresIn }); // get signed url
    console.log(event, "eventlog");

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Signed URL generated successfully!",
        signedUrl,
        fileName: key,
        expiresIn: `${expiresIn} seconds`,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  } catch (error) {
    throw new Error(`Error generating signed URL: ${error.message}`);
  }
};
