// server.js

import * as db from './db'
import * as redis from './redis'
import * as routes from './routes'


console.log(`Starting LunchKeeper API (${process.env.NODE_ENV})`);

// BASE SETUP
// =============================================================================

// call the packages we need
import express from 'express';        // call express
var app = express();                 // define our app using express
import { urlencoded, json } from 'body-parser';
import cors from 'cors'

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
    res.setHeader("Access-Control-Allow-Origin", "https://lunchkeeper-web.herokuapp.com");
    res.setHeader('Access-Control-Allow-Methods', '*');
    res.setHeader("Access-Control-Allow-Headers", "*");
    next();
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(urlencoded({ extended: true }));
app.use(json());




var port = process.env.PORT || 3000        // set our port

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