import { IScraper } from './Common'
import { DailyMenu, Section, SEARCH_RESULT_TYPE } from '../models/DTO'
import pdf, { PDFDocumentProxy } from 'pdfjs-dist'

export class RedCafeScraper implements IScraper {
    url: string = "http://www.redcafeprague.cz/assets/menu.pdf";
    id: string = "redcafe";
    name: string = "Red Cafe Stodůlky";
    thumb: string = "http://www.redcafeprague.cz/images/logo_redcafe_white_final.png?crc=92028659";
    source: SEARCH_RESULT_TYPE = SEARCH_RESULT_TYPE.Custom;

    async scrape(input: string): Promise<DailyMenu> {
        //console.log("HIT");
        try {
            var toReturn: DailyMenu = {
                sections: []
            };
            var prom = await (<any>pdf).getDocument(this.url)
            //some.then((prom: PDFDocumentProxy) => {
            //console.log("HOT");
            var page = await prom.getPage(1)

            var anns = await page.getAnnotations();
            // for (var an in anns) {
            //     const item = anns[an];
            //     values[item.fieldName] = item.fieldValue;

            // }
            var values = [];
            var section: Section = {
                name: "",
                dishes: []
            };

            (<any>anns).forEach(element => {
                if (element.fieldName === 'datum') {
                    section.name = element.fieldValue;
                }
                else {
                    var skibedeedop = element.fieldName.split(' - ');
                    var food = skibedeedop[0] || "";
                    var type = skibedeedop[1] || "";
                    // console.log(`Setting ${food}.${type} to ${element.fieldValue}`);
                    // if (!values[food.toLowerCase()]) values[food.toLowerCase()] = {};
                    // values[food.toLowerCase()][type.toLowerCase()] = element.fieldValue;

                    values.push({ food: food.toLowerCase(), type: type.toLowerCase(), value: element.fieldValue });


                }
            });

            var test = values.reduce((acc, curr) => {
                var food = curr.food;
                delete curr.food;
                var newObj = {};
                newObj[curr.type] = curr.value;
                if (!acc[food]) acc[food] = {};
                Object.assign(acc[food], newObj);

                return acc;
            }, []);

            for (const key in test) {
                if (test.hasOwnProperty(key)) {
                    const el = test[key];
                    section.dishes.push({
                        name: el.cz,
                        price: el.cena
                    })
                }
            }

            toReturn.sections.push(section);
            console.log(toReturn.sections[0].dishes);
            //console.log(values);

            return toReturn;


            //})


            //console.log(some);
        } catch (err) {
            console.error(err);
        }
        return null;
    }


}