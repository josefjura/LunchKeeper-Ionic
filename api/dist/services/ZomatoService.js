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
const request_promise_native_1 = __importDefault(require("request-promise-native"));
const zomato_1 = require("../zomato");
const DTO_1 = require("../models/DTO");
const headers = { 'Content-Type': 'application/json', 'user-key': zomato_1.ZOMATO_API_KEY };
exports.search = (q, city) => __awaiter(this, void 0, void 0, function* () {
    return yield request_promise_native_1.default.get(`${zomato_1.ZOMATO_URL}/search`, {
        headers,
        json: true,
        transform: i => ({
            restaurants: i.restaurants.map(r => ({
                id: r.restaurant.id,
                name: r.restaurant.name,
                thumb: r.restaurant.thumb,
                url: r.restaurant.url,
                source: DTO_1.SEARCH_RESULT_TYPE.Zomato
            }))
        }),
        qs: {
            entity_id: city,
            entity_type: "city",
            q: q
        }
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
});
exports.getRestaurantDetail = (id) => __awaiter(this, void 0, void 0, function* () {
    return yield request_promise_native_1.default.get(`${zomato_1.ZOMATO_URL}/restaurant`, {
        headers,
        json: true,
        transform: i => ({
            id: i.id,
            name: i.name,
            thumb: i.thumb,
            url: i.url,
            source: DTO_1.SEARCH_RESULT_TYPE.Zomato
        }),
        qs: {
            res_id: id
        }
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
});
exports.getDailyMenu = (id) => __awaiter(this, void 0, void 0, function* () {
    return yield request_promise_native_1.default.get(`${zomato_1.ZOMATO_URL}/dailymenu`, {
        headers,
        json: true,
        transform: i => ({
            sections: i.daily_menus.map(r => ({
                name: r.daily_menu.name,
                dishes: r.daily_menu.dishes.map(d => ({
                    name: d.dish.name,
                    price: d.dish.price
                }))
            }))
        }),
        qs: {
            res_id: id
        }
    }).then((json) => {
        return json;
    }, (err) => {
        throw Error(err);
    });
});
//# sourceMappingURL=ZomatoService.js.map