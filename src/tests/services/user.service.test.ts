import * as typeorm from "typeorm";
import UserService from "../../services/user.service";
import UserNotFoundException from "../../exceptions/user-not-found.exception";
import InvalidUserException from "../../exceptions/invalid-user.exception";
import userMock from "../mocks/user.mock";

(typeorm as any).getRepository = jest.fn();

describe("The UserService", () => {

    describe("test getMatchedUser", () => {

        describe("when user exist", () => {
            it("should return a user", async () => {
                (typeorm as any).getRepository.mockReturnValue({
                    findOneOrFail: () => Promise.resolve(userMock.contextUser),
                });

                const userService: UserService = new UserService();
                await expect(userService.getMatchedUser(userMock.contextUser, userMock.contextUser.id))
                    .resolves.toMatchObject(userMock.contextUser);
            });
        });

        describe("when user not exist", () => {
            it("should catch excpetion", async () => {
                (typeorm as any).getRepository.mockReturnValue({
                    findOneOrFail: () => Promise.reject({}),
                });

                const userService: UserService = new UserService();
                await expect(userService.getMatchedUser(userMock.contextUser, userMock.contextUser.id))
                    .rejects.toMatchObject(new UserNotFoundException());
            });
        });

        describe("when user is other from user in context", () => {
            it("should return a invalid user", async () => {
                (typeorm as any).getRepository.mockReturnValue({
                    findOneOrFail: () => userMock.invalidUser,
                });

                const userService: UserService = new UserService();
                await expect(userService.getMatchedUser(userMock.contextUser, userMock.invalidUser.id))
                    .rejects.toMatchObject(new InvalidUserException());
            });
        });

    });

});
