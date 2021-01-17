import AuthorizationController from "../../api/authorization.controller";
import userMock from "../mocks/user.mock";
import * as typeorm from "typeorm";
import request from "supertest";
import App from "../../app";
import bcrypt from "bcrypt";
import appConfig from "../../configs/app.config";
import { StatusCodes } from "http-status-codes";

(typeorm as any).getRepository = jest.fn();

describe("The AuthController", () => {

    describe("POST /auth/register", () => {
        it("response should create and return user", async () => {
            (typeorm as any).getRepository.mockReturnValue({
                findOne: () => Promise.resolve(undefined),
                create: () => (userMock.registerUser),
                save: () => Promise.resolve(),
            });

            const app: App = new App([new AuthorizationController()]);
            return request(app.getServer())
                .post("/api/v1/auth/register")
                .send(userMock.registerUser)
                .expect(userMock.registerUser);
        });
    });

    describe("POST /auth/login", () => {
        it("response should create and return user", async () => {
            const hashedPassword: string = await bcrypt.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
            });

            const app: App = new App([new AuthorizationController()]);
            return await request(app.getServer())
                .post("/api/v1/auth/login")
                .send(userMock.logInUser)
                .expect(StatusCodes.OK);
        });
    });

    describe("POST /auth/logout", () => {
        it("response should create and return user", async () => {
            const app: App = new App([new AuthorizationController()]);
            return await request(app.getServer())
                .post("/api/v1/auth/logout")
                .expect(StatusCodes.OK);
        });
    });

});