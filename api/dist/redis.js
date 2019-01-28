"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("redis");
exports.REDIS_URL = process.env.REDIS_URL;
exports.redis = redis_1.createClient(exports.REDIS_URL);
function init() {
    console.log("Initializing REDIS on " + exports.REDIS_URL);
}
exports.init = init;
//# sourceMappingURL=redis.js.map