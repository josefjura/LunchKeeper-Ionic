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
const pdfjs_dist_1 = __importDefault(require("pdfjs-dist"));
class RedCafeScraper {
    constructor() {
        this.url = "http://www.redcafeprague.cz/assets/menu.pdf";
        this.id = "redcafe";
        this.name = "Red Cafe Stodůlky";
        this.thumb = "http://www.redcafeprague.cz/images/logo_redcafe_white_final.png?crc=92028659";
        this.source = DTO_1.SEARCH_RESULT_TYPE.Custom;
    }
    scrape(input) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log("HIT");
            try {
                var toReturn = {
                    name: this.name,
                    thumb: this.thumb,
                    sections: []
                };
                var prom = yield pdfjs_dist_1.default.getDocument(this.url);
                //some.then((prom: PDFDocumentProxy) => {
                //console.log("HOT");
                var page = yield prom.getPage(1);
                var anns = yield page.getAnnotations();
                // for (var an in anns) {
                //     const item = anns[an];
                //     values[item.fieldName] = item.fieldValue;
                // }
                var values = [];
                var section = {
                    name: "",
                    dishes: []
                };
                anns.forEach(element => {
                    if (element.fieldName === 'datum') {
                        section.name = element.fieldValue;
                    }
                    else {
                        var skibedeedop = element.fieldName.split(' - ');
                        var food = skibedeedop[0] || "";
                        var type = skibedeedop[1] || "";
                        // console.log(`Setting ${food}.${type} to ${element.fieldValue}`);
                        // if (!values[food.toLowerCase()]) values[food.toLowerCase()] = {};
                        // values[food.toLowerCase()][type.toLowerCase()] = element.fieldValue;
                        values.push({ food: food.toLowerCase(), type: type.toLowerCase(), value: element.fieldValue });
                    }
                });
                var test = values.reduce((acc, curr) => {
                    var food = curr.food;
                    delete curr.food;
                    var newObj = {};
                    newObj[curr.type] = curr.value;
                    if (!acc[food])
                        acc[food] = {};
                    Object.assign(acc[food], newObj);
                    return acc;
                }, []);
                // UGLY AS FUCK - THE WHOLE ALGORITHM IS SHIT
                for (const key in test) {
                    if (test.hasOwnProperty(key)) {
                        const el = test[key];
                        section.dishes.push({
                            name: el.cz || el.en || el.aj,
                            price: el.cena
                        });
                    }
                }
                toReturn.sections.push(section);
                console.log(toReturn.sections[0].dishes);
                //console.log(values);
                return toReturn;
                //})
                //console.log(some);
            }
            catch (err) {
                console.error(err);
            }
            return null;
        });
    }
}
exports.RedCafeScraper = RedCafeScraper;
//# sourceMappingURL=RedCafeScraper.js.map