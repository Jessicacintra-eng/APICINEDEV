import { FilmeDAO }from '../DAO/filmes-DAO.js'
import { bd} from "../infra/bdSQLite-filmes.js";
import { Filme } from "../models/filmes-model.js";

export const filmes = (app) => {
  const FilmesDAO = new FilmeDAO(bd)
  app.get("/filmes", (req, res) => {
    FilmesDAO.listarFilme()
    .then((result) => {
      res.status(200).json({ "Esses são todos os filmes catalogados": result })
    })
    .catch((err) => {res.send(err)})
  });
  app.get("/filmes/:id", (req, res) => {
    FilmesDAO.listarFilmesID(req.params.id)
      .then((result) => {
        res.status(200).json({ "Filme solicitado": result })
      })
      .catch((err) => {
        res.send(err);
      });
  });

  app.post("/filmes/novoFilme", (req, res) => {
      const body = req.body;
      const novoFilme = new Filme(body.titulo, body.descricao, body.genero, body.rating, body.duracao);
      console.log(novoFilme) 
      FilmesDAO.insereFilme(novoFilme)
       .then((result)=>{
        res.send(`Filme adicionado com sucesso` );
       })
       .catch((err)=>{
        res.send(err);
       })
      
  });

  app.post("/filmes/novoFilmeID", (req, res) => {
    const body = req.body;
    const novoFilme = new Filme(body.titulo, body.descricao, body.genero, body.rating, body.duracao);
    const parametros = [body.id,novoFilme.titulo, novoFilme.descricao, novoFilme.genero, novoFilme.rating, novoFilme.duracao]
    FilmesDAO.insereFilmeID(parametros)
     .then((result)=>{
      res.send(`Filme adicionado com sucesso` );
     })
     .catch((err)=>{
      res.send(err);
     })
    
});
  app.put("/filmes/:id", (req, res) => {
    const body = req.body;
    console.log(body)
    const id = req.params.id;
    console.log(id)
    const filmes = FilmesDAO.listarFilmesID(id);
    const dadosFilmeNovo = new Filme(
      body.titulo || filmes.titulo,
      body.descricao || filmes.descricao,
      body.genero || filmes.genero,
      body.rating || filmes.rating,
      body.duracao || filmes.duracao,
    );
    const parametro = [
      dadosFilmeNovo.titulo,
      dadosFilmeNovo.descricao,
      dadosFilmeNovo.genero,
      dadosFilmeNovo.rating,
      dadosFilmeNovo.duracao,
      id,
    ];
    const FilmeAtual = FilmesDAO.alterarFilme(parametro)
      .then((result) => {
        res.send(FilmeAtual);
      })
      .catch((err) => {
        res.send(err);
      });
  });
  

  app.delete("/filmes/:id", (req, res) => {
    FilmesDAO.deletarSeries(req.params.id)
      .then((result) => {
        res.send(`Filme deletado com sucesso` );
      })
      .catch((err) => {
        res.send(err);
      });
  });
};
