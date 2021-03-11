import { createConnection } from "typeorm";
import config from "./configs/orm.config";
import Server from "./server";
import UserController from "./api/user.controller";
import AuthorizationController from "./api/authorization.controller";

(async () => {
    try {
        const connection = await createConnection(config);
        await connection.runMigrations();
    } catch (error) {
        console.log("Error while connecting to the database", error);
        return error;
    }

    const server = new Server([
        new AuthorizationController(),
        new UserController(),
    ]);

    server.listen();
})();
