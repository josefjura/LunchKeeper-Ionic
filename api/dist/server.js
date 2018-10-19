"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// server.js
const ZomatoController_1 = require("./controllers/ZomatoController");
const CustomController_1 = require("./controllers/CustomController");
const UtilityRepository_1 = require("./controllers/UtilityRepository");
const db = __importStar(require("./db"));
const redis = __importStar(require("./redis"));
const redisUrlParse = require('redis-url-parse');
console.log(`Starting LunchKeeper API (${process.env.NODE_ENV})`);
var redisConfig = redisUrlParse(redis.REDIS_URL);
//{host: 'example.com', port: 39143, database: '0', password: 'hunter2'}
console.log(redisConfig);
var cache = require('express-redis-cache')({
    host: redisConfig.host, port: redisConfig.port, auth_pass: redisConfig.password, expire: 3600
});
cache.on('message', function (message) {
    console.log(message);
});
// BASE SETUP
// =============================================================================
// call the packages we need
const express_1 = __importStar(require("express")); // call express
var app = express_1.default(); // define our app using express
const body_parser_1 = require("body-parser");
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
var port = process.env.PORT || 3000; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express_1.Router(); // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.status(200).json({ message: "LunchKeeper API 0.0.1" });
});
router.get('/zomato/search/:city', cache.route(), ZomatoController_1.doSearch);
router.get('/zomato/:id', cache.route(), ZomatoController_1.getRestaurantDetail);
router.get('/zomato/:id/dailymenu', cache.route(), ZomatoController_1.getDailyMenu);
router.get('/custom/all', CustomController_1.getAll);
router.get('/custom/:name', CustomController_1.scrape);
router.get('/ping/db', UtilityRepository_1.pingDb);
db.init();
redis.init();
//ScraperContainer.registerModule(BasicScrapers);
// more routes for our API will happen here
// REGISTER OUR ROUTES -----------
// all of our routes will be prefixed with /api
app.use('/api', router);
// app.use(function(req, res){
//     console.error("NOT FOUND!");
//     res.status(404).json({message: "Page not found."});
// });
// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
//# sourceMappingURL=server.js.map