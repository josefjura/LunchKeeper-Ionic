"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Scrape_1 = require("../schemas/Scrape");
const v4_1 = __importDefault(require("uuid/v4"));
exports.getAll = (req, res, next) => {
    Scrape_1.Scrape.find({}, (err, list) => {
        if (err)
            return res.status(500).send(err);
        res.status(200).send(list.map((item) => {
            return {
                name: item.name,
                url: item.url,
                path: item.path
            };
        }));
    });
};
exports.createRandom = (req, res, next) => {
    Scrape_1.Scrape.create(new Scrape_1.Scrape({
        name: v4_1.default(),
        url: "https://www.resturace.cz",
        path: "TEST_TEMP_DELETE_TRASH"
    })).then((done) => {
        res.status(200).send(done);
    });
};
//# sourceMappingURL=CustomController.js.map