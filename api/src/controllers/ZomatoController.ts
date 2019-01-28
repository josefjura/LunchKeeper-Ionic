import { RequestHandler, NextFunction, Request, Response } from 'express'
import * as service from '../services/ZomatoService'
import { handleRequest } from './Helpers'


export var search: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await handleRequest(res, async () => {
        return service.search(req.query.q, req.params.city);
    })

    return next();
}

export var getRestaurantDetail: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await handleRequest(res, async () => {
        return await service.getRestaurantDetail(req.params.id);
    })

    return next();
}

export var getDailyMenu: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await handleRequest(res, async () => {        
        return await service.getDailyMenu(req.params.id);
    })

    return next();
}


