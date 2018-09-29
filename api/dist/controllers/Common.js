"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleCall(res, next) {
    return (error, res2, body) => {
        if (error)
            res.status(500).json(error);
        res.status(res2.statusCode)
            .header('Content-Type', 'application/json')
            .send(body);
        return next(error);
    };
}
exports.handleCall = handleCall;
//# sourceMappingURL=Common.js.map