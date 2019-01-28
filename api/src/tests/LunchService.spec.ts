import { assert, expect } from 'chai'
import { search, dailyMenu, details } from '../services/LunchService'
import { SEARCH_RESULT_TYPE } from '../models/DTO'
import sinon from 'sinon';
import * as customService from '../services/CustomService';
import * as zomatoService from '../services/ZomatoService';

var sandbox = sinon.createSandbox();

describe('Lunch service', () => {
    afterEach(function () {
        // import and pass your custom axios instance to this method
        sandbox.restore();
    })

    describe('search', () => {
        it('positive', async () => {
            sandbox.stub(customService, "search").returns([{
                id: "", name: "", source: SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
            }]);
            sandbox.stub(zomatoService, "search").resolves({
                restaurants: [{
                    id: "", name: "", source: SEARCH_RESULT_TYPE.Zomato, thumb: "", url: ""
                }]
            });

            const result = await search("test");
            expect(result).to.not.be.null;
            expect(result.restaurants).to.not.be.null;
            expect(result.restaurants.length).to.eq(2);
        })
        it('zomato result empty', async () => {
            sandbox.stub(customService, "search").returns([{
                id: "", name: "", source: SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
            }]);
            sandbox.stub(zomatoService, "search").resolves({ restaurants: [] });

            const result = await search("test");
            expect(result).to.not.be.null;
            expect(result.restaurants).to.not.be.null;
            expect(result.restaurants.length).to.eq(1);
        })
    })

    describe('dailyMenu', () => {
        it('positive', async () => {

            sandbox.stub(customService, "scrape").resolves({
                thumb : '', name : 'test',
                sections: [
                    {
                        name: "CUSTOM", dishes: [
                            { name: "", price: "" }
                        ]
                    }
                ]
            });
            sandbox.stub(zomatoService, "getDailyMenu").resolves({
                thumb : '', name : 'test',
                sections: [
                    {
                        name: "ZOMATO", dishes: [
                            { name: "", price: "" }
                        ]
                    }
                ]
            });

            const result = await dailyMenu(SEARCH_RESULT_TYPE.Custom, 16774318);

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            expect(result.sections.length).to.eq(1);
            expect(result.sections[0].name).to.eq("CUSTOM");

            const result2 = await dailyMenu(SEARCH_RESULT_TYPE.Zomato, 16774318);

            expect(result2).not.to.be.null;
            expect(result2).not.to.be.undefined;
            expect(result2.sections.length).to.eq(1);
            expect(result2.sections[0].name).to.eq("ZOMATO");

        })
        it('zomato null', async () => {

            sandbox.stub(customService, "scrape").resolves({
                thumb : '', name : 'test',
                sections: [
                    {
                        name: "CUSTOM", dishes: [
                            { name: "", price: "" }
                        ]
                    }
                ]
            });

            sandbox.stub(zomatoService, "getDailyMenu").resolves(null);

            const result2 = await dailyMenu(SEARCH_RESULT_TYPE.Zomato, 16774318);

            expect(result2).to.be.null;
        })
    })

    describe('details', () => {
        it('positive', async () => {

            sandbox.stub(customService, "getDetails").returns({
                id: "", name: "", source: SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
            });
            sandbox.stub(zomatoService, "getRestaurantDetail").resolves({
                id: "", name: "", source: SEARCH_RESULT_TYPE.Zomato, thumb: "", url: ""
            });

            const result = await details(SEARCH_RESULT_TYPE.Custom, 16774318);

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            expect(result.source).to.eq(SEARCH_RESULT_TYPE.Custom);

            const result2 = await details(SEARCH_RESULT_TYPE.Zomato, 16774318);

            expect(result2).not.to.be.null;
            expect(result2).not.to.be.undefined;
            expect(result2.source).to.eq(SEARCH_RESULT_TYPE.Zomato);

        })
        it('zomato null', async () => {

            sandbox.stub(customService, "getDetails").returns({
                id: "", name: "", source: SEARCH_RESULT_TYPE.Custom, thumb: "", url: ""
            });
            sandbox.stub(zomatoService, "getRestaurantDetail").resolves(null);

            const result = await details(SEARCH_RESULT_TYPE.Custom, 16774318);

            expect(result).not.to.be.null;
            expect(result).not.to.be.undefined;
            expect(result.source).to.eq(SEARCH_RESULT_TYPE.Custom);

            const result2 = await details(SEARCH_RESULT_TYPE.Zomato, 16774318);

            expect(result2).to.be.null;
        })
    })
})