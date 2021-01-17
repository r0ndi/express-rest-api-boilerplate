import { NextFunction, Response } from "express";
import Controller from "./controller";
import UserEntity from "../entities/user.entity";
import { Repository } from "typeorm/repository/Repository";
import { getRepository } from "typeorm";
import hideUserPassword from "../utils/hide-user-password";
import authMiddleware from "../middlewares/auth.middleware";
import RequestWithUser from "../interfaces/request-with-user.interface";
import UserDto from "../validations/user.dto copy";
import validationMiddlaware from "../middlewares/validation.middleware";
import UserService from "../services/user.service";

class UserController extends Controller {
    private userRepository: Repository<UserEntity> = getRepository(UserEntity);
    private userService: UserService = new UserService();
    protected path: string = "/user";

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.get(`${this.path}/:id`, authMiddleware, this.getUser);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.deleteUser);
        this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddlaware(UserDto), this.patchUser);
    }

    private getUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            const userId: string = String(request.params.id);
            const user: UserEntity = await this.userService.getMatchedUser(request.user, userId);

            response.send(hideUserPassword(user));
        } catch (error) {
            next(error);
        }
    }

    private patchUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            const userData: UserDto = request.body;
            const userId: string = String(request.params.id);
            const user: UserEntity = await this.userService.getMatchedUser(request.user, userId);

            await this.userRepository.update(user.id, userData);

            const updatedUser: UserEntity = await this.userRepository.findOneOrFail(userId);
            response.send(hideUserPassword(updatedUser));
        } catch (error) {
            next(error);
        }
    }

    private deleteUser = async (request: RequestWithUser, response: Response, next: NextFunction) => {
        try {
            const userId: string = String(request.params.id);
            const user: UserEntity = await this.userService.getMatchedUser(request.user, userId);

            await this.userRepository.delete(user);
            response.send();
        } catch (error) {
            next(error);
        }
    }
}

export default UserController;
