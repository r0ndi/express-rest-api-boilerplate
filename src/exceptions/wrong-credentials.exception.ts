import HttpException from "./http.exception";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class WrongCredentialsException extends HttpException {
    constructor() {
        super(StatusCodes.FORBIDDEN, `Wrong credentials`);
    }
}

export default WrongCredentialsException;
