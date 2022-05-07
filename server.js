const express = require('express');
const cors = require('cors');
const path = require('path');
const logger = require('morgan');
const colors = require('colors');
const connection = require('./database/connection');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.host = process.env.HOST || 'localhost';
        this.server = require('http').createServer(this.app);

        this.middlewares();
        this.routes();
}

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(logger('dev'));
        this.app.use(express.urlencoded({extended: true}));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    routes(){
    }

    launch(){
        this.server.listen(this.port, this.host, () => {
            console.log(`Server running on ${this.host}:${this.port}`.green);
        });
    }

}

module.exports = Server;