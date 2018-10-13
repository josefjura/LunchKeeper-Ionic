"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MONGO_DB_URI = process.env.MONGODB_URI || "mongodb://mongo:27017";
function init() {
    console.log("Initializing MONGO DB on " + MONGO_DB_URI);
    mongoose_1.connect(MONGO_DB_URI, (err) => {
        console.log("Connected");
        if (err)
            console.log(err);
        else
            mongoose_1.connection.db.admin().ping().then((res) => { console.log(res); }, (err) => { console.error(err); });
    });
}
exports.init = init;
function destroy() {
    console.log("Disconnecting MONGO DB");
    mongoose_1.connection.close().then(() => {
        console.log("Connection closed");
        mongoose_1.disconnect().then((res) => { console.log(res); }, (err) => { console.error(err); });
    });
}
exports.destroy = destroy;
//# sourceMappingURL=db.js.map