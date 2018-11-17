import { RequestHandler, NextFunction, Request, Response } from 'express'
import * as service from '../services/LunchService'
import { handleRequest } from './Helpers'
import { SEARCH_RESULT_TYPE } from '../models/DTO';


const headers = { 'Content-Type': 'application/json' };

export var search: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await handleRequest(res, async () => {
        return service.search(req.query.q)
    });

    return next();
}

export var dailyMenu: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await handleRequest(res, async () => {
        return service.dailyMenu(parseInt(req.params.type), req.params.id);
    });

    return next();
}

export var details: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        await handleRequest(res, async () => {
            return service.details(parseInt(req.params.type), req.params.id);
        });
    } catch (err) { console.error(err) }

    return next();
}




