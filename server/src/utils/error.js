export class ErrorHandler extends Error {
    constructor(statusCode, message){
        super();
        this.status = "error";
        this.statusCode = statusCode;
        this.message = message;
    }
};

export const handleError = (error, req, res, next) => {
    const { statusCode, message } = error;
    console.error(error);
    res.status(statusCode || 500).json({
        status: "error",
        statusCode: statusCode || 500,
        message: statusCode === 500 ? "An error occurred" : message,
    });
    next();
};