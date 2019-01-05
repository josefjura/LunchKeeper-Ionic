import moxios from 'moxios'
import { assert, expect } from 'chai'
import { search, getRestaurantDetail, getDailyMenu } from '../services/ZomatoService'
import { searchResponse, restaurantResponse, dailyMenuResponse } from './ZomatoResponses'

describe('Zomato service', () => {
    describe('search', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        })

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        })
        it('positive', async () => {

            const restaurant = {
                id: "16507310",
                name: "Anděl Plzeňský Restaurant",
                thumb: "https://b.zmtcdn.com/data/res_imagery/16507310_RESTAURANT_2acc7e10158c13c576675990eb90fadc.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A",
                url: "https://www.zomato.com/praha/anděl-plzeňský-restaurant-smíchov-praha-5?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
            };

            moxios.wait(function () {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: searchResponse
                })
            })

            const result = await search("test", '84');

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            //expect(result.length).to.eq(1);
            const result1 = result.restaurants[0];
            expect(result1.id).to.eq(restaurant.id);
            expect(result1.name).to.eq(restaurant.name);
            expect(result1.source).to.eq(0);
            expect(result1.thumb).to.eq(restaurant.thumb);
            expect(result1.url).to.eq(restaurant.url);
        })
        it('400', async () => {
            moxios.wait(function () {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400,
                    response: {
                        "code": 400,
                        "status": "Bad Request",
                        "message": "No Daily Menu Available"
                    }
                })
            })

            const result = await search("test","84");

            expect(result).to.not.be.null;            
            expect(result.restaurants).to.not.be.null;
            expect(result.restaurants.length).to.eq(0);
        })
    })
    describe('getRestaurantDetail', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        })

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        })
        it('positive', async () => {

            const restaurant = {
                id: "16507624",
                name: "Vinohradský pivovar",
                url: "https://www.zomato.com/praha/vinohradský-pivovar-vinohrady-praha-10?utm_source=api_basic_user&utm_medium=api&utm_campaign=v2.1",
                thumb: "https://b.zmtcdn.com/data/res_imagery/16507624_RESTAURANT_08db723b05fde859573093f042446e00.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A"
            };

            moxios.wait(function () {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: restaurantResponse
                })
            })

            const result = await getRestaurantDetail(16774318);

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            //expect(result.length).to.eq(1);
            expect(result.id).to.eq(restaurant.id);
            expect(result.name).to.eq(restaurant.name);
            expect(result.source).to.eq(0);
            expect(result.thumb).to.eq(restaurant.thumb);
            expect(result.url).to.eq(restaurant.url);
        })
        it('400', async () => {
            moxios.wait(function () {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400,
                    response: {
                        "code": 400,
                        "status": "Bad Request",
                        "message": "No Daily Menu Available"
                    }
                })
            })

            const result = await getRestaurantDetail(16774318);

            expect(result).to.be.null;            
        })
    })
    describe('getDailyMenu', () => {
        beforeEach(function () {
            // import and pass your custom axios instance to this method
            moxios.install()
        })

        afterEach(function () {
            // import and pass your custom axios instance to this method
            moxios.uninstall()
        })
        it('positive', async () => {

            const section = {
                name: "Polévky"
            };
            const dish = {
                name: "Bramboračka s hříbky",
                price: "45 Kč"
            };

            moxios.wait(function () {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 200,
                    response: dailyMenuResponse
                })
            })

            const result = await getDailyMenu(16774318);

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            //expect(result.length).to.eq(1);
            expect(result.sections).not.to.be.null;
            expect(result.sections.length).to.eq(5);
            var section1 = result.sections[0];
            expect(section1.name).to.eq(section.name);
            expect(section1.dishes).not.to.be.null;
            expect(section1.dishes.length).to.eq(1);
            var dish1 = section1.dishes[0];
            expect(dish1).not.to.be.null;
            expect(dish1.name).to.be.eq(dish.name);
            expect(dish1.price).to.be.eq(dish.price);
        })
        it('400', async () => {
            moxios.wait(function () {
                const request = moxios.requests.mostRecent()
                request.respondWith({
                    status: 400,
                    response: {
                        "code": 400,
                        "status": "Bad Request",
                        "message": "No Daily Menu Available"
                    }
                })
            })

            const result = await getDailyMenu(16774318);

            expect(result).to.be.null;            
        })
    })
})