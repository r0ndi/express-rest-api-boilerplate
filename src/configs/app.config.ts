import path from "path";
import dotenv from "dotenv";
import envValidator from "../validations/env.validator";

dotenv.config({
    path: path.resolve(process.env.NODE_ENV && process.env.NODE_ENV !== "production" ? `.env.${process.env.NODE_ENV}` : ".env"),
});

envValidator();

const appConfig = {
    PORT: Number(process.env.PORT),
    JWT_SECRET: String(process.env.JWT_SECRET),
    PASSWORD_SALT: Number(process.env.PASSWORD_SALT),
    POSTGRES_HOST: String(process.env.POSTGRES_HOST),
    POSTGRES_PORT: Number(process.env.POSTGRES_PORT),
    POSTGRES_USER: String(process.env.POSTGRES_USER),
    POSTGRES_PASSWORD: String(process.env.POSTGRES_PASSWORD),
    POSTGRES_DATABASE: String(process.env.POSTGRES_DATABASE),
    MORGAN_FORMAT: String(process.env.NODE_ENV || "production") === "development" ? "dev" : "combined",
    MAILER_HOST: String(process.env.MAILER_HOST) || "smtp.ethereal.email",
    MAILER_PORT: Number(process.env.MAILER_PORT) ?? 587,
    MAILER_USER_NAME: String(process.env.MAILER_USER_NAME),
    MAILER_USER_PASSWORD: String(process.env.MAILER_USER_PASSWORD),
    MAILER_MAIL_FROM_NAME: String(process.env.MAILER_MAIL_FROM_NAME),
    MAILER_MAIL_FROM: String(process.env.MAILER_MAIL_FROM),
    ALLOWED_ORIGINS: String(process.env.ALLOWED_ORIGINS).split(","),
};

export default appConfig;
