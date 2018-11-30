"use strict";
// server.js
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = __importStar(require("./db"));
const redis = __importStar(require("./redis"));
const routes = __importStar(require("./routes"));
console.log(`Starting LunchKeeper API (${process.env.NODE_ENV})`);
// BASE SETUP
// =============================================================================
// call the packages we need
const express_1 = __importDefault(require("express")); // call express
var app = express_1.default(); // define our app using express
const body_parser_1 = require("body-parser");
// const whitelist = ["https://lunchkeeper-web.herokuapp.com/", "http://localhost:8080"];
// var options = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1) {
//       callback(null, true)
//     } else {
//       callback(new Error('Not allowed by CORS'))
//     }
//   }
// }
// app.use(cors(options));
// console.log(`CORS setup with: ${options.origin}`);
app.use(function (req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", '*');
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(body_parser_1.urlencoded({ extended: true }));
app.use(body_parser_1.json());
var port = process.env.PORT || 3000; // set our port
// ROUTES FOR OUR API
// =============================================================================
db.init();
redis.init();
let router = routes.init();
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
console.log('LunchKeeper API started on port: ' + port);
//# sourceMappingURL=server.js.map