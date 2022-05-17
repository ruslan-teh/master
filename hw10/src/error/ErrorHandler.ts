export class ErrorHandler extends Error {
    massage: string;

    status: number;

    constructor(massage: string, status: number = 400) {
        super(massage);
        this.status = status;

        Error.captureStackTrace(this, this.constructor);
    }
}
