import * as typeorm from "typeorm";
import AuthenticationService from "../../services/authentication.service";
import userMock from "../mocks/user.mock";
import bcrypt from "bcrypt";
import appConfig from "../../configs/app.config";
import WrongCredentialsException from "../../exceptions/wrong-credentials.exception";
import UserAlreadyExistsException from "../../exceptions/user-already-exists.exception";

(typeorm as any).getRepository = jest.fn();

describe("The AuthenticationService", () => {

    describe("test logIn", () => {
        describe("when user exist", () => {
            it("should return a user", async () => {
                const hashedPassword: string = await bcrypt.hash(userMock.logInUser.password, appConfig.PASSWORD_SALT);
                (typeorm as any).getRepository.mockReturnValue({
                    findOneOrFail: () => Promise.resolve({...userMock.contextUser, password: hashedPassword}),
                });

                const authenticationService: AuthenticationService = new AuthenticationService();
                await expect(authenticationService.logIn(userMock.logInUser))
                    .resolves.toBeDefined();
            });

            it("should catch wrong credentials exception", async () => {
                (typeorm as any).getRepository.mockReturnValue({
                    findOneOrFail: () => Promise.resolve({}),
                });

                const authenticationService: AuthenticationService = new AuthenticationService();
                await expect(authenticationService.logIn(userMock.logInUser))
                    .rejects.toMatchObject(new WrongCredentialsException());
            });
        });
    });

    describe("test register", () => {
        describe("when user exist", () => {
            it("should return a new user", async () => {
                (typeorm as any).getRepository.mockReturnValue({
                    findOne: () => Promise.resolve({}),
                    save: () => Promise.resolve(),
                });

                const authenticationService: AuthenticationService = new AuthenticationService();
                await expect(authenticationService.register(userMock.registerUser))
                    .rejects.toThrowError(new UserAlreadyExistsException(userMock.registerUser.email));
            });
        });

        describe("when user not exist", () => {
            it("should return a new user", async () => {
                (typeorm as any).getRepository.mockReturnValue({
                    create: () => Promise.resolve(userMock.contextUser),
                    findOne: () => Promise.resolve(undefined),
                    save: () => Promise.resolve(),
                });

                const authenticationService: AuthenticationService = new AuthenticationService();
                await expect(authenticationService.register(userMock.registerUser))
                    .resolves.toBeDefined();
            });
        });
    });

});