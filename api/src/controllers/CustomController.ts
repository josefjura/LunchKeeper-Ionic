import { RequestHandler, NextFunction, Request, Response } from 'express'
import { Scrape } from '../schemas/Scrape'
import uuidv4 from 'uuid/v4';

import request from 'request'
import { handleCall } from './Common'

export var getAll: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    Scrape.find({}, (err, list) => {
        if (err) return res.status(500).send(err);

        res.status(200).send(list.map((item) => {
            return {
                name: item.name,
                url: item.url,
                path: item.path
            }
        }));
    });
}

export var createRandom: RequestHandler = (req, res, next) => {
    Scrape.create(new Scrape({
        name: uuidv4(),
        url: "https://www.resturace.cz",
        path: "TEST_TEMP_DELETE_TRASH"
    })).then((done) => {
        res.status(200).send(done);
    });
}




