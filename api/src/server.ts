// server.js
import { doSearch, getDailyMenu, getRestaurantDetail } from './controllers/ZomatoController'
import { getAll, createRandom } from './controllers/CustomController'
import { pingDb } from './controllers/UtilityRepository'
import * as db from './db'
import {IScraper} from './scrapers/common'

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
    res.status(200).json({ message: "This is LunchKeeper API" });
});

router.get('/zomato/search/:city', doSearch);
router.get('/zomato/:id', getRestaurantDetail);
router.get('/zomato/:id/dailymenu', getDailyMenu);
router.get('/custom/all', getAll);
router.get('/custom/random', createRandom);
router.get('/ping/db', pingDb);

db.init();



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