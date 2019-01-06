import { Restaurant, SEARCH_RESULT_TYPE, DailyMenu } from '../models/DTO'

import axios from 'axios'
import scrapers from '../scrapers'
import { LokalBlokScraper } from '../scrapers/LokalBlokScraper';

export var getDetails = (name: string): Restaurant => {
    var result = scrapers.find(x => x.id.indexOf(name) != -1);

    return {
        id: result.id,
        name: result.name,
        source: SEARCH_RESULT_TYPE.Custom,
        thumb: result.thumb,
        url: result.url
    };
}

export var search = (name: string): Restaurant[] => {
    if (name == null) return [];
    var result = scrapers.filter(searchArray(name)).map<Restaurant>(x => (
        {
            id: x.id,
            name: x.name,
            source: SEARCH_RESULT_TYPE.Custom,
            thumb: x.thumb,
            url: x.url
        }
    ))

    return result;
}

var searchArray = (name: string) => {
    return (item: LokalBlokScraper) => {
        let query = normalize(name);
        return normalize(item.id).indexOf(query) != -1 || query.indexOf(normalize(item.id)) != -1;
    }
}

var normalize = (text): string => {
    return text.toUpperCase().replace(/\s+/, '');
}

export var getAll = (): Restaurant[] => {
    var result = scrapers.map<Restaurant>(x => (
        {
            id: x.id,
            name: x.name,
            source: SEARCH_RESULT_TYPE.Custom,
            thumb: x.thumb,
            url: x.url
        }
    ))

    return result;
}

export var scrape = async (scraperName: string): Promise<DailyMenu> => {
    var scraper = scrapers.find(x => x.id === scraperName);
    if (!scraper) {
        return null;
    }

    var response = await axios.get(scraper.url)
    var scraped = scraper.scrape(response.data);

    return scraped;
}