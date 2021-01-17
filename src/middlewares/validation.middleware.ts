import { plainToClass } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import InvalidDataException from "../exceptions/invalida-data.exception";
import * as express from "express";

function validationMiddlaware<T>(type: any): express.RequestHandler {
    return async (request, response, next) => {
        const errors: ValidationError[] = await validate(plainToClass(type, request.body));

        if (errors.length > 0) {
            const message = errors.map((error: ValidationError) => {
                return Object.values(error.constraints ?? []);
            }).map(errorsArr => errorsArr.join(", ")).join();

            next(new InvalidDataException(message));
        } else {
            next();
        }
    };
}

export default validationMiddlaware;
