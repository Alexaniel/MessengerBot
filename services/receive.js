
"use strict";

const Response = require("./response");
const GraphAPI = require("./graph-api");
const i18n = require("../i18nconfig");
const Ventas = require("./ventas");
const Pagos = require("./pagos");
const Soporte = require("./soporte");

let senderId, event;

module.exports = class Receive {

  constructor (user, webhookEvent){
    senderId = user;
    event = webhookEvent;
    
  }

  handleEvent() {
    let responses;

    try {
      if(event.message) {
        let message = event.message;

        if(message.quick_reply) {

          responses = this.handleQuickReply(message.quick_reply);

        } else if(message.text){
          
          responses = this.handleTextMessage(message.text);

        } else if(message.attachments) {
          
          responses = this.handleAttachmentMessage(message.attachments);

        }
      } else if(event.postback) {
        
        responses = this.handlePostback(event.postback);

      } else if(event.referral) {
        
        responses = this.handleReferral(event.referral);

      }
    } catch (error) {
      console.log("Error:" + error);
    }

    if(Array.isArray(responses)){
      let delay = 0;
      for(let response of responses){
        this.sendMessage(response, (delay * 1500));
        delay++;
      }
    }else{
      this.sendMessage(responses);
    }
  } 

  handleTextMessage(messageText) {
    let message = messageText.trim().toLowerCase();
    let response;
    if(message.includes("hola")){

      response = Response.genNuxMessage(senderId);

    } else if( this.getPeticionVenta(messageText) === true){
      
      this.handlePayload("VENTAS_PAYLOAD");

    } else if( this.getPeticionPago(messageText) === true){
      
      this.handlePayload("PAGOS_PAYLOAD");

    } else if( this.getPeticionSoporte(messageText) === true){
      
      this.handlePayload("SOPORTE_PAYLOAD");

    } else {
      response = [
        Response.genText(
          i18n.__("fallback.any", { message: messageText })
        ),
        Response.genQuickReply(i18n.__("empezar.guia"), [
          {
            title: i18n.__("menu.ventas"),
            payload: "VENTAS_PAYLOAD"
          },
          {
            title: i18n.__("menu.pagos"),
            payload: "PAGOS_PAYLOAD"
          },
          {
            title: i18n.__("menu.soporte"),
            payload: "SOPORTE_PAYLOAD"
          },
          { 
            title: i18n.__("menu.agente"),
            payload: "SOLICITAR_AGENTE_PAYLOAD"
          },
        ])
      ]; 
    } 
    return response;
  }

  handleAttachmentMessage(messageAttachment){

    let response;
    let attachment = messageAttachment[0];
    
    if(attachment.type === "image"){
      response = Response.genQuickReply(i18n.__("pagos.attachment"), [
        {
          title: "Nueva Conversación",
          payload: "EMPEZAR"
        }
      ]);
    } else{
      response = Response.genText(i18n.__("pagos.no_attachment"));
    }

    return response;
  }
  
  handlePostback(eventPostback){
    
    let postback = eventPostback;
    let payload;

    if(postback.referral && postback.referral.type === "ABRIR_HILO"){
      payload = postback.referral.ref;
    } else{
      payload = postback.payload;
    }

    return this.handlePayload(payload.toUpperCase());
  }

  handleReferral(eventReferral){
    
    let payload = eventReferral.ref.toUpperCase();
    
    return this.handlePayload(payload);

  }

  handleQuickReply(messageQuick) {

    let payload = messageQuick.payload;
    console.log(payload);

    return this.handlePayload(payload);

  }

  handlePayload(payload) {
    let response;
    let ventas = new Ventas(senderId, event);
    let pagos = new Pagos(senderId, event);
    let soporte = new Soporte(senderId, event);
    
    if(payload === "EMPEZAR"){
      
      response = Response.genNuxMessage(senderId);

    } else if(payload === "VENTAS_PAYLOAD"){
      response = ventas.menuVentas();
    } else if(payload === "VER_PLANES_PAYLOAD"){
      response = ventas.showPlanes();
    } else if(payload.includes("DETALLAR_")){

      response = ventas.detallarPlan(payload);

    } else if(payload.includes("CONTRATAR_")){

      response = ventas.contratarPlan(payload);

    } else if(payload.includes("_MTD")){

      response = ventas.defMetodoPago(payload);



    } 
    
    
    
    else if(payload === "PAGOS_PAYLOAD"){

      response = pagos.handlePayload(payload);

    } else if(payload === "SOPORTE_PAYLOAD"){
      
      response = soporte.handlePayload(payload);

    } else {
      response = {text: "Este es un mensaje por defecto"};
    }

    return response;
  }

  sendMessage(response, delay = 0) {    
    
    let messageData = {
      recipient: {
        id: senderId
      },
      message: response
    };

    setTimeout(() => GraphAPI.callSendAPI(messageData), delay); 
  }

  getPeticionVenta(message){
    let res = false;

    for(let i in i18n.__("v")){
      if(message === i18n.__("v."+i)){
        res = true;
      }
    }

    return res;
  }

  getPeticionPago(message){
    let res = false;

    for(let i in i18n.__("p")){
      if(message === i18n.__("p."+i)){
        res = true;
      }
    }

    return res;
  }

  getPeticionSoporte(message){
    let res = false;

    for(let i in i18n.__("s")){
      if(message === i18n.__("s."+i)){
        res = true;
      }
    }

    return res;
  }
};