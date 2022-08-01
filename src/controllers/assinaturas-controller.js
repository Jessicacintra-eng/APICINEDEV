import {Assinaturas} from '../models/assinaturas-model.js';
import {AssinaturasDAO} from '../DAO/assinaturas-DAO.js';
import {bdA} from '../infra/bdSQLite-assinaturas.js';

export const signatures = (app, bdA)=>{

    const DAOAssinaturas = new AssinaturasDAO(bdA);

//ROTA PARA PUXAR ASSINATURA
app.get('/assinaturas', (req, res)=>{
    const data = async()=>{
        try{
            const sign = await DAOAssinaturas.listarAssinaturas();
            res.status(200).json({sign})
        }catch(error){
            res.status(404).json(error)
        }
    }
    data();
})

//ROTA PARA PUXAR ASSINATURAS POR PARAMETRO
app.get('/assinaturas/:id', (req, res)=>{
const data = async()=>{
    try{
        const assinaturas = await DAOAssinaturas.listarAssinaturasID(req.params.id);
        res.status(200).json(assinaturas)
    }catch(error){
        res.status(404).json(error)
    }
}
data();
})


//ROTA PARA CADASTRADAR ASSINATURAS
app.post('/assinaturas/novaAssinatura', (req, res)=>{
    const body = req.body;
    const NovaAssinatura = new Assinaturas(body.cliente, body.email, body.senha, body.planos)
    console.log(NovaAssinatura)
    const data = async()=>{
            try{
                const assinaturas = await DAOAssinaturas.cadastrarAssinaturas(NovaAssinatura);
                res.status(201).json(assinaturas)
            }catch(error){
                res.status(404).json(error)
            }
    }
        data();
        })


//ROTA PARA ALTERAR ASSINATURAS
app.put('/assinaturas/:id', (req, res)=>{
    const body = req.body;
    
    const id = req.params.id;
    const data = async()=>{
        try{
            const AssinaturasDadosAntigo = await DAOAssinaturas.listarAssinaturasID(id);
            const AssinaturaAtualizada = new
            Assinaturas(body.cliente || AssinaturasDadosAntigo[0].cliente, 
                body.email || AssinaturasDadosAntigo[0].email, 
                body.senha || AssinaturasDadosAntigo[0].senha, 
                body.planos || AssinaturasDadosAntigo[0].planos)
        console.log(AssinaturaAtualizada)
        const parametro = [AssinaturaAtualizada.cliente, 
                           AssinaturaAtualizada.email, 
                           AssinaturaAtualizada.senha, 
                           AssinaturaAtualizada.planos,
                           id]
            console.log(parametro)
        const assinaturas = await DAOAssinaturas.AlterarAssinaturas(parametro);
        res.send("Atualizado")
        }catch(error){
            res.send(error)
        }
    }
    data();
    })


//ROTA PARA DELETAR LIVROS
app.delete('/assinaturas/:id', (req,res)=>{
    console.log(req.params.id)
    const data = async()=>{
        try{
            const assinaturas = await DAOAssinaturas.DeletarAssinaturas(req.params.id);
            console.log(assinaturas)
            res.send("Assinatura Deletada")
        }catch(error){
            res.send(error)
            console.log(error)
        }
    }
    data();
    })


}







