import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ZodError) {
        const errors: ValidationErrors = {};

        error.errors.forEach(err => {
            const path = err.path.join('.');
            if (path) {
                errors[path] = [err.message];
            }
        });

        return res.status(400).json({ message: 'Validation fails', errors });
    }

    console.error(error);

    return res.status(500).json({ message: 'Internal server error' });
}

export default errorHandler;
