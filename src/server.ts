import EventListenerContainer from "./utils/event-listener.container";
import errorMiddleware from "./middlewares/error.middleware";
import corsMiddleware from "./middlewares/cors.middleware";
import appConfig from "./configs/app.config";
import Controller from "./api/controller";
import * as bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import fs from "fs";

class Server {
    private readonly app: express.Application;
    private readonly eventListener: EventListenerContainer = EventListenerContainer.getInstance();

    constructor(controllers: Controller[]) {
        this.app = express();

        this.initializeLogger();
        this.initializeCors();
        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.initializeErrorHandling();
        this.initializeCronJobs();
        this.initializeEvents();
    }

    public getServer(): express.Application {
        return this.app;
    }

    public listen(): void {
        this.app.listen(appConfig.PORT, () => {
            console.log(`App listening on the port ${appConfig.PORT}`);
        });
    }

    private initializeMiddlewares(): void {
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());

        this.app.use(helmet.contentSecurityPolicy());
        this.app.use(helmet.dnsPrefetchControl());
        this.app.use(helmet.expectCt());
        this.app.use(helmet.frameguard());
        this.app.use(helmet.hidePoweredBy());
        this.app.use(helmet.hsts());
        this.app.use(helmet.ieNoOpen());
        this.app.use(helmet.noSniff());
        this.app.use(helmet.referrerPolicy());
        this.app.use(helmet.xssFilter());
    }

    private initializeLogger(): void {
        const accessLogStream = fs.createWriteStream("./../logs/morgan.log", { flags: "a" });
        this.app.use(morgan(appConfig.MORGAN_FORMAT, { stream: accessLogStream }));
    }

    private initializeErrorHandling(): void {
        this.app.use(errorMiddleware);
    }

    private initializeCors(): void {
        this.app.use(corsMiddleware());
    }

    private initializeControllers(controllers: Controller[]): void {
        controllers.forEach((controller) => {
            this.app.use("/api/v1/", controller.getRouter());
        });
    }

    // tslint:disable-next-line: no-empty
    private initializeCronJobs(): void {}

    private initializeEvents(): void {
        this.eventListener.setEvents([]);
    }
}

export default Server;
