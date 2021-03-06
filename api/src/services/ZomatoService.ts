import axios from 'axios'
import { ZOMATO_URL, ZOMATO_API_KEY } from '../zomato'
import { SearchResult, Restaurant, DailyMenu, SEARCH_RESULT_TYPE } from '../models/DTO'
import * as cacheService from '../services/CacheService'

const headers = { 'Content-Type': 'application/json', 'user-key': ZOMATO_API_KEY };

export var search = async (q: string, city: string): Promise<SearchResult> => {
    try {
        const result = await axios.get(`${ZOMATO_URL}/search`, {
            headers,
            params: {
                entity_id: city,
                entity_type: "city",
                q: q
            }
        });

        const mapped: SearchResult = {
            restaurants: result.data.restaurants.map((r) => ({
                id: r.restaurant.id,
                name: r.restaurant.name,
                thumb: r.restaurant.thumb,
                url: r.restaurant.url,
                source: SEARCH_RESULT_TYPE.Zomato
            }))
        }

        return mapped;
    }
    catch (err) {
        return {
            restaurants: []
        };
    }
}

export var getRestaurantDetail = async (id: number): Promise<Restaurant> => {
    try {
        let cached = await cacheService.getDetails(id.toString());
        if (cached) return cached;

        const result = await axios.get(`${ZOMATO_URL}/restaurant`, {
            headers,
            params: {
                res_id: id
            }
        });

        const mapped: Restaurant = {
            id: result.data.id,
            name: result.data.name,
            thumb: result.data.thumb,
            url: result.data.url,
            source: SEARCH_RESULT_TYPE.Zomato
        };
        await cacheService.setDetails(mapped);
        return mapped;
    }
    catch (err) {
        return null;
    }
}

export var getDailyMenu = async (id: number): Promise<DailyMenu> => {
    try {
        let cached = await cacheService.getMenu(id.toString());
        if (cached) return cached;
        const result = await axios.get(`${ZOMATO_URL}/dailymenu`, {
            headers,
            params: {
                res_id: id
            }
        });

        const details = await getRestaurantDetail(id);
        
        const mapped: DailyMenu = {
            name: details.name,
            thumb: details.thumb,
            sections: result.data.daily_menus.map(r => ({
                name: r.daily_menu.name,
                dishes: r.daily_menu.dishes.map(d => ({
                    name: d.dish.name,
                    price: d.dish.price
                }))
            }
            ))
        };

        await cacheService.setMenu(id.toString(), mapped);
        return mapped;
    }
    catch (err) {
        return null;
    }
}


