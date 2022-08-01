export class animacaoDAO {
    constructor(bdd){
        this.bdd= bdd;
    }
    listarAnimacoes(){
        return new Promise ((resolve, reject) => {
            this.bdd.all(`SELECT * FROM ANIMACOES`, (error, resultado) => {
                    if (error) reject(error)
                    else resolve(resultado)
                })
        })
    }

    listarAnimacoesID(id){
        return new Promise ((resolve, reject) => {
            this.bdd.all(`SELECT * FROM ANIMACOES WHERE id = ${id}`, (error, resultado) => {
                if (error)reject(error)
                else resolve(resultado)
            })
        })
    }


    inserirAnimacoes(novaAnimacao){
        return new Promise ((resolve, reject) => {
            this.bdd.run(`INSERT INTO ANIMACOES (titulo, descricao,genero, lancamento, duracao) VALUES (?, ?, ?, ?, ?)`, [novaAnimacao.titulo, novaAnimacao.descricao, novaAnimacao.genero, novaAnimacao.lancamento, novaAnimacao.duracao],
            (error) => {
                if (error) reject(error)
                else resolve('Animação Inserida')
            })
        })
    }


    alterarAnimacoes(parametro){
        return new Promise ((resolve, reject) => {
            this.bdd.run(`UPDATE ANIMACOES SET titulo = ?, descricao = ?, genero = ?, lancamento = ?, duracao = ? WHERE id = ?`, parametro,
            (error) => {
                if (error) reject(error)
                else resolve('Animação Alterada')
            })
        })
    }


    deletarAnimacoes(id){
        return new Promise ((resolve, reject) => {
            this.bdd.run(`DELETE FROM ANIMACOES WHERE id = ${id}`, (error) => {
                if (error) reject(error)
                else resolve('Animação Deletada')
            })
        })
    }
}