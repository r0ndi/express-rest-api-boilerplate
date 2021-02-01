import MissingAuthenticationTokenException from "../../exceptions/missing-authentication-token.exception";
import WrongAuthenticationTokenException from "../../exceptions/wrong-authentication-token.exception";
import UserController from "../../api/user.controller";
import userMock from "../mocks/user.mock";
import * as typeorm from "typeorm";
import request from "supertest";
import App from "../../app";
import bcryptjs from "bcryptjs";
import appConfig from "../../configs/app.config";
import AuthorizationController from "../../api/authorization.controller";
import { StatusCodes } from "http-status-codes";

(typeorm as any).getRepository = jest.fn();

describe("The UserController", () => {

    describe("checking authentication", () => {
        it("should catch invalid authentication token error", async () => {
            const exception = new WrongAuthenticationTokenException();
            const app = new App([new UserController()]);

            return request(app.getServer())
                .get(`/api/v1/user/${userMock.contextUser.id}`)
                .set("Authorization", "Bearer test.bearer.token")
                .expect({ status: exception.status, message: exception.message });
        });

        it("should catch missing authentication token error", async () => {
            const exception = new MissingAuthenticationTokenException();
            const app = new App([new UserController()]);

            return request(app.getServer())
                .get(`/api/v1/user/${userMock.contextUser.id}`)
                .expect({ status: exception.status, message: exception.message });
        });
    });

    describe("GET /user/:id", () => {
        it("should return user", async () => {
            const hashedPassword: string = await bcryptjs.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
                findOne: () => Promise.resolve(userMock.contextUser),
            });

            const app: App = new App([
                new UserController(),
                new AuthorizationController(),
            ]);

            const loggedUser = await request(app.getServer())
                .post("/api/v1/auth/login")
                .send(userMock.logInUser);

            return request(app.getServer())
                .get(`/api/v1/user/${userMock.contextUser.id}`)
                .set("Authorization", `Bearer ${loggedUser.body.accessToken}`)
                .expect(userMock.contextUser);
        });
    });

    describe("PATCH /user/:id", () => {
        it("should return modified user", async () => {
            const hashedPassword: string = await bcryptjs.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
                findOne: () => Promise.resolve(userMock.contextUser),
                update: () => Promise.resolve(userMock.contextUser),
            });

            const app: App = new App([
                new UserController(),
                new AuthorizationController(),
            ]);

            const loggedUser = await request(app.getServer())
                .post("/api/v1/auth/login")
                .send(userMock.logInUser);

            return request(app.getServer())
                .patch(`/api/v1/user/${userMock.contextUser.id}`)
                .set("Authorization", `Bearer ${loggedUser.body.accessToken}`)
                .send(userMock.contextUser)
                .expect(userMock.contextUser);
        });
    });

    describe("DELETE /user/:id", () => {
        it("should return modified user", async () => {
            const hashedPassword: string = await bcryptjs.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
            (typeorm as any).getRepository.mockReturnValue({
                findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
                findOne: () => Promise.resolve(userMock.contextUser),
                delete: () => Promise.resolve(),
            });

            const app: App = new App([
                new UserController(),
                new AuthorizationController(),
            ]);

            const loggedUser = await request(app.getServer())
                .post("/api/v1/auth/login")
                .send(userMock.logInUser);

            return request(app.getServer())
                .delete(`/api/v1/user/${userMock.contextUser.id}`)
                .set("Authorization", `Bearer ${loggedUser.body.accessToken}`)
                .expect(StatusCodes.OK);
        });
    });

});
