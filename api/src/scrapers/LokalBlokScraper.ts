import ch from 'cheerio'
import { IScraper } from './Common'
import { DailyMenu, Section } from '../models/CustomModels'


export class LokalBlokScraper implements IScraper {
    name: string = "lokalblok";
    url: string = 'http://www.lokalblok.cz/jidelni-listek';

    scrape: (html: string) => DailyMenu = (html) => {
        let currentDayMenu = ch.load(html)("#lunch .menu-section").first();

        if (!currentDayMenu) return null;

        //var day = currentDayMenu.find('h2').text();
        var dishes = currentDayMenu.find('p');

        let toReturn = new DailyMenu();
        toReturn.sections = [];
        let mainSection = new Section();
        mainSection.name = "";
        mainSection.dishes = []

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
