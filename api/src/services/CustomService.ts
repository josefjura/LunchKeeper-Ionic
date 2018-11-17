import { RequestHandler, NextFunction, Request, Response } from 'express'
import { Restaurant, SEARCH_RESULT_TYPE, DailyMenu } from '../models/DTO'

import request from 'request-promise-native'
import scrapers from '../scrapers'

export var getDetails = (name: string): Restaurant => {
    var result = scrapers.find(x => x.id.indexOf(name) != -1);

    return {
        id: result.id,
        name: result.name,
        source: SEARCH_RESULT_TYPE.Custom,
        thumb: result.thumb,
        url: result.url
    };
}

export var search = (name: string): Restaurant[] => {
    var result = scrapers.filter(x => x.id.indexOf(name) != -1).map<Restaurant>(x => (
        {
            id: x.id,
            name: x.name,
            source: SEARCH_RESULT_TYPE.Custom,
            thumb: x.thumb,
            url: x.url
        }
    ))

    return result;
}

export var getAll = (): Restaurant[] => {
    var result = scrapers.map<Restaurant>(x => (
        {
            id: x.id,
            name: x.name,
            source: SEARCH_RESULT_TYPE.Custom,
            thumb: x.thumb,
            url: x.url
        }
    ))

    return result;
}

export var scrape = async (scraperName: string): Promise<DailyMenu> => {
    var scraper = scrapers.find(x => x.id === scraperName);
    if (!scraper) {
        return null;
    }

    return await request.get(scraper.url, {
        json: false,
        transform: i => (
            scraper.scrape(i)
        )
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });

}