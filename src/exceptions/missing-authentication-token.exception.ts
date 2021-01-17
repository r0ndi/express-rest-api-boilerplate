import HttpException from "./http.exception";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class MissingAuthenticationTokenException extends HttpException {
    constructor() {
        super(StatusCodes.FORBIDDEN, ReasonPhrases.NON_AUTHORITATIVE_INFORMATION);
    }
}

export default MissingAuthenticationTokenException;
