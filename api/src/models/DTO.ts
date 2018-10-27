export interface SearchResult {
    restaurants: Restaurant[]
}

export interface Restaurant {
    id: number
    name: string
    url: string
    thumb: string
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