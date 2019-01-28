"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LokalBlokScraper_1 = require("./LokalBlokScraper");
const RedCafeScraper_1 = require("./RedCafeScraper");
const scrapers = [
    new LokalBlokScraper_1.LokalBlokScraper(),
    new RedCafeScraper_1.RedCafeScraper()
];
exports.default = scrapers;
//# sourceMappingURL=index.js.map