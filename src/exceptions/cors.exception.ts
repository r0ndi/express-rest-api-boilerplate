import HttpException from "./http.exception";
import StatusCodes from "http-status-codes";

class CorsException extends HttpException {
    constructor() {
        super(StatusCodes.BAD_REQUEST, `The CORS policy for this site does not allow access from the specified Origin.`);
    }
}

export default CorsException;
