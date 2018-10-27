"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
class LokalBlokScraper {
    constructor() {
        this.name = "lokalblok";
        this.fullName = "LokalBlok";
        this.url = 'http://www.lokalblok.cz/jidelni-listek';
        this.scrape = (html) => {
            let currentDayMenu = cheerio_1.default.load(html)("#lunch .menu-section").first();
            if (!currentDayMenu)
                return null;
            //var day = currentDayMenu.find('h2').text();
            var dishes = currentDayMenu.find('p');
            let toReturn = {
                sections: []
            };
            let mainSection = {
                name: "",
                dishes: []
            };
            dishes.each((i, el) => {
                var chel = cheerio_1.default(el);
                var priceEl = chel.find("span").first();
                var price = priceEl.text();
                priceEl.remove();
                var text = chel.text().trim();
                mainSection.dishes.push({
                    name: text,
                    price: price
                });
            });
            toReturn.sections.push(mainSection);
            return toReturn;
        };
    }
}
exports.LokalBlokScraper = LokalBlokScraper;
//# sourceMappingURL=LokalBlokScraper.js.map