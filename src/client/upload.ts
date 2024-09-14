import satlantisApi from "./satlantisApi";
import { HTML_METHOD, getHeaders } from "./tools";
import { EXPO_PUBLIC_VITE_AWS_CDN } from "src/shared/constants/env";

async function getPresignedUrl(filename: string) {
  const client = satlantisApi.getClient();
  const response = await client.presign({ filename });
  if (response instanceof Error) {
    console.error(`Presigned url Failed: ${response.message}`, response.cause);
    throw new Error(`Error Presigning url. Reason: ${response.message}`);
  }
  return response.url;
}

async function uploadFileS3(file: File, filename: string) {
  const presignedUrl = await getPresignedUrl(filename);

  const response = await fetch(presignedUrl, {
    method: HTML_METHOD.PUT,
    body: file,
    headers: getHeaders(file.type),
  });

  if (!response.ok) {
    console.error("Upload failed", file.name);
    throw new Error("Error uploading file to S3");
  }
}

async function fetchImageAsBlob(uri: string) {
  const response = await fetch(uri);
  if (!response.ok) {
    console.error("Fetch image as blob failed", uri);
    throw new Error("Error fetching image as blob");
  }
  return await response.blob();
}

export async function uploadImage(imageUri: string) {
  const blob = await fetchImageAsBlob(imageUri);
  const filename = imageUri.split("/").pop() || "";
  const file = new File([blob], filename, { type: blob.type });
  const timestamp = Date.now();
  const sanitizedFileName = file.name
    .replace(/[^a-zA-Z0-9.]/g, "_")
    .toLowerCase();
  const uniqueFileName = `${timestamp}-${sanitizedFileName}`;
  return uploadFileS3(file, uniqueFileName).then(() => {
    return `${EXPO_PUBLIC_VITE_AWS_CDN || ""}/${uniqueFileName}`;
  });
}
