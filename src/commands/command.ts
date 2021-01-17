import cron from "node-cron";
import FunctionType from "../types/function.type";

abstract class Command {
    protected cron = cron;

    protected abstract run(): void;

    protected setCommand = (cronExpression: string, fn: FunctionType): void => {
        cron.schedule(cronExpression, fn);
    }
}

export default Command;
