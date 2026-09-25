import express from "express"

const app = express()
const PORTA = 3000

app.use(express.json())

let tarefas = [
    {id: 1, titulo: 'Lavar louça', concluida: true},
    {id: 2, titulo: 'Lavar a casa', concluida: false},
    {id: 3, titulo: 'Lavar roupa', concluida: true}
]

let proximoId = tarefas.length + 1

app.get('/', (req, res) => {
    res.json({Mensagem: 'API de Tarefas no ar!'})
})

app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})