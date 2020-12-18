const cluster = require('cluster');

if (cluster.isMaster) {
    console.log(`Creating server cluster`);

    let thread_count = require('os').cpus().length;
    // CREATE GAME SERVER MULTITHREADS
    for (let i = 0; i < thread_count; i++) cluster.fork();
}

if (cluster.isWorker) {
    const webserver = require('./services/web.server');
    const gameserver = require('./services/game.server');
}