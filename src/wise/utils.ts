import { createSign } from 'crypto';
import { readFileSync } from 'fs';

// Function to sign the token
function signToken(token: string, privateKeyPath: string): string {
  const sign = createSign('sha256');
  sign.update(token);
  sign.end();
  const privateKey = readFileSync(privateKeyPath);
  const signature = sign.sign(privateKey);
  return signature.toString('base64');
}
