import axios from 'axios'
import { ZOMATO_URL, ZOMATO_API_KEY } from '../zomato'
import { SearchResult, Restaurant, DailyMenu, SEARCH_RESULT_TYPE } from '../models/DTO'
import { Search } from '../models/Zomato';

const headers = { 'Content-Type': 'application/json', 'user-key': ZOMATO_API_KEY };

export var search = async (q: string, city: string): Promise<SearchResult> => {
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

export var getRestaurantDetail = async (id: number): Promise<Restaurant> => {
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

    return mapped;
}

export var getDailyMenu = async (id: number): Promise<DailyMenu> => {
    const result = await axios.get(`${ZOMATO_URL}/dailymenu`, {
        headers,
        params: {
            res_id: id
        }
    });
    
    const mapped: DailyMenu = {
        sections: result.data.daily_menu.map(r => ({
            name: r.name,
            dishes: r.dishes.map(d => ({
                name: d.name,
                price: d.price
            }))
        }
        ))
    };

    return mapped;
}


