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

function filtrarTarefas(req, res, next){
    const {concluida} = req.query

    if(concluida !== undefined){
        const foiConcluida = concluida === 'true'

        const tarefasConcluidas = tarefas.filter(tarefa => tarefa.concluida === foiConcluida)
        
        return res.json(tarefasConcluidas)
    }

    next()
}

app.get('/tarefas', filtrarTarefas, (req, res) => {
    res.json(tarefas)
})

function buscarTarefa(req, res, next){
    const id = req.params.id
    const idTarefa = parseInt(id)

    const tarefa = tarefas.find(t => t.id === parseInt(idTarefa)) 

    if(!tarefa){
        return res.status(404).json({Error: 'Tarefa não encontrado!'})
    }

    req.tarefa = tarefa

    next()
}

app.get('/tarefas/:id', buscarTarefa, (req, res) => {
    res.json(req.tarefa)
})


app.listen(PORTA, () => {
    console.log(`Servidor rodando em http://localhost:${PORTA}`)
})