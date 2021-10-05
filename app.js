'use strict';

const express = require('express');
const config = require('./services/config');
const path = require('path');
const bodyParser = require('body-parser');
const Receive = require("./services/receive");

const app = express();

app.set('port', 5000);
app.use(bodyParser.json());
app.use(express.static('public'));
//app.use(express.static(path.join(path.resolve(), "public")));

app.get('/', (req, res) =>{
  res.send('Hola mundo');
});


app.get('/webhook', (req, res) =>{
  if (req.query['hub.verify_token'] === config.verifyToken){
    res.send(req.query['hub.challenge']);
  } else{
    res.send('No tienes permisos');
  }
});

app.post('/webhook', (req, res) =>{
  
  const webhook_event = req.body.entry[0];

  if(webhook_event.messaging) {
    webhook_event.messaging.forEach(event => {
      let receive = new Receive(event.sender.id, event);
      console.log(event.sender.id.firstName);
      
      receive.handleEvent();
    });
  }
  res.sendStatus(200);
});

app.listen(app.get('port'), () => console.log('Ok', app.get('port'))) 
