export interface SearchResult {
    restaurants: Restaurant[]
}

export interface Restaurant {
    id: number|string
    name: string
    url: string
    thumb: string
    source: SEARCH_RESULT_TYPE
}

export interface DailyMenu {
    sections: Section[];
}

export interface Section {
    name: string;
    dishes: Dish[];
}

export interface Dish {
    name: string;
    price: string;
}

export enum SEARCH_RESULT_TYPE {
    Zomato,
    Custom
}