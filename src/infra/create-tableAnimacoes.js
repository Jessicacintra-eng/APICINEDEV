import sqlite3 from 'sqlite3';
const db = new sqlite3.Database("./animacoes.db");

const criarTabelaAnimacoes = `CREATE TABLE IF NOT EXISTS "ANIMACOES"(
        "ID" INTEGER PRIMARY KEY AUTOINCREMENT,
        "TITULO" varchar(200),
        "DESCRICAO" varchar (500),
        "GENERO" varchar(64),
        "LANCAMENTO" varchar(100),
        "DURACAO" integer(50)
    )`;


const insereAnimacoes = `INSERT INTO ANIMACOES (ID, TITULO, DESCRICAO, GENERO, LANCAMENTO, DURACAO)
    VALUES 
    (1, 'Divertida Mente', 'Com a mudança para uma nova cidade, as emoções de Riley, que tem apenas 11 anos de idade, ficam extremamente agitadas. Uma confusão na sala de controle do seu cérebro deixa a Alegria e a Tristeza de fora, afetando a vida de Riley radicalmente.', 'Infantil/Comédia', '2015', '95'),
    (2, 'Enrolados', 'O bandido mais procurado do reino, Flynn Rider, se esconde em uma torre e acaba prisioneiro de Rapunzel, residente de longa data do local. Dona de cabelos dourados e mágicos com 21 metros de comprimento, ela está trancada há anos e deseja desesperadamente a liberdade', 'Musical/Comédia', '2010', '100'),
    (3, 'Aladdin', 'Aladdin liberta o gênio da lâmpada e tem seus desejos atendidos. Porém, ele logo descobre que o diabo tem outros planos para a lâmpada - e para a princesa Jasmim.', 'Musical', '1992', '90'),
    (4, 'O Rei Leão', 'Este desenho animado da Disney mostra as aventuras de um leão jovem de nome Simba, o herdeiro de seu pai, Mufasa. O tio malvado de Simba, Oscar, planeja roubar o trono de Mufasa atraindo pai e filho para uma emboscada.', 'Musical', '1994', '87'),
    (5, 'Frozen', 'Acompanhada por um vendedor de gelo, a jovem e destemida princesa Anna parte em uma jornada por perigosas montanhas de gelo na esperança de encontrar sua irmã, a rainha Elsa, e acabar com a terrível maldição de inverno eterno, que está provocando o congelamento do reino.', 'Musical', '2013', '82')`;

function create() {
    db.run(criarTabelaAnimacoes, (error) => {
      if (error) console.log(error);
    });
  }


  function insert() {
    db.run(insereAnimacoes, (error) => {
      if (error) console.log(error);
    });
  }
        
db.serialize(() => {
    create();
    insert();
})