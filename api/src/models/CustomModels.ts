export class DailyMenu {
    sections: Section[];
}

export class Section {
    name: string;
    dishes: Dish[];
}

export class Dish{
    name: string;
    price: string;
}