"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MONGO_DB_URI = process.env.MONGODB_URI;
function init() {
    console.log("Initializing MONGO DB on " + MONGO_DB_URI);
    mongoose_1.connect(MONGO_DB_URI, (err) => {
        if (err)
            console.log(err);
        else
            console.log("MONGO DB Initialized.");
    });
}
exports.init = init;
function destroy() {
    console.log("Disconnecting MONGO DB");
    mongoose_1.connection.close().then(() => {
        mongoose_1.disconnect().then((res) => { console.log("MONGO DB connection closed."); }, (err) => { console.error(err); });
    });
}
exports.destroy = destroy;
//# sourceMappingURL=db.js.map