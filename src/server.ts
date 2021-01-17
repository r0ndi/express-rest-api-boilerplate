import { createConnection } from "typeorm";
import config from "./configs/orm.config";
import App from "./app";
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

    const app = new App([
        new UserController(),
        new AuthorizationController(),
    ]);

    app.listen();
})();
