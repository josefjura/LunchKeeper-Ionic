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
const axios_1 = __importDefault(require("axios"));
const zomato_1 = require("../zomato");
const DTO_1 = require("../models/DTO");
const headers = { 'Content-Type': 'application/json', 'user-key': zomato_1.ZOMATO_API_KEY };
exports.search = (q, city) => __awaiter(this, void 0, void 0, function* () {
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
            id: r.id,
            name: r.name,
            thumb: r.thumb,
            url: r.url,
            source: DTO_1.SEARCH_RESULT_TYPE.Zomato
        }))
    };
    return mapped;
});
exports.getRestaurantDetail = (id) => __awaiter(this, void 0, void 0, function* () {
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
    return mapped;
});
exports.getDailyMenu = (id) => __awaiter(this, void 0, void 0, function* () {
    const result = yield axios_1.default.get(`${zomato_1.ZOMATO_URL}/dailymenu`, {
        headers,
        params: {
            res_id: id
        }
    });
    const mapped = {
        sections: result.data.daily_menu.map(r => ({
            name: r.name,
            dishes: r.dishes.map(d => ({
                name: d.name,
                price: d.price
            }))
        }))
    };
    return mapped;
});
//# sourceMappingURL=ZomatoService.js.map