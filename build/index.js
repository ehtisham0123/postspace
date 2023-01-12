"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./middleware/config");
const components_1 = require("./components");
const app = (0, express_1.default)();
(async () => {
    await (0, config_1.config)(app);
    (0, components_1.registerComponents)(app);
})();
const server = app.listen(process.env.PORT || 8081, function () {
    // const port = server.address().port
    console.log("App started at port:", process.env.PORT || 8081);
});
exports.default = app;
