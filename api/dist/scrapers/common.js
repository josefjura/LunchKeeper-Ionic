"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IScraper;
(function (IScraper) {
    const implementations = [];
    function GetImplementations() {
        console.log("Getting");
        return implementations;
    }
    IScraper.GetImplementations = GetImplementations;
    function register(ctor) {
        console.log("Registering");
        implementations.push(ctor);
        return ctor;
    }
    IScraper.register = register;
})(IScraper = exports.IScraper || (exports.IScraper = {}));
//# sourceMappingURL=common.js.map