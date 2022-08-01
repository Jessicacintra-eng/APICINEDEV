import sqlite3 from 'sqlite3'
const bd = new sqlite3.Database('./assinaturas.db')

const CREATE = `
    CREATE TABLE IF NOT EXISTS "ASSINATURAS"(
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "cliente" varchar(255),
    "email" varchar(255),
    "senha" varchar(255), 
    "planos" varchar(255)
    );`;
    
const INSERT = `INSERT INTO ASSINATURAS (id,cliente, email, senha, planos) VALUES 
    (1,'Jose Antunes', 'jantunes@exemplo.com', 'JA123', 'Free'),
    (2,'Joao Antonio', 'antonio@exemplo.com', 'A543', 'Free'),
    (3,'Mara Barbosa', 'mara@exemplo.com', 'mr876', 'Premiun'),
    (4,'Alice Souza', 'asouza@exemplo.com', 'SoU444', 'Medio')`;

function create(){
    bd.run(CREATE,(error) => {
        if(error) console.log( error)

})
}

function insert(){
    bd.run(INSERT, (error) => {
        if(error)console.log('erro ao criar tabela', error)
    })
}

bd.serialize(()=> {
create();
insert();
})
