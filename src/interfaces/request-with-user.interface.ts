import { Request } from "express";
import UserEntity from "../entities/user.entity";

interface RequestWithUser extends Request {
    user?: UserEntity;
    headers: any;
    body: any;
}

export default RequestWithUser;
