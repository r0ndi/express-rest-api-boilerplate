import HttpException from "./http.exception";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class NotAuthorizedException extends HttpException {
    constructor() {
        super(StatusCodes.FORBIDDEN, ReasonPhrases.UNAUTHORIZED);
    }
}

export default NotAuthorizedException;
