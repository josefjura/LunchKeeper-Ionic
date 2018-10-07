"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
exports.pingDb = (req, res, next) => {
    mongoose_1.connection.db.admin().ping().then((res2) => { res.status(200).send(res2); }, (err) => { res.status(500).send(err); });
};
//# sourceMappingURL=UtilityRepository.js.map