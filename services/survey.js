"use strict";

const 
    Response = require("./response"),
    i18n = require("../i18nconfig");

module.exports = class Survey {
    static genAgentRating(agent){
        let response = Response.genQuickReply(
            i18n.__("encuesta.pregunta", {
                agenntFisrtName: agent
            }),
            [
                {
                    title: "\uD83D\uDE00",
                    payload: "SERVICIO_BUENO"
                  },
                  {
                    title: "\uD83D\uDE42",
                    payload: "SERVICIO_REGULAR"
                  },
                  {
                    title: "\uD83D\uDE41",
                    payload: "SERVICIO_MALO"
                  }
            ]
        );

        response.delay = "4000";

        return response;
    }

    static handlePayLoad(payload){
        let response;

        switch (payload){
            case "SERVICIO_BUENO":
                response = Response.genText(i18n.__("encuesta.buena"));
                break;
            case "SERVICIO_REGULAR":
                response = Response.genText(i18n.__("encuesta.regular"));
                break;
            case "SERVICIO_MALO":
                response = Response.genText(i18n.__("encuesta.mala"), [
                    {
                        title: i18n.__("menu.ayuda"),
                        payload: "AYUDA"
                    }
                ]);
                break;
            case "SUGERENCIA":
                response = Response.genText(i18n.__("encuesta.sugerencia"));
                break;
        }
        return response;
    }
};