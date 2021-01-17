import UserEntity from "../entities/user.entity";
import { getRepository, Repository } from "typeorm";
import UserNotFoundException from "../exceptions/user-not-found.exception";
import InvalidUserException from "../exceptions/invalid-user.exception";

class UserService {
    private userRepository = getRepository(UserEntity);

    // TODO: add roles for users and allow administrators to getting other users
    public async getMatchedUser(contextUser: UserEntity | undefined, userId: string): Promise<UserEntity> {
        if (!contextUser || contextUser.id !== userId) {
            throw new InvalidUserException();
        }

        try {
            return await this.userRepository.findOneOrFail(userId);
        } catch (error) {
            throw new UserNotFoundException();
        }
    }
}

export default UserService;
