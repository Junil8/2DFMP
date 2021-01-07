const Cluster = require('cluster');
require('dotenv/config');

const workerCount = process.env.WORKERS || require('os').cpus().length;
const workers = [];

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
}
 
if (Cluster.isMaster) {
    let threadCount = (workerCount <= require('os').cpus().length) ? workerCount : require('os').cpus().length;

    console.log(`Process ${process.pid} - Starting Cluster service with ${threadCount} workers`);

    for (let i = 0; i < threadCount; i++) spawn(i);

    console.log(`Process ${process.pid} - Cluster service ready`);
}

if (Cluster.isWorker) {
    process.on('message', message => {
        if (message.start) {
            const service = require('./service');
        }
    });
}