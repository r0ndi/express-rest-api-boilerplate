import HttpException from "./http.exception";
import { StatusCodes, ReasonPhrases } from "http-status-codes";

class InvalidDataException extends HttpException {
    constructor(message: string = ReasonPhrases.BAD_REQUEST) {
        super(StatusCodes.BAD_REQUEST, message);
    }
}

export default InvalidDataException;
