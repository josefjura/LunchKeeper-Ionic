"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express"); // call express
const zomato = __importStar(require("./controllers/ZomatoController"));
const custom = __importStar(require("./controllers/CustomController"));
const lunch = __importStar(require("./controllers/LunchController"));
const UtilityRepository_1 = require("./controllers/UtilityRepository");
const redis = __importStar(require("./redis"));
var pj = require('../package.json');
const redisUrlParse = require('redis-url-parse');
var redisConfig = redisUrlParse(redis.REDIS_URL);
function init() {
    var router = express_1.Router(); // get an instance of the express Router
    // test route to make sure everything is working (accessed at GET http://localhost:8080/api)
    router.get('/', (req, res) => {
        res.status(200).json({ message: "LunchKeeper API " + pj.version });
    });
    router.get('/zomato/search/:city', zomato.search);
    router.get('/zomato/:id', zomato.getRestaurantDetail);
    router.get('/zomato/:id/dailymenu', zomato.getDailyMenu);
    router.get('/custom/all', custom.getAll);
    router.get('/custom/:name', custom.scrape);
    router.get('/lunch', lunch.search);
    router.get('/lunch/:type/:id', lunch.details);
    router.get('/lunch/:type/:id/menu', lunch.dailyMenu);
    router.get('/ping/db', UtilityRepository_1.pingDb);
    return router;
}
exports.init = init;
//# sourceMappingURL=routes.js.map