import { DailyMenu, SEARCH_RESULT_TYPE } from '../models/DTO'

export interface IScraper {
    url : string;
    id: string;
    name: string;
    thumb: string;
    source: SEARCH_RESULT_TYPE;
    scrape(input: string) : Promise<DailyMenu>;
}