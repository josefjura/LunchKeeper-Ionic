import { Document, Schema, Model, model } from "mongoose";

export interface IScrape {
    name: string;
    url: string;
    path: string;
}

export interface IScrapeModel extends IScrape, Document {

}

export var ScrapeSchema: Schema = new Schema({
    name: String,
    url: String,
    path: String
});


export const Scrape: Model<IScrapeModel> = model<IScrapeModel>("Scrape", ScrapeSchema);