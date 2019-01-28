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
const chai_1 = require("chai");
const LunchService_1 = require("../services/LunchService");
const DTO_1 = require("../models/DTO");
const sinon_1 = __importDefault(require("sinon"));
const customService = __importStar(require("../services/CustomService"));
const zomatoService = __importStar(require("../services/ZomatoService"));
var sandbox = sinon_1.default.createSandbox();
describe('Lunch service', () => {
    afterEach(function () {
        // import and pass your custom axios instance to this method
        sandbox.restore();
    });
    describe('search', () => {
        it('positive', () => __awaiter(this, void 0, void 0, function* () {
            sandbox.stub(customService, "search").returns([{
                    id: "", name: "", source: DTO_1.SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
                }]);
            sandbox.stub(zomatoService, "search").resolves({
                restaurants: [{
                        id: "", name: "", source: DTO_1.SEARCH_RESULT_TYPE.Zomato, thumb: "", url: ""
                    }]
            });
            const result = yield LunchService_1.search("test");
            chai_1.expect(result).to.not.be.null;
            chai_1.expect(result.restaurants).to.not.be.null;
            chai_1.expect(result.restaurants.length).to.eq(2);
        }));
        it('zomato result empty', () => __awaiter(this, void 0, void 0, function* () {
            sandbox.stub(customService, "search").returns([{
                    id: "", name: "", source: DTO_1.SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
                }]);
            sandbox.stub(zomatoService, "search").resolves({ restaurants: [] });
            const result = yield LunchService_1.search("test");
            chai_1.expect(result).to.not.be.null;
            chai_1.expect(result.restaurants).to.not.be.null;
            chai_1.expect(result.restaurants.length).to.eq(1);
        }));
    });
    describe('dailyMenu', () => {
        it('positive', () => __awaiter(this, void 0, void 0, function* () {
            sandbox.stub(customService, "scrape").resolves({
                thumb: '', name: 'test',
                sections: [
                    {
                        name: "CUSTOM", dishes: [
                            { name: "", price: "" }
                        ]
                    }
                ]
            });
            sandbox.stub(zomatoService, "getDailyMenu").resolves({
                thumb: '', name: 'test',
                sections: [
                    {
                        name: "ZOMATO", dishes: [
                            { name: "", price: "" }
                        ]
                    }
                ]
            });
            const result = yield LunchService_1.dailyMenu(DTO_1.SEARCH_RESULT_TYPE.Custom, 16774318);
            chai_1.expect(result).not.to.be.null;
            chai_1.expect(result).not.to.be.undefined;
            chai_1.expect(result.sections.length).to.eq(1);
            chai_1.expect(result.sections[0].name).to.eq("CUSTOM");
            const result2 = yield LunchService_1.dailyMenu(DTO_1.SEARCH_RESULT_TYPE.Zomato, 16774318);
            chai_1.expect(result2).not.to.be.null;
            chai_1.expect(result2).not.to.be.undefined;
            chai_1.expect(result2.sections.length).to.eq(1);
            chai_1.expect(result2.sections[0].name).to.eq("ZOMATO");
        }));
        it('zomato null', () => __awaiter(this, void 0, void 0, function* () {
            sandbox.stub(customService, "scrape").resolves({
                thumb: '', name: 'test',
                sections: [
                    {
                        name: "CUSTOM", dishes: [
                            { name: "", price: "" }
                        ]
                    }
                ]
            });
            sandbox.stub(zomatoService, "getDailyMenu").resolves(null);
            const result2 = yield LunchService_1.dailyMenu(DTO_1.SEARCH_RESULT_TYPE.Zomato, 16774318);
            chai_1.expect(result2).to.be.null;
        }));
    });
    describe('details', () => {
        it('positive', () => __awaiter(this, void 0, void 0, function* () {
            sandbox.stub(customService, "getDetails").returns({
                id: "", name: "", source: DTO_1.SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
            });
            sandbox.stub(zomatoService, "getRestaurantDetail").resolves({
                id: "", name: "", source: DTO_1.SEARCH_RESULT_TYPE.Zomato, thumb: "", url: ""
            });
            const result = yield LunchService_1.details(DTO_1.SEARCH_RESULT_TYPE.Custom, 16774318);
            chai_1.expect(result).not.to.be.null;
            chai_1.expect(result).not.to.be.undefined;
            chai_1.expect(result.source).to.eq(DTO_1.SEARCH_RESULT_TYPE.Custom);
            const result2 = yield LunchService_1.details(DTO_1.SEARCH_RESULT_TYPE.Zomato, 16774318);
            chai_1.expect(result2).not.to.be.null;
            chai_1.expect(result2).not.to.be.undefined;
            chai_1.expect(result2.source).to.eq(DTO_1.SEARCH_RESULT_TYPE.Zomato);
        }));
        it('zomato null', () => __awaiter(this, void 0, void 0, function* () {
            sandbox.stub(customService, "getDetails").returns({
                id: "", name: "", source: DTO_1.SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
            });
            sandbox.stub(zomatoService, "getRestaurantDetail").resolves(null);
            const result = yield LunchService_1.details(DTO_1.SEARCH_RESULT_TYPE.Custom, 16774318);
            chai_1.expect(result).not.to.be.null;
            chai_1.expect(result).not.to.be.undefined;
            chai_1.expect(result.source).to.eq(DTO_1.SEARCH_RESULT_TYPE.Custom);
            const result2 = yield LunchService_1.details(DTO_1.SEARCH_RESULT_TYPE.Zomato, 16774318);
            chai_1.expect(result2).to.be.null;
        }));
    });
});
//# sourceMappingURL=LunchService.spec.js.map