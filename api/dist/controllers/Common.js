"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function proxyCall(res, next, transform = null) {
    return (error, res2, body) => {
        if (error)
            res.status(500).json(error);
        res.status(res2.statusCode)
            .header('Content-Type', 'application/json')
            .send(transform ? transform(body) : body);
        return next(error);
    };
}
exports.proxyCall = proxyCall;
//# sourceMappingURL=Common.js.map