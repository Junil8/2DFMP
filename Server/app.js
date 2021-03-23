const Cluster = require('cluster');
require('dotenv/config');

// Get max threads on the cpu
const workerCount = process.env.WORKERS || require('os').cpus().length;
const workers = [];

// Spawn function to create a worker and startup the worker
const spawn = (index) => {
    // Create worker
    workers[index] = Cluster.fork();

    console.log(`Process ${process.pid} - Created a new worker with index: ${index}, and pid: ${workers[index].process.pid}`);

    // Setup startup message on worker
    workers[index].on('online', () => {
        workers[index].send({start: true});
    });

    // Setup terminate message on worker
    workers[index].on('exit', (code, signal) => {
        console.log(`Process ${workers[index].process.pid} - Died with code: ${code}, and signal: ${signal}`);
        console.log(`Process ${process.pid} - Respawning Worker with index: ${index}`);
        spawn(index);
    });
}

// Setup master thread
if (Cluster.isMaster) {
    let threadCount = (workerCount <= require('os').cpus().length) ? workerCount : require('os').cpus().length;

    console.log(`Process ${process.pid} - Starting Cluster service with ${threadCount} workers`);

    // Spawn workers
    for (let i = 0; i < threadCount; i++) spawn(i);

    console.log(`Process ${process.pid} - Cluster service ready`);
}

// Setup worker thread
if (Cluster.isWorker) {
    // Tell the worker to start up
    process.on('message', message => {
        if (message.start) {
            const service = require('./service');
        }
    });
}