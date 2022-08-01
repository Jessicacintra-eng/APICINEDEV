import sqlite3 from 'sqlite3';
const bdA = new sqlite3.Database('./src/infra/assinaturas.db');

process.on('SIGINT', () => 
    bdA.close(() => {
        console.log('BD encerrado!');
        process.exist(0);
    })
);

export {bdA};