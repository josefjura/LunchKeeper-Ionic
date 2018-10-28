import ch from 'cheerio'
import { IScraper } from './Common'
import { DailyMenu, Section, SEARCH_RESULT_TYPE } from '../models/DTO'


export class LokalBlokScraper implements IScraper {
    thumb: string = "http://www.lokalblok.cz/assets/cs/images/logo.png";
    source: SEARCH_RESULT_TYPE = SEARCH_RESULT_TYPE.Custom;
    id: string = "lokalblok";
    name: string = "LokalBlok";
    url: string = 'http://www.lokalblok.cz/jidelni-listek';

    scrape: (html: string) => DailyMenu = (html) => {
        let currentDayMenu = ch.load(html)("#lunch .menu-section").first();

        if (!currentDayMenu) return null;

        //var day = currentDayMenu.find('h2').text();
        var dishes = currentDayMenu.find('p');

        let toReturn: DailyMenu = {
            sections: []
        };

        let mainSection: Section = {
            name: "",
            dishes: []
        }

        dishes.each((i, el) => {
            var chel = ch(el);

            var priceEl = chel.find("span").first();
            var price = priceEl.text();
            priceEl.remove();
            var text = chel.text().trim();
            mainSection.dishes.push({
                name: text,
                price: price
            })
        });

        toReturn.sections.push(mainSection);
        return toReturn;
    };
}
