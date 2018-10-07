import $ from 'cheerio'
import { IScraper } from './common'

@IScraper.register
class LokalBlokScraper implements IScraper {
    name: string = "LokalBlok";
    url: string;
    scrape: (html: string) => DailyMenu = (html) => {


        return new DailyMenu();
    };
}