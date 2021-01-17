import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class UserNotFoundException extends HttpException {
    constructor() {
        super(StatusCodes.NOT_FOUND, `User not found`);
    }
}

export default UserNotFoundException;
