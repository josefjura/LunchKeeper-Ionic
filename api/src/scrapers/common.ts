import { DailyMenu, Dish, Section } from '../models/CustomModels'

export interface IScraper {
    url : string;
    name: string;
    fullName: string;
    scrape(input: string) : DailyMenu;
}