import UserEntity from "../../entities/user.entity";
import LogInDto from "../../validations/log-in.dto";
import RegisterDto from "../../validations/register.dto";

const contextUser: UserEntity = {
    id: "0000-0000",
    firstname: "test",
    lastname: "test",
    email: "test@test.pl",
};

const invalidUser: UserEntity = {
    id: "1000-0000",
    firstname: "test",
    lastname: "test",
    email: "test@test.pl",
};

const registerUser: RegisterDto = {
    firstname: "test",
    lastname: "test",
    email: "test@test.pl",
    password: "pass",
};

const logInUser: LogInDto = {
    email: "test@test.pl",
    password: "pass",
};

const userMock = {
    contextUser,
    invalidUser,
    registerUser,
    logInUser,
};

export default userMock;
