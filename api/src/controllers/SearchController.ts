import { RequestHandler, NextFunction, Request, Response } from 'express'
import request from 'request'
import { handleCall } from './Common'

const apiUrl = "https://developers.zomato.com/api/v2.1";
const headers = { 'Content-Type': 'application/json', 'user-key': '7801edd0712e8d74b9947053e48a9f1a' };

export var doSearch: RequestHandler = (req: Request, res: Response, next: NextFunction): any => {
    request.get(`${apiUrl}/search`, {
        headers,
        qs: {
            entity_id: req.params.city,
            entity_type: "city",
            q: req.query.q
        }
    }, handleCall(res, next))
}

