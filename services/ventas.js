
'use strict'

const Response = require("./response");
const GraphAPI = require("./graph-api");
const i18n = require("../i18nconfig");
const config = require('./config');
const request = require('request');

let senderId, event
module.exports = class Ventas {
    constructor (user, webhookEvent){
        senderId = user,
        event = webhookEvent
    }

    menuVentas(){

        let response;

        response = [
            Response.genText(i18n.__("ventas.saludo")),
			Response.genQuickReply(i18n.__("ventas.guia"), 
				[
					{
						title: i18n.__("ventas.menu.planes"),
						payload: "VER_PLANES_PAYLOAD"
					},
					{
						title: i18n.__("ventas.menu.contratar"),
						payload: "CONTRATAR_PAYLOAD"
					},
					{
						title: i18n.__("ventas.menu.agente"),
						payload: "SOLICITAR_AGENTE_PAYLOAD"
					}
				]
			)
          ];

        return response;
    }

    showPlanes(){
      	let response = {
		  	attachment: {
				type: "template",
				payload: {
					template_type: "generic",
					elements: [
					{
						title: i18n.__("ventas.planes.plan1.title"),
						subtitle: i18n.__("ventas.planes.plan1.subtitle"),
						image_url: i18n.__("ventas.planes.plan1.img"),
						buttons: [
						{
							type: "postback",
							title: i18n.__("ventas.planes.detalle"),
							payload: "DETALLAR_PLAN1"
						}
						]
					},
					{
						title: i18n.__("ventas.planes.plan2.title"),
						subtitle: i18n.__("ventas.planes.plan2.subtitle"),
						image_url: i18n.__("ventas.planes.plan2.img"),
						buttons: [
						{
							type: "postback",
							title: i18n.__("ventas.planes.detalle"),
							payload: "DETALLAR_PLAN2"
						}
						]
					},
					{
						title: i18n.__("ventas.planes.plan3.title"),
						subtitle: i18n.__("ventas.planes.plan3.subtitle"),
						image_url: i18n.__("ventas.planes.plan3.img"),
						buttons: [
						{
							type: "postback",
							title: i18n.__("ventas.planes.detalle"),
							payload: "DETALLAR_PLAN3"
						}
						]
					},
					{
						title: i18n.__("ventas.planes.plan4.title"),
						subtitle: i18n.__("ventas.planes.plan4.subtitle"),
						image_url: i18n.__("ventas.planes.plan4.img"),
						buttons: [
						{
							type: "postback",
							title: i18n.__("ventas.planes.detalle"),
							payload: "DETALLAR_PLAN4"
						}
						]
					},
					{
						title: i18n.__("ventas.planes.plan5.title"),
						subtitle: i18n.__("ventas.planes.plan5.subtitle"),
						image_url: i18n.__("ventas.planes.plan5.img"),
						buttons: [
						{
							type: "postback",
							title: i18n.__("ventas.planes.detalle"),
							payload: "DETALLAR_PLAN5"
						}
						]
					}
					]
				}
        	}
        };  
      return response;
	}

	getPlanSeleccionado(payload){
		let plan;
		if(payload.includes("PLAN1")){
			plan = "PLAN1";
		} else if(payload.includes("PLAN2")){
			plan = "PLAN2";
		} else if(payload.includes("PLAN3")){
			plan = "PLAN3";
		} else if(payload.includes("PLAN4")){
			plan = "PLAN4";
		} else if(payload.includes("PLAN5")){
			plan = "PLAN5";
		}
		return plan; 
	}

	getMetodoSeleccionado(payload){
		let mtd_pago;
		if(payload.includes("MTD1")){
			mtd_pago = "MTD1";
		} else if(payload.includes("MTD2")){
			mtd_pago = "MTD2";
		} else if(payload.includes("MTD3")){
			mtd_pago = "MTD3";
		}
		return mtd_pago; 
	}

	genOpcionesContratar(payload){
		let plan = this.getPlanSeleccionado(payload), response;

		return response = Response.genQuickReply(
			i18n.__("ventas.planes.q_pregunta"), 
			[
				{
					title: "Sí",
					payload: "CONTRATAR_" + plan
				},
				{
					title: "Elegir Otro",
					payload: "VER_PLANES_PAYLOAD"
				},
				{
					title: "No, gracias.",
					payload: "NO_CONTRATAR"
				}
			]
	
		);
	}

	detallarPlan(payload){
		let response;
		if(payload === "DETALLAR_PLAN1") {

			let nombre = "Te presentamos el detalle de " + i18n.__("ventas.planes.plan1.title").trim().toUpperCase();

			let detalle = "Precio Normal: " + i18n.__("ventas.planes.plan1.precio") + ". ";
			detalle += "Además, aplica un " + i18n.__("ventas.planes.plan1.descuento");

			response = [
				Response.genText(nombre),
				Response.genText(detalle),
				this.genOpcionesContratar(payload)
			];

		}else if(payload === "DETALLAR_PLAN2"){
			
			let nombre = "Te presentamos el detalle de " + i18n.__("ventas.planes.plan2.title").trim().toUpperCase();

			let precio = "Precio Normal: " + i18n.__("ventas.planes.plan2.precio");

			let promo = "Precio Promocional: " + i18n.__("ventas.planes.plan2.promo");

			let descuento = "Además, aplica un " + i18n.__("ventas.planes.plan2.descuento");

			let condicion = i18n.__("ventas.planes.plan2.condiciones");

			response = [
				Response.genText(nombre),
				Response.genText(precio),
				Response.genText(promo),
				Response.genText(descuento),	
				Response.genText(condicion),
				this.genOpcionesContratar(payload)
			];

		}else if(payload === "DETALLAR_PLAN3"){

			let nombre = "Te presentamos el detalle de " + i18n.__("ventas.planes.plan3.title").trim().toUpperCase();

			let precio = "Precio Normal: " + i18n.__("ventas.planes.plan3.precio");

			let promo = "Precio Promocional: " + i18n.__("ventas.planes.plan3.promo");

			let descuento = "Además, aplica un " + i18n.__("ventas.planes.plan3.descuento");

			let condicion = i18n.__("ventas.planes.plan3.condiciones");

			response = [
				Response.genText(nombre),
				Response.genText(precio),
				Response.genText(promo),
				Response.genText(descuento),	
				Response.genText(condicion),
				this.genOpcionesContratar(payload)
			];

		}else if(payload === "DETALLAR_PLAN4"){

			let nombre = "Te presentamos el detalle de " + i18n.__("ventas.planes.plan4.title").trim().toUpperCase();

			let precio = "Precio Normal: " + i18n.__("ventas.planes.plan4.precio");

			let promo = "Precio Promocional: " + i18n.__("ventas.planes.plan4.promo");

			let descuento = "Además, aplica un " + i18n.__("ventas.planes.plan4.descuento");

			let condicion = i18n.__("ventas.planes.plan4.condiciones");

			response = [
				Response.genText(nombre),
				Response.genText(precio),
				Response.genText(promo),
				Response.genText(descuento),
				Response.genText(condicion),	
				this.genOpcionesContratar(payload)
			];

		}else if(payload === "DETALLAR_PLAN5"){

			let nombre = "Te presentamos el detalle de " + i18n.__("ventas.planes.plan5.title").trim().toUpperCase();

			let precio = "Precio Normal: " + i18n.__("ventas.planes.plan5.precio");

			let promo = "Precio Promocional: " + i18n.__("ventas.planes.plan5.promo");

			let descuento = "Además, aplica un " + i18n.__("ventas.planes.plan5.descuento");

			let condicion = i18n.__("ventas.planes.plan5.condiciones");

			response = [
				Response.genText(nombre),
				Response.genText(precio),
				Response.genText(promo),
				Response.genText(descuento),
				Response.genText(condicion),	
				this.genOpcionesContratar(payload)
			];


		}else {
			console.log("No ha seleccionado un plan");
		}
		return response;
	}

	genOpcionesMetodosPago(payload){
		let plan = this.getPlanSeleccionado(payload);

		let response = Response.genQuickReply(
			i18n.__("ventas.metodos.inicio"), 
			[
				{
					title: i18n.__("ventas.metodos.mtd1.nombre"),
					payload: plan + "_MTD1"
				},
				{
					title: i18n.__("ventas.metodos.mtd2.nombre"),
					payload: plan + "_MTD2"
				},
				{
					title: i18n.__("ventas.metodos.mtd3.nombre"),
					payload: plan + "_MTD3"
				}
			]
		);

		return response;

	}

	contratarPlan(payload){
		let response, advs, mensaje;
		
		if(payload === "CONTRATAR_PLAN1") {

			advs = i18n.__("ventas.contratar.advs");
			mensaje = i18n.__("ventas.contratar.mensaje") + " Plan Ideal";

			response = [
				Response.genText(advs),
				Response.genText(mensaje),
				this.genOpcionesMetodosPago(payload)
			];

		} else if(payload === "CONTRATAR_PLAN2"){

			advs = i18n.__("ventas.contratar.advs");
			mensaje = i18n.__("ventas.contratar.mensaje") + " Plan Ideal Plus";

			response = [
				Response.genText(advs),
				Response.genText(mensaje),
				this.genOpcionesMetodosPago(payload)
			];

		} else if(payload === "CONTRATAR_PLAN3"){

			advs = i18n.__("ventas.contratar.advs");
			mensaje = i18n.__("ventas.contratar.mensaje") + " Plan Premier";

			response = [
				Response.genText(advs),
				Response.genText(mensaje),
				this.genOpcionesMetodosPago(payload)
			];

		} else if(payload === "CONTRATAR_PLAN4"){

			advs = i18n.__("ventas.contratar.advs");
			mensaje = i18n.__("ventas.contratar.mensaje") + " Plan Premier Plus";

			response = [
				Response.genText(advs),
				Response.genText(mensaje),
				this.genOpcionesMetodosPago(payload)
			];
			
		} else if(payload === "CONTRATAR_PLAN5"){

			advs = i18n.__("ventas.contratar.advs");
			mensaje = i18n.__("ventas.contratar.mensaje") + " Plan Nitro";

			response = [
				Response.genText(advs),
				Response.genText(mensaje),
				this.genOpcionesMetodosPago(payload)
			];

		}

		return response;
	}

	genOpcionesConfirmacion(payload){
		let plan = this.getPlanSeleccionado(payload);
		let metodo = this.getMetodoSeleccionado(payload);
		
		let response = Response.genQuickReply(
			i18n.__("ventas.confirmacion.inicio"), 
			[
				{
					title: i18n.__("ventas.confirmacion.op.1"),
					payload: plan + metodo + "_CONFIRMAR"
				},
				{
					title: i18n.__("ventas.confirmacion.op.2"),
					payload: plan + metodo + "_NO_CONFIRMAR"
				},
				{
					title: i18n.__("ventas.confirmacion.op.3"),
					payload: plan + metodo + "_SALIR"
				}
			]
		);

		return response;
	}



	defMetodoPago(payload){
		
		let response;

		if(payload.includes("_MTD1")) {
			let inicio = i18n.__("ventas.metodos.mtd1.descripcion") + " a través de " + i18n.__("ventas.metodos.mtd1.op.1") + " o en " + i18n.__("ventas.metodos.mtd1.op.2") + " en cualquiera de estos bancos.";

			let bco = i18n.__("ventas.metodos.mtd1.banco.1") + "\n" + i18n.__("ventas.metodos.mtd1.banco.2") + "\n" + i18n.__("ventas.metodos.mtd1.banco.3") + "\n";
			
			response = [
				Response.genText(inicio),
				Response.genText(bco),
				this.genOpcionesConfirmacion(payload)
			];

		} else if(payload.includes("_MTD2")){
			
			let inicio = i18n.__("ventas.metodos.mtd2.descripcion") + i18n.__("ventas.metodos.mtd2.op.1") + " o " + i18n.__("ventas.metodos.mtd2.op.2") + ", las tarjetas pueden ser " + i18n.__("ventas.metodos.mtd2.tipo_tarjeta.1.nombre") + " o " + i18n.__("ventas.metodos.mtd2.tipo_tarjeta.2.nombre");

			response = [
				Response.genText(inicio),
				this.genOpcionesConfirmacion(payload)
			];
			
		} else if(payload.includes("_MTD3")){

			let inicio = i18n.__("ventas.metodos.mtd3.descripcion");

			let bco = i18n.__("ventas.metodos.mtd3.op.1.nombre") + " al número de " + i18n.__("ventas.metodos.mtd3.op.1.numero") + "\n";
			bco += i18n.__("ventas.metodos.mtd3.op.2.nombre") + " al número de " + i18n.__("ventas.metodos.mtd3.op.2.numero") + "\n";
			
			let datos = "Con los siguientes datos \n" + "\n" + "Nombre: " + i18n.__("ventas.metodos.mtd3.datos.nombre") + "\n" + "RUC: " + i18n.__("ventas.metodos.mtd3.datos.ruc") + "\n" + "Email: " + i18n.__("ventas.metodos.mtd3.datos.email") + "\n" + i18n.__("ventas.metodos.mtd3.datos.desc");
			
			response = [
				Response.genText(inicio),
				Response.genText(bco),
				Response.genText(datos),
				this.genOpcionesConfirmacion(payload)
			];
		}

		return response;
	}

	callSendApi(response){
		request(
		  {
			uri: config.mPlatformDomain,
			qs : { 
			  access_token: config.pageAccessToken
			},
			method: "POST",
			json: response
		  }, error => {
			if(error){
			  console.log("Error:", error);
			}else{
			  console.log("mensaje enviado");
			}
		  }
		);
	}
};


