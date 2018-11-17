import { RequestHandler, NextFunction, Request, Response } from 'express'
import request, { RequestPromise } from 'request-promise-native'
import { ZOMATO_URL, ZOMATO_API_KEY } from '../zomato'
import { SEARCH_RESULT_TYPE, SearchResult, Restaurant, DailyMenu } from '../models/DTO'

const headers = { 'Content-Type': 'application/json', 'user-key': ZOMATO_API_KEY };

export var search = async (q: string, city: string): Promise<SearchResult> => {
    return await request.get(`${ZOMATO_URL}/search`, {
        headers,
        json: true,
        transform: i => ({
            restaurants: i.restaurants.map(r => ({
                id: r.restaurant.id,
                name: r.restaurant.name,
                thumb: r.restaurant.thumb,
                url: r.restaurant.url,
                source: SEARCH_RESULT_TYPE.Zomato
            }))
        }),
        qs: {
            entity_id: city,
            entity_type: "city",
            q: q
        }
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
}

export var getRestaurantDetail = async (id: number): Promise<Restaurant> => {
    return await request.get(`${ZOMATO_URL}/restaurant`, {
        headers,
        json: true,
        transform: i => ({
            id: i.id,
            name: i.name,
            thumb: i.thumb,
            url: i.url,
            source: SEARCH_RESULT_TYPE.Zomato
        }),
        qs: {
            res_id: id
        }
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
}

export var getDailyMenu = async (id:number): Promise<DailyMenu> => {
    return await request.get(`${ZOMATO_URL}/dailymenu`, {
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
            res_id: id
        }
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
}


