"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const DTO_1 = require("../models/DTO");
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const scrapers_1 = __importDefault(require("../scrapers"));
exports.getDetails = (name) => {
    var result = scrapers_1.default.find(x => x.id.indexOf(name) != -1);
    return {
        id: result.id,
        name: result.name,
        source: DTO_1.SEARCH_RESULT_TYPE.Custom,
        thumb: result.thumb,
        url: result.url
    };
};
exports.search = (name) => {
    if (name == null)
        return [];
    var result = scrapers_1.default.filter(searchArray(name)).map(x => ({
        id: x.id,
        name: x.name,
        source: DTO_1.SEARCH_RESULT_TYPE.Custom,
        thumb: x.thumb,
        url: x.url
    }));
    return result;
};
var searchArray = (name) => {
    return (item) => {
        let query = normalize(name);
        return normalize(item.id).indexOf(query) != -1 || query.indexOf(item.id) != -1;
    };
};
var normalize = (text) => {
    return text.toUpperCase().replace(/\s+/, '');
};
exports.getAll = () => {
    var result = scrapers_1.default.map(x => ({
        id: x.id,
        name: x.name,
        source: DTO_1.SEARCH_RESULT_TYPE.Custom,
        thumb: x.thumb,
        url: x.url
    }));
    return result;
};
exports.scrape = (scraperName) => __awaiter(this, void 0, void 0, function* () {
    var scraper = scrapers_1.default.find(x => x.id === scraperName);
    if (!scraper) {
        return null;
    }
    return yield request_promise_native_1.default.get(scraper.url, {
        json: false,
        transform: i => (scraper.scrape(i))
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
});
//# sourceMappingURL=CustomService.js.map