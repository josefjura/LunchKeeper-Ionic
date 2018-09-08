export class SearchResult {
    restaurants: RestaurantInfo[]
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
    menus: DailyMenu[];
    public isEmpty() : boolean {
        return this.menus == null || this.menus.length == 0;
    }
}

export class DailyMenu {
    dishes: Dish[]
}

export class Dish {
    name: string
    price: string;
}