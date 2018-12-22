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
const moxios_1 = __importDefault(require("moxios"));
const chai_1 = require("chai");
const ZomatoService_1 = require("../services/ZomatoService");
const ZomatoResponses_1 = require("./ZomatoResponses");
describe('Zomato service', () => {
    describe('search', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.install();
        });
        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.uninstall();
        });
        it('just call it', () => __awaiter(this, void 0, void 0, function* () {
            const restaurant = {
                id: "16774318",
                name: "Otto Enoteca & Pizzeria",
                thumb: "https://b.zmtcdn.com/data/pictures/chains/8/16774318/a54deb9e4dbb79dd7c8091b30c642077_featured_thumb.png",
                url: "https://www.zomato.com/new-york-city/otto-enoteca-pizzeria-greenwich-village"
            };
            moxios_1.default.wait(function () {
                const request = moxios_1.default.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: ZomatoResponses_1.searchResponse
                });
            });
            const result = yield ZomatoService_1.search("test", '84');
            chai_1.expect(result).not.to.be.null;
            chai_1.expect(result).not.to.be.undefined;
            //expect(result.length).to.eq(1);
            const result1 = result.restaurants[0];
            chai_1.expect(result1.id).to.eq(restaurant.id);
            chai_1.expect(result1.name).to.eq(restaurant.name);
            chai_1.expect(result1.source).to.eq(0);
            chai_1.expect(result1.thumb).to.eq(restaurant.thumb);
            chai_1.expect(result1.url).to.eq(restaurant.url);
        }));
    });
    describe('getRestaurantDetail', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.install();
        });
        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.uninstall();
        });
        it('just call it', () => __awaiter(this, void 0, void 0, function* () {
            const restaurant = {
                id: "16774318",
                name: "Otto Enoteca & Pizzeria",
                thumb: "https://b.zmtcdn.com/data/pictures/chains/8/16774318/a54deb9e4dbb79dd7c8091b30c642077_featured_thumb.png",
                url: "https://www.zomato.com/new-york-city/otto-enoteca-pizzeria-greenwich-village"
            };
            moxios_1.default.wait(function () {
                const request = moxios_1.default.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: ZomatoResponses_1.restaurantResponse
                });
            });
            const result = yield ZomatoService_1.getRestaurantDetail(16774318);
            chai_1.expect(result).not.to.be.null;
            chai_1.expect(result).not.to.be.undefined;
            //expect(result.length).to.eq(1);
            chai_1.expect(result.id).to.eq(restaurant.id);
            chai_1.expect(result.name).to.eq(restaurant.name);
            chai_1.expect(result.source).to.eq(0);
            chai_1.expect(result.thumb).to.eq(restaurant.thumb);
            chai_1.expect(result.url).to.eq(restaurant.url);
        }));
    });
    describe('getDailyMenu', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.install();
        });
        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.uninstall();
        });
        it('just call it', () => __awaiter(this, void 0, void 0, function* () {
            const section = {
                name: "Vinohradský pivovar"
            };
            const dish = {
                name: "Tatarák ze sumce s toustem",
                price: "149 Kč"
            };
            moxios_1.default.wait(function () {
                const request = moxios_1.default.requests.mostRecent();
                request.respondWith({
                    status: 200,
                    response: ZomatoResponses_1.dailyMenuResponse
                });
            });
            const result = yield ZomatoService_1.getDailyMenu(16774318);
            chai_1.expect(result).not.to.be.null;
            chai_1.expect(result).not.to.be.undefined;
            //expect(result.length).to.eq(1);
            chai_1.expect(result.sections).not.to.be.null;
            chai_1.expect(result.sections.length).to.eq(1);
            var section1 = result.sections[0];
            chai_1.expect(section1.name).to.eq(section.name);
            chai_1.expect(section1.dishes).not.to.be.null;
            chai_1.expect(section1.dishes.length).to.eq(1);
            var dish1 = section1.dishes[0];
            chai_1.expect(dish1).not.to.be.null;
            chai_1.expect(dish1.name).to.be.eq(dish.name);
            chai_1.expect(dish1.price).to.be.eq(dish.price);
        }));
    });
});
//# sourceMappingURL=ZomatoService.spec.js.map