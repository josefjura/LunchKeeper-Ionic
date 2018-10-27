"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const scrapers_1 = __importDefault(require("../scrapers"));
const headers = { 'Content-Type': 'application/json' };
exports.getAll = (req, res, next) => {
    var result = scrapers_1.default.map(x => {
        return {
            name: x.name,
            fullName: x.fullName,
            url: x.url
        };
    });
    console.log(result);
    res.status(200).json(result);
};
exports.scrape = (req, res, next) => {
    var scraperName = req.params.name;
    var scraper = scrapers_1.default.find(x => x.name === scraperName);
    if (!scraper)
        return res.status(404).send({ error: "NOT_FOUND", message: "Scraper not found" });
    request_1.default.get(scraper.url, {
        headers
    }, (error, res2, body) => {
        if (error) {
            res.status(500).send({ error: "INTERNAL", message: "Internal error during web scrape" });
        }
        else {
            res.status(200).send(scraper.scrape(res2.body));
        }
    });
};
//# sourceMappingURL=CustomController.js.map