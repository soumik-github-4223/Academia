"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catchAsyncError = void 0;
const catchAsyncError = (thefn) => (req, res, next) => {
    Promise.resolve(thefn(req, res, next)).catch(next);
};
exports.catchAsyncError = catchAsyncError;
/*
// Define a function `catchAsyncError` that takes a function `thefn` as an argument
const catchAsyncError = (thefn: any) =>
    // Return a new function that takes `req`, `res`, and `next` as arguments
    (req: Request, res: Response, next: NextFunction) => {
        // Call the function `thefn` with `req`, `res`, and `next` and wrap it in a Promise
        // If the Promise resolves, do nothing
        // If the Promise rejects, pass the error to the `next` function (error handler)
        Promise.resolve(thefn(req, res, next)).catch(next);
    }



The catchAsyncError function is a higher-order function designed to handle errors in asynchronous route handlers in an Express.js application. It ensures that any errors thrown in the asynchronous function are caught and passed to the next middleware, which is typically an error handler.

Here's a breakdown of why this function is useful and how it works:

Error Handling in Async Functions: When using async functions in Express route handlers, any errors thrown inside the async function need to be caught and passed to the next function to be handled by the error-handling middleware. Without this, unhandled promise rejections can occur.

Simplifies Route Handlers: By wrapping the async function with catchAsyncError, you don't need to write try-catch blocks in every route handler. This keeps the code cleaner and more readable.

Consistent Error Handling: Ensures that all errors are handled consistently across your application.

Here's how you can achieve the same functionality using the async keyword with a try-catch block:

import { Request, Response, NextFunction } from 'express';

const catchAsyncError = (thefn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await thefn(req, res, next);
    } catch (error) {
        next(error);
    }
};

thefn will be the required fn within which I actually write try catch block and required works
To not write the above catchAsyncError function, we just included in the middleware folder and imported it in the required files

This version uses the async keyword and a try-catch block to handle errors:
import { Request, Response, NextFunction } from 'express';

const catchAsyncError = (thefn: any) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await thefn(req, res, next);
    } catch (error) {
        next(error);
    }
};

export default catchAsyncError;


*/ 
