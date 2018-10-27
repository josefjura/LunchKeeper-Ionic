// server.js
import * as zomato from './controllers/ZomatoController'
import * as custom from './controllers/CustomController'
import { pingDb } from './controllers/UtilityRepository'
import * as db from './db'
import * as redis from './redis'
const redisUrlParse = require('redis-url-parse');
import {ZOMATO_API_KEY} from './zomato'

console.log(`Starting LunchKeeper API (${process.env.NODE_ENV})`);

var redisConfig = redisUrlParse(redis.REDIS_URL);
//{host: 'example.com', port: 39143, database: '0', password: 'hunter2'}
console.log(redisConfig);
var cache = require('express-redis-cache')({
    host: redisConfig.host, port: redisConfig.port, auth_pass: redisConfig.password, expire: 3600
})
cache.on('message', function (message) {
    console.log(message);
});

// BASE SETUP
// =============================================================================

// call the packages we need
import express, { Router } from 'express';        // call express
var app = express();                 // define our app using express
import { urlencoded, json } from 'body-parser';

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(urlencoded({ extended: true }));
app.use(json());

var port = process.env.PORT || 3000        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.status(200).json({ message: "LunchKeeper API 0.0.1" });
});

router.get('/zomato/search/:city', cache.route(), zomato.doSearch);
router.get('/zomato/:id', cache.route(), zomato.getRestaurantDetail);
router.get('/zomato/:id/dailymenu', cache.route(), zomato.getDailyMenu);
router.get('/custom/all', custom.getAll);
router.get('/custom/:name', custom.scrape);
router.get('/ping/db', pingDb);


db.init();
redis.init();
console.log(ZOMATO_API_KEY)

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