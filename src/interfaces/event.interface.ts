import FunctionWithDataType from "../types/function-with-data.type";
import FunctionType from "../types/function.type";

interface EventInterface {
    callback: FunctionType | FunctionWithDataType;
    name: string;
}

export default EventInterface;
