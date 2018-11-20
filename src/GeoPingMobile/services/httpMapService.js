"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpService_1 = __importDefault(require("./httpService"));
function getLocationAddress(lat, lng) {
    const communicator = new httpService_1.default();
    const latLong = lat + ',' + lng;
    return communicator.get('https://maps.googleapis.com/maps/api/geocode/json' +
        `?latlng=${latLong}&key=${process.env.REACT_APP_GOOGLE_API_KEY}`);
}
exports.getLocationAddress = getLocationAddress;
