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
        it('just call it', async () => {

            const restaurant = {
                id: "16774318",
                name: "Otto Enoteca & Pizzeria",
                thumb: "https://b.zmtcdn.com/data/pictures/chains/8/16774318/a54deb9e4dbb79dd7c8091b30c642077_featured_thumb.png",
                url: "https://www.zomato.com/new-york-city/otto-enoteca-pizzeria-greenwich-village"
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
        it('just call it', async () => {

            const restaurant = {
                id: "16774318",
                name: "Otto Enoteca & Pizzeria",
                thumb: "https://b.zmtcdn.com/data/pictures/chains/8/16774318/a54deb9e4dbb79dd7c8091b30c642077_featured_thumb.png",
                url: "https://www.zomato.com/new-york-city/otto-enoteca-pizzeria-greenwich-village"
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
        it('just call it', async () => {

            const section = {
                name: "Vinohradský pivovar"
            };
            const dish = {
                name: "Tatarák ze sumce s toustem",
                price: "149 Kč"
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
            expect(result.sections.length).to.eq(1);
            var section1 = result.sections[0];
            expect(section1.name).to.eq(section.name);
            expect(section1.dishes).not.to.be.null;
            expect(section1.dishes.length).to.eq(1);
            var dish1 = section1.dishes[0];
            expect(dish1).not.to.be.null;
            expect(dish1.name).to.be.eq(dish.name);
            expect(dish1.price).to.be.eq(dish.price);
        })
    })
})