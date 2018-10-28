import { RequestHandler, NextFunction, Request, Response } from 'express'
import { Restaurant, SEARCH_RESULT_TYPE } from '../models/DTO'

import request from 'request'
import scrapers from '../scrapers'

const headers = { 'Content-Type': 'application/json' };

export var getAll: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    var result = scrapers.map<Restaurant>(x => (
        {
            id: x.id,
            name: x.name,
            source: SEARCH_RESULT_TYPE.Custom,
            thumb: x.thumb,
            url: x.url
        }
    ))
    res.status(200).json(result);
}

export var scrape: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    var scraperName = req.params.name;
    var scraper = scrapers.find(x => x.id === scraperName);
    if (!scraper) {
        res.status(404).send({ error: "NOT_FOUND", message: "Scraper not found" });
    }
    else {
        request.get(scraper.url, {
            headers
        }, (error, res2, body) => {
            if (error) {
                res.status(500).send({ error: "INTERNAL", message: "Internal error during web scrape" });
            } else {
                res.status(200).send(
                    scraper.scrape(res2.body)
                )
            }
        });
    }
}




