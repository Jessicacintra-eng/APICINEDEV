// importação do express e do .env
// import "dotenv/config"
import  Express  from "express"
import cors from'cors'

const port = process.env.PORTA||3000

const app = Express();

const corsConfig={
  //liberando o cors pra todos os sites
  origin:["*"]
}
//middleware
app.use(cors(corsConfig))
app.use(Express.json());
app.use((req,res,next)=>{
    next();
});

// import {bd} from './infra/bdSQLite-filmes.js'
// import {filmes} from './controllers/filmes-controller.js'
// filmes(app, bd);

import {bdSQLite} from './infra/bdSQLite-clientes.js'
import {cliente} from './controllers/clientes-controller.js'
cliente(app, bdSQLite);


import {bdd} from './infra/bdSQLite-animacoes.js'
import {animacoes} from './controllers/animacoes-controller.js'
animacoes(app, bdd)

import {bdA} from './infra/bdSQLite-assinaturas.js'
import {signatures} from './controllers/assinaturas-controller.js'
signatures(app, bdA)

import {bdS} from './infra/bdSQLite-series.js'
import {series} from './controllers/series-controller.js' 
series(app, bdS)

app.listen(port,(port)=>{
  console.log("Porta funcionando")
})

// app.get('/', (req, res) => {
//   res.send("rota principal")
// })

// app.listen(3333, ()=> {
//   console.log('rodando')
// })


export default app