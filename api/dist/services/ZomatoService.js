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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const zomato_1 = require("../zomato");
const DTO_1 = require("../models/DTO");
const cacheService = __importStar(require("../services/CacheService"));
const headers = { 'Content-Type': 'application/json', 'user-key': zomato_1.ZOMATO_API_KEY };
exports.search = (q, city) => __awaiter(this, void 0, void 0, function* () {
    try {
        const result = yield axios_1.default.get(`${zomato_1.ZOMATO_URL}/search`, {
            headers,
            params: {
                entity_id: city,
                entity_type: "city",
                q: q
            }
        });
        const mapped = {
            restaurants: result.data.restaurants.map((r) => ({
                id: r.restaurant.id,
                name: r.restaurant.name,
                thumb: r.restaurant.thumb,
                url: r.restaurant.url,
                source: DTO_1.SEARCH_RESULT_TYPE.Zomato
            }))
        };
        return mapped;
    }
    catch (err) {
        return {
            restaurants: []
        };
    }
});
exports.getRestaurantDetail = (id) => __awaiter(this, void 0, void 0, function* () {
    try {
        let cached = yield cacheService.getDetails(id.toString());
        if (cached)
            return cached;
        const result = yield axios_1.default.get(`${zomato_1.ZOMATO_URL}/restaurant`, {
            headers,
            params: {
                res_id: id
            }
        });
        const mapped = {
            id: result.data.id,
            name: result.data.name,
            thumb: result.data.thumb,
            url: result.data.url,
            source: DTO_1.SEARCH_RESULT_TYPE.Zomato
        };
        yield cacheService.setDetails(mapped);
        return mapped;
    }
    catch (err) {
        return null;
    }
});
exports.getDailyMenu = (id) => __awaiter(this, void 0, void 0, function* () {
    try {
        let cached = yield cacheService.getMenu(id.toString());
        if (cached)
            return cached;
        const result = yield axios_1.default.get(`${zomato_1.ZOMATO_URL}/dailymenu`, {
            headers,
            params: {
                res_id: id
            }
        });
        const details = yield exports.getRestaurantDetail(id);
        const mapped = {
            name: details.name,
            thumb: details.thumb,
            sections: result.data.daily_menus.map(r => ({
                name: r.daily_menu.name,
                dishes: r.daily_menu.dishes.map(d => ({
                    name: d.dish.name,
                    price: d.dish.price
                }))
            }))
        };
        yield cacheService.setMenu(id.toString(), mapped);
        return mapped;
    }
    catch (err) {
        return null;
    }
});
//# sourceMappingURL=ZomatoService.js.map