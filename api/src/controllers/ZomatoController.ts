import { RequestHandler, NextFunction, Request, Response } from 'express'
import request from 'request-promise-native'
import { ZOMATO_URL, ZOMATO_API_KEY } from '../zomato'
import { SEARCH_RESULT_TYPE } from '../models/DTO'
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
        return service.getRestaurantDetail(req.params.id);
    })

    return next();
}

export var getDailyMenu: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await handleRequest(res, async () => {
        return service.getDailyMenu(req.params.id);
    })

    return next();
}


