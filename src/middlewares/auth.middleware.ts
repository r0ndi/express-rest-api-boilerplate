import MissingAuthenticationTokenException from "../exceptions/missing-authentication-token.exception";
import WrongAuthenticationTokenException from "../exceptions/wrong-authentication-token.exception";
import RequestWithUser from "../interfaces/request-with-user.interface";
import TokenDataStored from "../interfaces/token-data-stored.interface";
import { getRepository, Repository } from "typeorm";
import { NextFunction, Response } from "express";
import UserEntity from "../entities/user.entity";
import appConfig from "../configs/app.config";
import * as jwt from "jsonwebtoken";

async function authMiddleware(request: RequestWithUser, response: Response, next: NextFunction) {
    const userRepository: Repository<UserEntity> = getRepository(UserEntity);
    const authorization: string[] = request.headers.authorization ? request.headers.authorization.split(" ") : [];
    const authorizationToken: string = authorization.length > 0 ? authorization[1] : "";

    try {
        if (authorizationToken) {
            const appSecret: string = appConfig.JWT_SECRET;
            const tokenDataStored: TokenDataStored = jwt.verify(authorizationToken, appSecret) as TokenDataStored;
            const user = await userRepository.findOne(tokenDataStored.id);

            if (user) {
                request.user = user;
                next();
            } else {
                next(new WrongAuthenticationTokenException());
            }
        } else {
            next(new MissingAuthenticationTokenException());
        }
    } catch (error) {
        next(new WrongAuthenticationTokenException());
    }
}

export default authMiddleware;
