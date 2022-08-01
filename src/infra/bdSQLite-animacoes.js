import sqlite3 from 'sqlite3';
const bdd = new sqlite3.Database('./src/infra/animacoes.db');


process.on('SIGINT', () =>
    bdd.close(() => {
        console.log('BD encerrado!');
        process.exit(0);
    })
);

export {bdd};


