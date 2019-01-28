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
const moxios_1 = __importDefault(require("moxios"));
const chai_1 = require("chai");
const ZomatoService_1 = require("../services/ZomatoService");
const ZomatoResponses_1 = require("./ZomatoResponses");
const cacheService = __importStar(require("../services/CacheService"));
const sinon_1 = __importDefault(require("sinon"));
var sandbox = sinon_1.default.createSandbox();
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
        it('positive', () => __awaiter(this, void 0, void 0, function* () {
            const restaurant = {
                id: "16507310",
                name: "Anděl Plzeňský Restaurant",
                thumb: "https://b.zmtcdn.com/data/res_imagery/16507310_RESTAURANT_2acc7e10158c13c576675990eb90fadc.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
                url: "https://www.zomato.com/praha/anděl-plzeňský-restaurant-smíchov-praha-5?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
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
        it('400', () => __awaiter(this, void 0, void 0, function* () {
            moxios_1.default.wait(function () {
                const request = moxios_1.default.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: {
                        "code": 400,
                        "status": "Bad Request",
                        "message": "No Daily Menu Available"
                    }
                });
            });
            const result = yield ZomatoService_1.search("test", "84");
            chai_1.expect(result).to.not.be.null;
            chai_1.expect(result.restaurants).to.not.be.null;
            chai_1.expect(result.restaurants.length).to.eq(0);
        }));
    });
    describe('getRestaurantDetail', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.install();
            sandbox.stub(cacheService, "getDetails").returns(null);
            sandbox.stub(cacheService, "setDetails").returns(null);
        });
        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.uninstall();
            sandbox.restore();
        });
        it('positive', () => __awaiter(this, void 0, void 0, function* () {
            const restaurant = {
                id: "16507624",
                name: "Vinohradský pivovar",
                url: "https://www.zomato.com/praha/vinohradský-pivovar-vinohrady-praha-10?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                thumb: "https://b.zmtcdn.com/data/res_imagery/16507624_RESTAURANT_08db723b05fde859573093f042446e00.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
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
        it('400', () => __awaiter(this, void 0, void 0, function* () {
            moxios_1.default.wait(function () {
                const request = moxios_1.default.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: {
                        "code": 400,
                        "status": "Bad Request",
                        "message": "No Daily Menu Available"
                    }
                });
            });
            const result = yield ZomatoService_1.getRestaurantDetail(16774318);
            chai_1.expect(result).to.be.null;
        }));
    });
    describe('getDailyMenu', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.install();
            sandbox.stub(cacheService, "getMenu").returns(null);
            sandbox.stub(cacheService, "setMenu").returns(null);
            sandbox.stub(cacheService, "getDetails").returns(null);
            sandbox.stub(cacheService, "setDetails").returns(null);
        });
        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios_1.default.uninstall();
            sandbox.restore();
        });
        it('positive', () => __awaiter(this, void 0, void 0, function* () {
            const section = {
                name: "Polévky"
            };
            const dish = {
                name: "Bramboračka s hříbky",
                price: "45 Kč"
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
            chai_1.expect(result.sections.length).to.eq(5);
            var section1 = result.sections[0];
            chai_1.expect(section1.name).to.eq(section.name);
            chai_1.expect(section1.dishes).not.to.be.null;
            chai_1.expect(section1.dishes.length).to.eq(1);
            var dish1 = section1.dishes[0];
            chai_1.expect(dish1).not.to.be.null;
            chai_1.expect(dish1.name).to.be.eq(dish.name);
            chai_1.expect(dish1.price).to.be.eq(dish.price);
        }));
        it('400', () => __awaiter(this, void 0, void 0, function* () {
            moxios_1.default.wait(function () {
                const request = moxios_1.default.requests.mostRecent();
                request.respondWith({
                    status: 400,
                    response: {
                        "code": 400,
                        "status": "Bad Request",
                        "message": "No Daily Menu Available"
                    }
                });
            });
            const result = yield ZomatoService_1.getDailyMenu(16774318);
            chai_1.expect(result).to.be.null;
        }));
    });
});
//# sourceMappingURL=ZomatoService.spec.js.map