// server.js
import { doSearch } from './controllers/SearchController'
import { getDailyMenu, getRestaurantDetail } from './controllers/RestaurantController'

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

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', (req, res) => {
    res.status(200).json({ message: "This is LunchKeeper API" });
});

router.get('/search/:city', doSearch);
router.get('/restaurant/:id', getRestaurantDetail);
router.get('/restaurant/:id/dailymenu', getDailyMenu);


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