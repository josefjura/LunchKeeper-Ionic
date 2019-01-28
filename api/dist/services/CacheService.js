"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_1 = require("../redis");
const util_1 = require("util");
const getAsync = util_1.promisify(redis_1.redis.get).bind(redis_1.redis);
const setAsync = util_1.promisify(redis_1.redis.set).bind(redis_1.redis);
const EXPIRE_DURATION = 2 * 60 * 60;
function addItem(hashType, key, content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield setAsync(hashType + ':' + key, JSON.stringify(content), 'EX', EXPIRE_DURATION);
    });
}
exports.addItem = addItem;
function getItem(hashType, key) {
    return __awaiter(this, void 0, void 0, function* () {
        var reply = yield getAsync(hashType + ":" + key);
        return JSON.parse(reply);
    });
}
exports.getItem = getItem;
function setDetails(details) {
    addItem("details", details.id.toString(), details);
    addItem("name", details.id.toString(), details.name);
}
exports.setDetails = setDetails;
function setMenu(key, menu) {
    addItem("menu", key, menu);
}
exports.setMenu = setMenu;
function getName(key) {
    return getItem("name", key);
}
exports.getName = getName;
function getDetails(key) {
    return getItem("details", key);
}
exports.getDetails = getDetails;
function getMenu(key) {
    return getItem("menu", key);
}
exports.getMenu = getMenu;
//# sourceMappingURL=CacheService.js.map