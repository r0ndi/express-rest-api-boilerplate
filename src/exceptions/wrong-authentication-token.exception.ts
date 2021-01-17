import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class WrongAuthenticationTokenException extends HttpException {
    constructor() {
        super(StatusCodes.FORBIDDEN, `Wrong authentication token`);
    }
}

export default WrongAuthenticationTokenException;
