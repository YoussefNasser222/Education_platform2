import { config, configDotenv } from "dotenv";

config();

export const devConfig = {
    DB_URL: process.env.DB_URL,
    Port: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET
}
