import UserEntity from "../entities/user.entity";

function hideUserPassword(user: UserEntity): UserEntity {
    delete user.password;
    return user;
}

export default hideUserPassword;
