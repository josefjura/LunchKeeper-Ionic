"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function handleRequest(res, functionCall) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let result = yield functionCall();
            if (result) {
                res.status(200).send(result);
            }
            else {
                res.status(404).send();
            }
        }
        catch (err) {
            res.status(500).send(err);
        }
    });
}
exports.handleRequest = handleRequest;
//# sourceMappingURL=Helpers.js.map