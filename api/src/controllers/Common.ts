import { RequestCallback } from "request";
import { NextFunction, Response } from 'express'

export function handleCall(res: Response, next: NextFunction): RequestCallback {
    return (error, res2, body) => {
        if (error)
            res.status(500).json(error);
        res.status(res2.statusCode)
            .header('Content-Type', 'application/json')
            .send(body);
        return next(error);
    };
}