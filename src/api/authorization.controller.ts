import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import validationMiddlaware from "../middlewares/validation.middleware";
import AuthenticationService from "../services/authentication.service";
import hideUserPassword from "../utils/hide-user-password";
import RegisterDto from "../validations/register.dto";
import LogInDto from "../validations/log-in.dto";
import Controller from "./controller";
import MailerService from "../services/mailer/mailer.service";
import NewUserMail from "../services/mailer/mails/new-user.mail";
import EventListenerContainer from "../utils/event-listener.container";
import UserEventListener from "../subscribers/user.event-listener";
import authMiddleware from "../middlewares/auth.middleware";
import RequestWithUser from "../interfaces/request-with-user.interface";
import UserEntity from "../entities/user.entity";

class AuthorizationController extends Controller {
    public authenticationService: AuthenticationService = new AuthenticationService();
    protected path: string = "/auth";

    constructor() {
        super();
        this.initializeRoutes();
    }

    protected initializeRoutes = (): void => {
        this.router.post(`${this.path}/logout`, this.logOut);
        this.router.post(`${this.path}/refresh`, authMiddleware, this.refreshToken);
        this.router.post(`${this.path}/login`, validationMiddlaware(LogInDto), this.logIn);
        this.router.post(`${this.path}/register`, validationMiddlaware(RegisterDto), this.register);
    }

    private logIn = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const logInData: LogInDto = request.body;
            const { cookie, tokenData, user } = await this.authenticationService.logIn(logInData);

            EventListenerContainer.getInstance().emitEvent(UserEventListener.USER_LOGIN_EVENT, user);

            response.setHeader("Set-Cookie", [cookie]);
            response.send({accessToken: tokenData.token});
        } catch (error) {
            next(error);
        }
    }

    private register = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const registerData: RegisterDto = request.body;
            const { cookie, user } = await this.authenticationService.register(registerData);

            const mailerService = new MailerService();
            const newUserMail = new NewUserMail({user});
            await mailerService.sendMail(newUserMail.getMail());

            response.setHeader("Set-Cookie", [cookie]);
            response.status(StatusCodes.CREATED);
            response.send(hideUserPassword(user));
        } catch (error) {
            next(error);
        }
    }

    private refreshToken = (request: RequestWithUser, response: Response, next: NextFunction) => {
        const requestUser: UserEntity = request.user as UserEntity;
        const { cookie, tokenData, user } = this.authenticationService.refreshToken(requestUser);

        response.setHeader("Set-Cookie", [cookie]);
        response.send({
            user: hideUserPassword(user),
            accessToken: tokenData.token,
        });
    }

    private logOut = (request: Request, response: Response) => {
        response.setHeader("Set-Cookie", ["Authorization=;Max-age=0"]);
        response.send();
    }
}

export default AuthorizationController;
