import AuthorizationController from "../../api/authorization.controller";
import userMock from "../mocks/user.mock";
import * as typeorm from "typeorm";
import request from "supertest";
import Server from "../../server";
import bcryptjs from "bcryptjs";
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

            const server: Server = new Server([new AuthorizationController()]);
            return request(server.getServer())
                .post("/api/v1/auth/register")
                .send(userMock.registerUser)
                .expect(StatusCodes.CREATED);
        });
    });

    describe("POST /auth/login", () => {
        it("response should create and return user", async () => {
            const hashedPassword: string = await bcryptjs.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
            });

            const server: Server = new Server([new AuthorizationController()]);
            return request(server.getServer())
                .post("/api/v1/auth/login")
                .send(userMock.logInUser)
                .expect(StatusCodes.OK);
        });
    });

    describe("POST /auth/logout", () => {
        it("response should create and return user", async () => {
            const server: Server = new Server([new AuthorizationController()]);
            return await request(server.getServer())
                .post("/api/v1/auth/logout")
                .expect(StatusCodes.OK);
        });
    });

    describe("POST /auth/refresh", () => {
        it("should refresh user token", async () => {
            const hashedPassword: string = await bcryptjs.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
                findOne: () => Promise.resolve(userMock.contextUser),
            });

            const server: Server = new Server([
                new AuthorizationController(),
            ]);

            const loggedUser = await request(server.getServer())
                .post("/api/v1/auth/login")
                .send(userMock.logInUser);

            return request(server.getServer())
                .post("/api/v1/auth/refresh")
                .set("Authorization", `Bearer ${loggedUser.body.accessToken}`)
                .expect(StatusCodes.OK);
        });
    });

});
