"use strict";

const express = require("express");
const http = require('http');
const socketio = require('socket.io');
const bodyParser = require('body-parser');
const cors = require('cors');

const socketEvents = require('./utils/socket'); 
const routes = require("./utils/routes"); 
const redisDB = require("./utils/database").connectDB();


class Server{

    constructor(){
        this.port =  process.env.PORT || 4000;
        this.host = "localhost";
        
        this.app = express();
        this.http = http.Server(this.app);
        this.socket = socketio(this.http);
    }

    appConfig(){        //set the application configuration 
        this.app.use(
            bodyParser.json()
        );
        this.app.use(
            cors()
        );
    }

    includeRoutes(){    // execute the application route
        new routes(this.app,redisDB).routesConfig();
        new socketEvents(this.socket,redisDB).socketConfig();
    } 

    appExecute(){   //run the nodejs server

        this.appConfig();
        this.includeRoutes();

        this.http.listen(this.port, this.host, () => {
            console.log(`Listening on http://${this.host}:${this.port}`);
        });
    }

}

const app = new Server();
app.appExecute();