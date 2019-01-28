"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cheerio_1 = __importDefault(require("cheerio"));
const DTO_1 = require("../models/DTO");
class LokalBlokScraper {
    constructor() {
        this.thumb = "http://www.lokalblok.cz/assets/cs/images/logo.png";
        this.source = DTO_1.SEARCH_RESULT_TYPE.Custom;
        this.id = "lokalblok";
        this.name = "LokalBlok";
        this.url = 'http://www.lokalblok.cz/jidelni-listek';
        this.scrape = (html) => {
            let currentDayMenu = cheerio_1.default.load(html)("#lunch .menu-section").first();
            if (!currentDayMenu)
                return null;
            var day = currentDayMenu.find('h2').text();
            var dishes = currentDayMenu.find('p');
            let toReturn = {
                name: this.name,
                thumb: this.thumb,
                sections: []
            };
            let mainSection = {
                name: day,
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
            return Promise.resolve(toReturn);
        };
    }
}
exports.LokalBlokScraper = LokalBlokScraper;
//# sourceMappingURL=LokalBlokScraper.js.map