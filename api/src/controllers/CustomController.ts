import { RequestHandler, NextFunction, Request, Response } from 'express'
import { Restaurant, SEARCH_RESULT_TYPE } from '../models/DTO'
import { handleRequest } from './Helpers'
import request from 'request'
import scrapers from '../scrapers'
import * as service from '../services/CustomService'

const headers = { 'Content-Type': 'application/json' };

export var getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {    
    res.status(200).json(service.getAll());
}

export var scrape: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    var scraperName = req.params.name;
    await handleRequest(res, async () => {
        return service.scrape(scraperName);
    })

    return next();
}




