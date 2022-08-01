let id = 0
export class Assinaturas {
    constructor(cliente, email, senha, planos) {
            this.id = id++;
            this.cliente = cliente;
            this.email = email;
            this.senha = senha;
            this.planos = planos;
    }
}