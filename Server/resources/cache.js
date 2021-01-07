const Redis = require('ioredis');

class GameCache {
    constructor(redisClient) {
        this.redisClient = redisClient || new Redis(process.env.REDIS_PORT, process.env.REDIS_HOST);
    }

    /**
     * @summary                         Maps player info to his connection id
     * @param   {String}    clientID    Id of the player
     * @param   {JSON}      player      Info about the player
     * @returns {promise}               Resolves to the status of the operation in redis
     */
    async registerPlayer(clientID, player) {
        return this.redisClient.set(clientID, JSON.stringify(player));
    };

    /**
     * @summary                         Removes player from cache
     * @param   {String}    clientID    Id of the player
     * @returns {promise}               Resolves to the status of the operation in redis
     */
    async deletePlayer(clientID) {
        return await this.redisClient.del(clientID);
    };

    /**
     * @summary                         Gets player info by connnection id
     * @param   {String}    clientID    Id of the player
     * @returns {promise}               Resolves to a json object containing player info
     */
    async getPlayer(clientID) {
        return JSON.parse(await this.redisClient.get(clientID));
    };
}

module.exports = {
    GameCache
}