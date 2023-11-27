import bcrypt from 'bcrypt';
import config from './index';

// take password and return hashed password
export default async function hash(password: string) {
  return await bcrypt.hash(password, Number(config.bcrypt_salt_rounds));
}
 