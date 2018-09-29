"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var transformation = (req, res, next) => {
    res.status(200).json({
        q: req.query.searchQuery
    });
    next();
};
exports.default = transformation;
//# sourceMappingURL=SearchTransformations.js.map