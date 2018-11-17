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
const Helpers_1 = require("./Helpers");
const service = __importStar(require("../services/CustomService"));
const headers = { 'Content-Type': 'application/json' };
exports.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    res.status(200).json(service.getAll());
});
exports.scrape = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
    var scraperName = req.params.name;
    yield Helpers_1.handleRequest(res, () => __awaiter(this, void 0, void 0, function* () {
        return service.scrape(scraperName);
    }));
    return next();
});
//# sourceMappingURL=CustomController.js.map