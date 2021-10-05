
"use strict";

const i18n = require("../i18nconfig");
const config = require('./config');


module.exports = class Response {
  	static genQuickReply(text, quickReplies) {
		let response = {
			text: text,
			quick_replies: []
		};
		
		for (let quickReply of quickReplies) {
			response["quick_replies"].push({
				content_type: "text",
				title: quickReply["title"],
				payload: quickReply["payload"]
			});
		}
		return response;
  	}


    static genGenericTemplate(image_url, title, subtitle, buttons) {
      	let response = {
			attachment: {
			type: "template",
			payload: {
				template_type: "generic",
				elements: [
				{
					title: title,
					subtitle: subtitle,
					image_url: image_url,
					buttons: buttons
				}
				]
			}
			}
      	};  
      	return response;
    }


    static genImageTemplate(image_url, title, subtitle = "") {
        let response = {
			attachment: {
				type: "template",
				payload: {
				template_type: "generic",
				elements: [
					{
					title: title,
					subtitle: subtitle,
					image_url: image_url
					}
				]
				}
			}
        };
        return response;
	}
	
    static genButtonTemplate(title, buttons) {
        let response = {
			attachment: {
				type: "template",
				payload: {
				template_type: "button",
				text: title,
				buttons: buttons
				}
			}
        };
        return response;
	}
	
    static genText(text) {
		let response = {
			text: text
		};
      	return response;
	}
	
    static genTextWithPersona(text, persona_id) {
        let response = {
			text: text,
			persona_id: persona_id
        };
        return response;
    }
    
	static genPostbackButton(title, payload) {
		let response = {
			type: "postback",
			title: title,
			payload: payload
		};
		return response;
	}

  	static genWebUrlButton(title, url) {
		let response = {
			type: "web_url",
			title: title,
			url: url,
			messenger_extensions: true
		};
		return response;
  	}
  
	static genNuxMessage(user) {
		let bienvenida = this.genText(
			i18n.__(
				"empezar.bienvenida", 	
				{user_first_name: user.firstName}
			)
		);

		let guia = this.genText(i18n.__("empezar.ayuda"));
		
		let menu = this.genQuickReply(i18n.__("empezar.guia"), [
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
			}
		]);
		return [bienvenida, guia, menu];
	}

	static genReceipt(user){
		let response = {
			recipient:{
				id: user
			},
			message: {
				attachment:{
					type: "template",
					payload: {
					  template_type: "receipt",
					  recipient_name: "Alex Castillo",
					  order_number: "12345",
					  currency: "USD",
					  payment_method: "Efectivo",
					  order_url: "https://nettplus.net/",
					  timestamp: "123123123",
					  address:{
						street_1: "Av. Reinaldo Espinoza",
						street_2: "Teodoro Wolf",
						city: "Ecuador",
						postal_code: "110111",
						state: "Loja",
						country: "Loja",
					  },
					  summary: {
						subtotal: 12.00,
						shipping_cost: 2.00,
						total_tax: 1.00,
						total_cost: 15.00
					  },
					  adjustments:[
						{
						  name: "Descuento frecuente",
						  amount: 1.00
						}
					  ],
					  elements: [
						{
						  title: "Plan de Internet Ideal",
						  subtitle: "12Mb/s",
						  quantity: 1,
						  price: 10,
						  currency: "USD",
						  image_url: "https://nettplus.net/img/mgs_img/12mb.png"
						}
					  ]
					}
				}
			}
		};
		return response;
	}

	

};