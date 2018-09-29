"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const request_1 = __importDefault(require("request"));
const Common_1 = require("./Common");
const apiUrl = "https://developers.zomato.com/api/v2.1";
const headers = { 'Content-Type': 'application/json', 'user-key': '7801edd0712e8d74b9947053e48a9f1a' };
exports.doSearch = (req, res, next) => {
    request_1.default.get(`${apiUrl}/search`, {
        headers,
        qs: {
            entity_id: req.params.city,
            entity_type: "city",
            q: req.query.q
        }
    }, Common_1.handleCall(res, next));
};
//# sourceMappingURL=SearchController.js.map