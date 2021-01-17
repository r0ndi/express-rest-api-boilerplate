import {
    cleanEnv, str, port, num,
} from "envalid";

function envValidator(): void {
    cleanEnv(process.env, {
        POSTGRES_HOST: str(),
        POSTGRES_PORT: str(),
        POSTGRES_USER: str(),
        POSTGRES_PASSWORD: str(),
        POSTGRES_DATABASE: str(),
        PASSWORD_SALT: num(),
        JWT_SECRET: str(),
        PORT: port(),
    });
}

export default envValidator;
