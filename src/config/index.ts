import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
    port: process.env.PORT,
    database_url: process.env.DATABASE_URL,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt_access_secret: process.env.JWT_ACCESS_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_TOKEN,
    jwt_expires_in: process.env.JWT_EXPRIRES_IN,
    jwt_expires_in_refresh: process.env.JWT_EXPRIRES_IN_REFRESH,
    NODE_ENV: process.env.NODE_ENV
};