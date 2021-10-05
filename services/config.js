"use strict";

require("dotenv").config();

module.exports = {
    mPlatformDomain: "https://graph.facebook.com/v7.0/me/messages",
    pageId: process.env.PAGE_ID,
    appID: process.env.APP_ID,
    pageAccessToken: process.env.PAGE_ACCESS_TOKEN,
    appSecret: process.env.APP_SECRET,
    verifyToken: process.env.VERIFY_TOKEN,
    appUrl: process.env.APP_URL,
    personSalesId: process.env.SALES_ID,

    get mPlatform(){
        return this.mPlatformDomain;
    },

    get webhookUrl(){
        return this.appUrl + "/webhook";
    },

    get whitelistedDomains(){
        return [this.appUrl];
    },
};