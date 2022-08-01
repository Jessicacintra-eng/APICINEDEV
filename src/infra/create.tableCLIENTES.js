import sqlite3 from "sqlite3";
const bd = new sqlite3.Database('./cineDev/src/infra/clientes.db');

const CREATE =
`
CREATE TABLE IF NOT EXISTS "CLIENTES"(
    "ID" INTEGER PRIMARY KEY,
    "NAME" varchar(64),
    "EMAIL" varchar (100),
    "PASSWORD" varchar(55),
    "PAYMENT" varchar(100),
    "CLUB" varchar(64)
);`;

const INSERT =
`INSERT INTO CLIENTES (ID, NAME, EMAIL, PASSWORD, PAYMENT, CLUB)
 VALUES
        ( 1, 'Nathali Motooka', 'nanimotooka@gmail.com', '030302', 'R$45,00', 'Não'),
        ( 2, 'Jessica Cintra', 'jessica.cintra0712@gmail.com', '674567', 'R$34,78', 'Não'),
        ( 3, 'Carol Saint', 'CarolSaint@gmail.com', '384384384783374', 'R$15,00', 'Sim'),
        ( 4, 'Hellen Costa', 'HellenCosta@gmail.com', '12345678987654321', 'R$35,00', 'Não'),
        ( 5, 'Calina Fischer', 'CaFischer@gmail.com', '54455', 'R$29,50', 'Sim'),
        ( 6, 'Felipe Gomes', 'felipegomes@gmail.com', '45675438', 'R$12,00', 'Sim')`;

function create() {
    bd.run(CREATE, (error) => {
        if(error) console.log(error);
    });
}

function insert(){
    bd.run(INSERT,(error) => {
        if(error)console.log('erro ao criar tabela', error);
    });
}

bd.serialize(()=> {
    create();
    insert();
});