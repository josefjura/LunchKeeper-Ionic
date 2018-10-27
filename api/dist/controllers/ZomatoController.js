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
const request_promise_1 = __importDefault(require("request-promise"));
const Common_1 = require("./Common");
const apiUrl = "https://developers.zomato.com/api/v2.1";
const headers = { 'Content-Type': 'application/json', 'user-key': '7801edd0712e8d74b9947053e48a9f1a' };
exports.doSearch = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield request_promise_1.default.get(`${apiUrl}/search`, {
        headers,
        qs: {
            entity_id: req.params.city,
            entity_type: "city",
            q: req.query.q
        }
    });
    Common_1.proxyCall(res, next, i => ({
        restaurants: i.restaurants.map(r => ({
            id: r.id,
            name: r.name,
            thumb: r.thumb,
            url: r.url
        }))
    }));
});
exports.getRestaurantDetail = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield request_promise_1.default.get(`${apiUrl}/restaurant`, {
        headers,
        qs: {
            res_id: req.params.id
        }
    });
    Common_1.proxyCall(res, next, i => ({
        id: i.id,
        name: i.name,
        thumb: i.thumb,
        url: i.url
    }));
});
exports.getDailyMenu = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    yield request_promise_1.default.get(`${apiUrl}/dailymenu`, {
        headers,
        qs: {
            res_id: req.params.id
        }
    });
    Common_1.proxyCall(res, next, i => ({
        sections: i.daily_menu.map(r => ({
            name: r.name,
            dishes: r.dishes.map(d => ({
                name: d.name,
                price: d.price
            }))
        }))
    }));
});
//# sourceMappingURL=ZomatoController.js.map