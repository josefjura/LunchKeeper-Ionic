import { RequestHandler, NextFunction, Request, Response } from 'express'
import { Scrape } from '../schemas/Scrape'
import uuidv4 from 'uuid/v4';

import request from 'request'
import scrapers from '../scrapers'

const headers = { 'Content-Type': 'application/json' };

export var getAll: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    return scrapers.map(x => { x.name, x.url });
}

export var scrape: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    var scraperName = req.params.name;
    var scraper = scrapers.find(x => x.name === scraperName);
    if (!scraper) return res.status(404).send({ error: "NOT_FOUND", message: "Scraper not found" });

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




