import { SearchResult, SEARCH_RESULT_TYPE } from '../models/DTO'
import * as ZomatoService from '../services/ZomatoService'
import * as CustomService from '../services/CustomService'
import { DailyMenu } from '../models/DTO';

export var search = async (name): Promise<SearchResult> => {
    var zomato = await ZomatoService.search(name, "84");
    var custom = CustomService.search(name);

    let restaurants = [
        ...zomato.restaurants,
        ...custom
    ]

    return {
        restaurants
    }
}

export var dailyMenu = async (source: SEARCH_RESULT_TYPE, id: number | string): Promise<DailyMenu> => {
    switch (source) {
        case SEARCH_RESULT_TYPE.Zomato:
            return await ZomatoService.getDailyMenu(id as number);
        case SEARCH_RESULT_TYPE.Custom:
            return await CustomService.scrape(id as string);
        default:
            throw Error;
    }
}