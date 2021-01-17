import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class InvalidUserException extends HttpException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, `Invalid user`);
    }
}

export default InvalidUserException;
