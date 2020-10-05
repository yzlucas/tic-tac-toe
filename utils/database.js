"use strict"

class redisDB{

    constructor(){
        this.redis = require("redis");
    }

    connectDB(){
        const client = this.redis.createClient({
            host : "127.0.0.1",
            post: 6379
        });

        require("bluebird").promisifAll(client);
        return client;
    }
}

module.exports = new redisDB();