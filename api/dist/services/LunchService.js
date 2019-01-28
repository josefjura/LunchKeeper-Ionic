"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DTO_1 = require("../models/DTO");
const ZomatoService = __importStar(require("../services/ZomatoService"));
const CustomService = __importStar(require("../services/CustomService"));
exports.search = (name) => __awaiter(this, void 0, void 0, function* () {
    var zomato = yield ZomatoService.search(name, "84");
    var custom = CustomService.search(name);
    let restaurants = [
        ...zomato.restaurants,
        ...custom
    ];
    return {
        restaurants
    };
});
exports.dailyMenu = (source, id) => __awaiter(this, void 0, void 0, function* () {
    switch (source) {
        case DTO_1.SEARCH_RESULT_TYPE.Zomato:
            return yield ZomatoService.getDailyMenu(id);
        case DTO_1.SEARCH_RESULT_TYPE.Custom:
            return yield CustomService.scrape(id);
        default:
            throw Error("Unknown SOURCE");
    }
});
exports.details = (source, id) => __awaiter(this, void 0, void 0, function* () {
    try {
        switch (source) {
            case DTO_1.SEARCH_RESULT_TYPE.Zomato:
                return yield ZomatoService.getRestaurantDetail(id);
            case DTO_1.SEARCH_RESULT_TYPE.Custom:
                return CustomService.getDetails(id);
            default:
                throw Error("Unknown SOURCE");
        }
    }
    catch (err) {
        console.error(err);
    }
});
//# sourceMappingURL=LunchService.js.map