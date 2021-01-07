const { GameCache } = require('../resources/cache');
const { VerifyToken } = require('../resources/auth');

class SocketEventHandler {
    constructor(gameCache) {
        this.gameCache = gameCache || new GameCache();
    
        this.events = {
            disconnectEvent: 'disconnect',
        };
    }
  
    /**
     * @summary                 Registers connected user in the cahce
     * @param       socket      Socket object of the connected client
     */
    async handleConnect(socket) {
        let { authorization } = socket.handshake && socket.handshake.query ? socket.handshake.query : {};
        let user = VerifyToken(authorization);
    
        if (!user) return socket.disconnect(true);
        else {
            const player = { 
                username: user.username,
                client: socket.client.id,
                lifes: 3,
                damageTaken: 0,
                character: 'adventure',
                position: {
                    x: 0,
                    y: 0,
                },
                animation: 'idle',
                lobby: false, 
                ready: false
            };

            this.gameCache.registerPlayer(socket.client.id, player);

            console.log(`${player.username} - Joined with client: ${player.client}`);

            this.handleDisconnect(socket);
        }
    }
  
    /**
     * @summary                 Adds a an event handler for client disconnection to delete player from cache
     * @param       socket      Socket object of the connected client
     */
    async handleDisconnect(socket) {
        const context = this;

        socket.on(this.events.disconnectEvent, async () => {
            let player = await context.gameCache.getPlayer(socket.client.id);
            
            await context.gameCache.deletePlayer(socket.client.id);

            console.log(`${player.username} - Left from client: ${player.client}`);
        });
    }
}

module.exports = {
    SocketEventHandler
};