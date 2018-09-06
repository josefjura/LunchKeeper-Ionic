export class SearchResult {
    restaurants : RestaurantInfo[]
}

export class RestaurantInfoViewModel {
    name: string;
    id: number;
    thumb: string;
    isSelected: boolean;
}

export class RestaurantInfo {
    name: string;
    id: number;
    thumb: string;
}

export class RestaurantDetail extends RestaurantInfo {
    menus: DailyMenu[]
}

export class DailyMenu {
    dishes : Dish[]
}

export class Dish {
    name : string
    price : string;
}