import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class InvalidDataException extends HttpException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, `Invalid data`);
    }
}

export default InvalidDataException;
