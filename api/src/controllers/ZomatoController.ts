import { RequestHandler, NextFunction, Request, Response } from 'express'
import request from 'request-promise'
import {ZOMATO_URL, ZOMATO_API_KEY} from '../zomato'

const headers = { 'Content-Type': 'application/json', 'user-key': ZOMATO_API_KEY };

export var doSearch: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await request.get(`${ZOMATO_URL}/search`, {
        headers,
        json: true,
        transform: i => ({
            restaurants: i.restaurants.map(r => ({
                id: r.restaurant.id,
                name: r.restaurant.name,
                thumb: r.restaurant.thumb,
                url: r.restaurant.url
            }))
        }),
        qs: {
            entity_id: req.params.city,
            entity_type: "city",
            q: req.query.q
        }
    }).then(handleFullfill(res), handleReject(res));

    return next();
}

export var getRestaurantDetail: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await request.get(`${ZOMATO_URL}/restaurant`, {
        headers,
        json: true,
        transform: i => ({
            id: i.restaurant.id,
            name: i.restaurant.name,
            thumb: i.restaurant.thumb,
            url: i.restaurant.url
        }),
        qs: {
            res_id: req.params.id
        }
    }).then(handleFullfill(res), handleReject(res));

    return next();
}

export var getDailyMenu: RequestHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    await request.get(`${ZOMATO_URL}/dailymenu`, {
        headers,
        json: true,
        transform: i => ({
            sections: i.daily_menus.map(r => ({
                name: r.daily_menu.name,
                dishes: r.daily_menu.dishes.map(d => ({
                    name: d.dish.name,
                    price: d.dish.price
                }))
            }
            ))
        }),
        qs: {
            res_id: req.params.id
        }
    }).then(handleFullfill(res), handleReject(res));

    return next();
}

function handleFullfill(res: Response) {
    return (body) => { res.status(200).send(body); }
}

function handleReject(res: Response) {
    return (err) => { res.status(500).send(err) }
}


