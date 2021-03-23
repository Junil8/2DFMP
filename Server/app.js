const Cluster = require('cluster');
require('dotenv/config');

// Get max threads used on the cpu
const workerCount = process.env.WORKERS || require('os').cpus().length;
const workers = [];

/**
 * @summary                     Spawn/Create a worker
 * @param   {Number}    index   The index of the new worker
 * @returns {Worker}            Newly created worker
 */
const spawn = (index) => {
    workers[index] = Cluster.fork();

    console.log(`Process ${process.pid} - Created a new worker with index: ${index}, and pid: ${workers[index].process.pid}`);

    workers[index].on('online', () => {
        workers[index].send({start: true});
    });

    workers[index].on('exit', (code, signal) => {
        console.log(`Process ${workers[index].process.pid} - Died with code: ${code}, and signal: ${signal}`);
        console.log(`Process ${process.pid} - Respawning Worker with index: ${index}`);
        spawn(index);
    });

    return workers[index];
}

/**
 * Setting up master
 * 
 * This code is run if the process is the master
 */
if (Cluster.isMaster) {
    let threadCount = (workerCount <= require('os').cpus().length) ? workerCount : require('os').cpus().length;

    console.log(`Process ${process.pid} - Starting Cluster service with ${threadCount} workers`);

    for (let i = 0; i < threadCount; i++) spawn(i);

    console.log(`Process ${process.pid} - Cluster service ready`);
}

/**
 * Setting up worker
 * 
 * This code is run if the process is a worker
 */
if (Cluster.isWorker) {
    process.on('message', message => {
        if (message.start) {
            const service = require('./service');
        }
    });
}