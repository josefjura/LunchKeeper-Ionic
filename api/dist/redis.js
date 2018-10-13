"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.REDIS_URL = process.env.REDIS_URL || "redis://redis:6379";
function init() {
    console.log("Initializing REDIS on " + exports.REDIS_URL);
}
exports.init = init;
//# sourceMappingURL=redis.js.map