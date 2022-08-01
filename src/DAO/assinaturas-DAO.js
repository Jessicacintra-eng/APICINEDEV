export class AssinaturasDAO{
    constructor(bd){
        this.bd = bd;
    }
    listarAssinaturas(){
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM ASSINATURAS`, (error, resultado)=>{
                if(error) reject(error);
                else resolve(resultado)
            })
        })
    }

    listarAssinaturasID(id){
        return new Promise((resolve, reject) => {
            this.bd.all(`SELECT * FROM ASSINATURAS WHERE id = ${id}`, (error, resultado)=>{
                if(error) reject(error);
                else resolve(resultado)
            })
        })
    }

    cadastrarAssinaturas(assinaturas){
        return new Promise((resolve, reject) => {
            this.bd.all(
                `INSERT INTO ASSINATURAS (cliente, email, senha, planos)
                VALUES (?, ?, ?,?)`, 
                [assinaturas.cliente, assinaturas.email, assinaturas.senha, assinaturas.planos],
            (error) => {
                if(error) reject(error);
                else resolve('DEU CERTO INSERIR ASSINATURAS')
            })
        })
    }
    AlterarAssinaturas(AssinaturaAtualizada){
        return new Promise((resolve, reject) => {
            this.bd.all(`
            UPDATE ASSINATURAS
            SET cliente = ?, email = ?, senha = ?, planos = ? WHERE id = ?`, AssinaturaAtualizada,
            (error) => {
                if(error) reject(error);
                else resolve('DEU CERTO INSERIR ASSINATURAS')
            })
        })
    }
    DeletarAssinaturas(id){
        return new Promise((resolve, reject) => {
            this.bd.all(`DELETE FROM ASSINATURAS WHERE id = ${id}`, (error) =>{
                if(error) reject(error);
                else resolve("DEU CERTO DELETAR ASSINATURAS")
            })
        })
    }
}
