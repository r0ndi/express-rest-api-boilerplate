import { ConnectionOptions } from "typeorm";
import appConfig from "./app.config";

const config: ConnectionOptions = {
    type: "postgres",
    synchronize: false,
    host: String(appConfig.POSTGRES_HOST),
    port: Number(appConfig.POSTGRES_PORT),
    username: String(appConfig.POSTGRES_USER),
    password: String(appConfig.POSTGRES_PASSWORD),
    database: String(appConfig.POSTGRES_DATABASE),
    entities: ["**/entities/*.entity.js"],
    migrations: ["**/migrations/*.js"],
};

export default config;
