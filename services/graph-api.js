
 "use strict";

const request = require("request");
const config = require("./config");
const camelCase = require("camelcase");

module.exports = class GraphAPi {
  static callSendAPI(messageData) {
    request(
      {
        uri: config.mPlatformDomain,
        qs: { access_token: config.pageAccessToken },
        method: "POST",
        json: messageData
      },
      error => {
        if (error) {
          console.error("No se pudo enviar el mensaje:", error);
        }
      }
    );
  }

  static async getUserProfile(senderId) {
    try {
      const userProfile = await this.callUserProfileAPI(senderId);

      for (const key in userProfile) {
        const camelizedKey = camelCase(key);
        const value = userProfile[key];
        delete userProfile[key];
        userProfile[camelizedKey] = value;
      }

      return userProfile;
    } catch (err) {
      console.log("Fetch failed:", err);
    }
  }

};
