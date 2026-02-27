import 'dotenv/config'
import { cleanEnv, str } from "envalid";

export const ENV = cleanEnv(process.env, {
    SECRET_KEY: str(),
    MAIL_USER: str(),
    MAIL_PASS: str(),
    ADMIN_EMAIL: str(),
    NP_API_KEY: str()
})