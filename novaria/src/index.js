"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("../config");
const app_1 = require("./app");
function onsuccessfullstart() {
    console.log('====================================');
    console.log('Bot started Successfully');
    console.log('====================================');
}
(0, app_1.botStart)(onsuccessfullstart);
const mongoconnection = () => {
    const mongodbURI = config_1.config.MONGO_URL;
    mongoose_1.default
        .connect(mongodbURI)
        .then(() => {
        console.log('====================================');
        console.log('Connected to MongoDB');
        console.log('====================================');
    })
        .catch((error) => {
        console.log('====================================');
        console.log('Error connecting to MongoDB:', error);
        console.log('====================================');
        setTimeout(mongoconnection, 5000);
    });
};
mongoconnection();
//# sourceMappingURL=index.js.map