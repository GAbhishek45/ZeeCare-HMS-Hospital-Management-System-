class ErrorHandler extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
    }
}

export const errorMiddleware = (err, req, res, next) => {
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;

    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(400, message);
    }
    if (err.name === "JsonWebTokenError") {
        const message = "Invalid JWT Token";
        err = new ErrorHandler(401, message);
    }
    if (err.name === "TokenExpiredError") {
        const message = "Token Expired";
        err = new ErrorHandler(401, message);
    }
    if (err.name === "CastError") {
        const message = `Invalid ${err.path}`;
        err = new ErrorHandler(400, message);
    }

    const errorMessage = err.errors ? Object.values(err.errors).map(error => error.message).join("") : err.message;

    return res.status(err.statusCode).json({
        success: false,
        message: errorMessage
    });
};

export default ErrorHandler;
