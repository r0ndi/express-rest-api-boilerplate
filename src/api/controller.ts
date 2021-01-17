import express, { Router } from "express";

abstract class Controller {
    protected abstract path: string;
    protected router: Router = express.Router();

    public getRouter = (): Router => {
        return this.router;
    }

    protected abstract initializeRoutes(): void;
}

export default Controller;
