import { animacao } from "../models/animacoes-model.js"
import { animacaoDAO }from '../DAO/animacoes-DAO.js'

export const animacoes = (app, bdd) => {

    const animacoesDAO = new animacaoDAO(bdd);

    //ROTA PARA PUXAR ANIMAÇÕES
    app.get('/animacoes', (req, res) => {
        const data = async () => {
            try{
                const animacao = await animacoesDAO.listarAnimacoes()
                res.status(200).json(animacao)
            }catch(error){
                res.status(404).json(error)
            }
        }

        data();
    })

    //ROTA PARA PUXAR ANIMAÇÕES POR PARAMETRO
    app.get('/animacoes/:id', (req, res) => {
        const data = async () => {
            try{
                const animacao = await animacoesDAO.listarAnimacoesID(req.params.id)
                res.status(200).json(animacao)
            }catch(error){
                res.status(404).json(error)
            }
        }

        data();
    })

    //ROTA DE CADASTRAR
    app.post('/animacoes', (req, res) => {
        const body = req.body;
        const novaAnimacao = new animacao(body.TITULO, body.DESCRICAO, body.GENERO, body.LANCAMENTO, body.DURACAO);
        const parametros = [body.id,novaAnimacao.titulo, novaAnimacao.descricao, novaAnimacao.genero, novaAnimacao.lancamento, novaAnimacao.duracao]
        animacoesDAO.inserirAnimacoes(parametros)
        console.log(novaAnimacao)
        const data = async () => {
            try{
                const animacao = await animacoesDAO.inserirAnimacoes(novaAnimacao)
                res.status(201).json(animacao)
            }catch(error){
                res.status(404).json(error)
            }
        }

        data();
    })

    //ROTA DE ALTERAR
    app.put('/animacoes/:id', (req, res) => {
        const body = req.body;
        console.log(body)
        const id = req.params.id;
        console.log(id)
                const data = async () => {
                    try{
                        const animacaoAntiga = await animacoesDAO.listarAnimacoesID(id)
                        const animacaoAtual = new animacao(body.TITULO || animacaoAntiga[0].TITULO, body.DESCRICAO || animacaoAntiga[0].DESCRICAO, body.GENERO || animacaoAntiga[0].GENERO, body.LANCAMENTO || animacaoAntiga[0].LANCAMENTO, body.DURACAO || animacaoAntiga[0].DURACAO);
                        const parametro = [animacaoAtual.titulo, animacaoAtual.descricao, animacaoAtual.genero, animacaoAtual.lancamento, animacaoAtual.duracao, id]
                        const animacaoo = await animacoesDAO.alterarAnimacoes(parametro)
                        console.log(animacaoAtual)
                        res.status(200).json(animacaoo)
                    }catch(error){
                        console.log(error)
                        res.status(404).json(error)
                    }
                }
        
                data();
            })

    //ROTA DE DELETAR
    app.delete('/animacoes/:id', (req, res) => {
        const data = async () => {
            try{
                const animacao = await animacoesDAO.deletarAnimacoes(req.params.id)
                res.status(200).json(animacao)
            }catch(error){
                res.status(404).json(error)
            }
        }

        data();
    })

};