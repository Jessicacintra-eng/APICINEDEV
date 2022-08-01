import sqlite3 from "sqlite3";
const bd = new sqlite3.Database("./series.db");

const SERIES_SCHEMA = `
CREATE TABLE IF NOT EXISTS "SERIES" (
    "id" INTEGER PRIMARY KEY AUTOINCREMENT,
    "title" VARCHAR(200),
    "description" varchar (500),
    "genre" varchar(64),
    "seasons" DECIMAL(100)
);`;
    
const ADD_SERIES_DATA = `INSERT INTO SERIES (id, title, description, genre, seasons) VALUES 
(1, 'Mr Robot', 'This show is about a programmer who works as a cyber security engineer in a company during day and a vigilante hacker at night.', 'Drama thriller', '4')
(2, 'Silicon Valley', 'The story revolves around a silicon valley engineer who struggles to build his company named Pied Piper.', 'Comedy', '6',)
(3, 'Person of Interest', 'This tv series is about a rich programmer who saves life with the help of surveillance AI that sends them information about the people involved in impending crimes.', 'Crime Drama', '5')`;


function criaTabelaSeries() {
    bd.run(SERIES_SCHEMA, (error) => {
      if (error) console.log('Erro ao criar tabela', error);
    });
  }
  
  
  function populaTabelaSeries() {
    bd.run(ADD_SERIES_DATA, (error) => {
      if (error) console.log("Erro ao popular tabela de Series");
    });
  }
  

  bd.serialize(() => {
    criaTabelaSeries();
    populaTabelaSeries();
  });