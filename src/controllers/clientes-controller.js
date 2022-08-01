import {clientes} from '../models/clientes-models.js';
import {clienteDAO} from '../DAO/Clientes-DAO.js';

export const cliente  = (app, bdSQLite) =>{

    const DAOCliente = new clienteDAO(bdSQLite);



    // ROTA PARA PUXAR CLIENTES
    app.get('/clientes', (req,res)=>{
        const data = async()=>{
            try{
                const clientes = await DAOCliente.listarClientes();
                res.status(200).json(clientes)
            }catch(error){
                res.status(404).json(error)
            }
        }
        data();


    })
    // ROTA PARA PUXAR CLIENTES POR PARAMETRO
    app.get('/clientes/:id', (req, res)=>{
        const data = async()=>{
            try{
                const clientes = await DAOCliente.listarClientesID(req.params.id);
                res.status(200).json(clientes)
            }catch(error){
                res.status(404).json(error)
            }
        }
        data();
    })
    // ROTA PARA CADASTRAR CLIENTES
    app.post('/clientes', (req,res)=>{
     const body = req.body;
     const NovoCliente = new clientes(body.ID, body.NAME, body.EMAIL, body.PASSWORD, body.PAYMENT, body.CLUB);
     const data = async()=>{
        try{
            const clientes = await DAOCliente.CadastrarClientes(NovoCliente);
            res.status(201).json(clientes)
        }catch(error){
            res.status(404).json(error)
        }
    }
    data();





    //  console.log(NovoCliente)   
    //  bdSQLite.run(`INSERT INTO CLIENTES (ID, NAME, EMAIL, PASSWORD, PAYMENT, CLUB)
    //  VALUES (?, ?, ?, ?, ?, ?)`,
    //  [NovoCliente.id, NovoCliente.name, NovoCliente.email, NovoCliente.password, NovoCliente.payment, NovoCliente.club],
    //  (error)=>{
    //     if(error) res.status(404).json(error);
    //         else res.status(200).json('CLIENTE CADASTRADO COM SUCESSO!!!')
    //    })
    })
    // ROTA PARA ALTERAR CLIENTES
    app.put('/clientes/:id', (req, res)=>{
        const body = req.body;
        console.log(body)
        const id = req.params.id;
        console.log(id)
                const data = async()=>{
                    try{
                        const clienteDadosAntigo = await DAOCliente.listarClientesID(id)   
                        const ClienteAtualizado = new clientes(
                            body.ID||clienteDadosAntigo[0].ID,
                            body.NAME || clienteDadosAntigo[0].NAME,
                            body.EMAIL || clienteDadosAntigo[0].EMAIL,
                            body.PASSWORD || clienteDadosAntigo[0].PASSWORD,
                            body.PAYMENT || clienteDadosAntigo[0].PAYMENT,
                            body.CLUB || clienteDadosAntigo[0].CLUB)
                        console.log(ClienteAtualizado)

                            const parametro = [
                                ClienteAtualizado.name, 
                                ClienteAtualizado.email,
                                ClienteAtualizado.password,
                                ClienteAtualizado.payment,
                                ClienteAtualizado.club,
                                id 
                                ];
                                
                        const client = await DAOCliente.AlterarCliente(parametro);
                        res.send(client)
                    }catch(error){
                        res.send(error)
                        console.log(error)
                    }
                }
                data();
    })
    // ROTA PARA DELETAR CLIENTES
    app.delete('/clientes/:id', (req,res)=>{
        const data = async()=>{
            try{
                const clientes = await DAOCliente.DeletarCliente(req.params.id);
                res.status(201).json(clientes)
            }catch(error){
                res.status(404).json(error)
            }
        }
        data();
    })
}


