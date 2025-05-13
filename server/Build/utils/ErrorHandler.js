"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message); /* super(message) calls the constructor of the parent Error class with the message parameter. This sets the message property of the error instance.*/
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor); /* Error.captureStackTrace() is a method on the Error object that is used to set the stack property on the error instance. This is used to capture the stack trace of the error. */
    }
}
exports.default = ErrorHandler; // export the ErrorHandler class
