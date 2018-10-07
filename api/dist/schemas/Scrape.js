"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.ScrapeSchema = new mongoose_1.Schema({
    name: String,
    url: String,
    path: String
});
exports.Scrape = mongoose_1.model("Scrape", exports.ScrapeSchema);
//# sourceMappingURL=Scrape.js.map