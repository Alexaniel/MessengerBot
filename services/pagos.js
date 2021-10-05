'use strict'

const Response = require("./response");
const GraphAPI = require("./graph-api");
const i18n = require("../i18nconfig");

let senderId, event
module.exports = class Pagos {
    constructor (user, webhookEvent){
        senderId = user,
        event = webhookEvent

        console.log(senderId, event);
    }

    handlePayload(payload){
        console.log("payload",payload);

    }


};