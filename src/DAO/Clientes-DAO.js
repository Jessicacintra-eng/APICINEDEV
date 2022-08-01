 export class clienteDAO{
    constructor(bd){
        this.bd = bd;
    }
    listarClientes(){
        return new Promise((resolve, reject) =>{
            this.bd.all(`SELECT * FROM CLIENTES`, (error, resultado) => {
                if(error) reject(error);
                else resolve(resultado)
            })
        })
    }
    listarClientesID(id){
        return new Promise((resolve, reject) =>{
            this.bd.all(`SELECT * FROM CLIENTES WHERE id = ${id} `, (error, resultado) => {
                if(error) reject(error);
                else resolve(resultado)
            })
        })
    }
    CadastrarClientes(Cliente){
        return new Promise((resolve, reject) =>{
            this.bd.run(`INSERT INTO CLIENTES (ID, NAME, EMAIL, PASSWORD, PAYMENT, CLUB)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [Cliente.id, Cliente.name, Cliente.email, Cliente.password, Cliente.payment, Cliente.club],
            (error)=>{
               if(error) reject(error);
                   else resolve('CLIENTE CADASTRADO COM SUCESSO!!!')
              })
        })
    }
    AlterarCliente(ClienteAtualizado){
        return new Promise((resolve, reject) =>{
            this.bd.all(`
            UPDATE CLIENTES 
            SET name = ?, email = ?, password = ?, payment = ?, club = ? WHERE id = ?`,ClienteAtualizado,
                (error)=>{
                if(error) {
                    reject(error)
                console.log(error)
                }else{ resolve('CLIENTE ALTERADO COM SUCESSO!!!')}
            })
        })
    }
    DeletarCliente(id){
        return new Promise((resolve, reject) =>{
            this.bd.run(`DELETE FROM CLIENTES WHERE id = ${id}`, (error)=>{
                if(error) reject(error);
                else resolve("DEU CERTO DELETAR CLIENTE")
    
            })
       })
    }
}
