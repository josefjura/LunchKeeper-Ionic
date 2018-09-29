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
const SearchController_1 = require("./controllers/SearchController");
const RestaurantController_1 = require("./controllers/RestaurantController");
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
var port = process.env.PORT || 8080; // set our port
// ROUTES FOR OUR API
// =============================================================================
var router = express_1.Router(); // get an instance of the express Router
// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.status(200).json({ message: "This is LunchKeeper API" });
});
router.get('/search/:city', SearchController_1.doSearch);
router.get('/restaurant/:id', RestaurantController_1.getRestaurantDetail);
router.get('/restaurant/:id/dailymenu', RestaurantController_1.getDailyMenu);
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