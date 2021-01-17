import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class UserAlreadyExistsException extends HttpException {
    constructor(email: string) {
        super(StatusCodes.BAD_REQUEST, `User with email ${email} already exists`);
    }
}

export default UserAlreadyExistsException;
