import crypto from "crypto";
import base32 from "hi-base32";

export default function generateBase32Secret() {
  const secret = crypto.randomBytes(2).toString("hex"); // Generate 20-byte hex secret
  const encodedSecret = base32.encode(secret); // Base32 encode the secret
  return encodedSecret.slice(0, 6);
}
