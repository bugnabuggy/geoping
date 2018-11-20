"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getDataFromResponse(response) {
    if (response.hasOwnProperty('data')) {
        const data = response.data;
        if (data.hasOwnProperty('data')) {
            return data.data;
        }
        else {
            return data;
        }
    }
    else {
        return response;
    }
}
exports.getDataFromResponse = getDataFromResponse;
