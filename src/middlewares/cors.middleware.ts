import cors from "cors";
import appConfig from "../configs/app.config";
import CorsException from "../exceptions/cors.exception";

const corsMiddleware = () => {
    return cors({
        origin: (origin, callback) => {
            if (!origin) {
                return callback(null, true);
            }

            if (appConfig.ALLOWED_ORIGINS.indexOf(origin) === -1) {
                return callback(new CorsException(), false);
            }

            return callback(null, true);
        },
    });
};

export default corsMiddleware;
