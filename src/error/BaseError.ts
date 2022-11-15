import {HttpStatusCode} from "../enums/HttpStatusCode";

export class BaseError extends Error {
    public readonly name: string;
    public readonly httpCode: HttpStatusCode;
    public readonly isOperational: boolean;

    constructor(name: string, httpCode: HttpStatusCode, message: string, isOperational = true) {
        super(message);
        Object.setPrototypeOf(this, new.target.prototype);

        this.name = name;
        this.httpCode = httpCode;
        this.isOperational = isOperational;

        Error.captureStackTrace(this);
    }
}

export class HTTP404Error extends BaseError {
    constructor(description = "Not Found") {
        super("NOT FOUND", HttpStatusCode.NOT_FOUND, description, true);
    }
}

export class HTTP400Error extends BaseError {
    constructor(description = "Bad Request") {
        super("BAD REQUEST", HttpStatusCode.BAD_REQUEST, description, true);
    }
}

export class HTTP403Error extends BaseError {
    constructor(description = "Forbidden") {
        super("FORBIDDEN", HttpStatusCode.FORBIDDEN, description, true);
    }
}

export class HTTP409Error extends BaseError {
    constructor(description = "Conflict") {
        super("CONFLICT", HttpStatusCode.CONFLICT, description, true);
    }
}
