require("dotenv").config() 
const request = require('supertest')
const port = process.env.PORTA
const UrlAPI = `http://localhost:${port}`

describe('UrlAPI', () => {
    test('TESTAR ROTA ANIMACOES GET', async ()=>{
        const resposta = await request(UrlAPI).get('/animacoes')
        expect(resposta.statusCode).toBe(200)
    })
    test('TESTAR ROTA ANIMACOES GET COM ID', async ()=>{
        const resposta = await request(UrlAPI).get('/animacoes/:id')
        expect(resposta.statusCode).toBe(200)
    })
    test('TESTAR ROTA ANIMACOES POST', async ()=>{
        const resposta = await request(UrlAPI).post('/animacoes/novaAnimacao')
        expect(resposta.statusCode).toBe(200)
    })
    test('TESTAR ROTA ANIMACOES PUT COM ID', async ()=>{
        const resposta = await request(UrlAPI).put('/animacoes/:id')
        expect(resposta.statusCode).toBe(200)
    })
    test('TESTAR ROTA ANIMACOES DEL COM ID', async ()=>{
        const resposta = await request(UrlAPI).delete('/animacoes/:id')
        expect(resposta.statusCode).toBe(200)
    })
})