import Command from "./command";

class ExampleCommand extends Command {
    constructor() {
        super();

        this.setCommand("* * * * *", this.run);
    }

    public run = (): void => {
        console.log("Example command is running every minute");
    }
}

export default ExampleCommand;
