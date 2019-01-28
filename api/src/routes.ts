import { Router } from 'express';        // call express
import * as zomato from './controllers/ZomatoController'
import * as custom from './controllers/CustomController'
import * as lunch from './controllers/LunchController'
import { pingDb } from './controllers/UtilityRepository'
import * as redis from './redis'
var pj = require('../package.json');
const redisUrlParse = require('redis-url-parse');

var redisConfig = redisUrlParse(redis.REDIS_URL);


export function init(): Router {
    var router = Router();              // get an instance of the express Router

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
    router.get('/ping/db', pingDb);

    return router;
}