import { DailyMenu, Dish, Section } from '../models/CustomModels'

export interface IScraper {
    url : string;
    name: string;
    scrape(input: string) : DailyMenu;
}