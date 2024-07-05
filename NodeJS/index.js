const express = require('express')
const app = express()
const port = 3000

const contatos = require('./contatos')
const produtos = require("./produtos")
const usuarios = require("./usuarios")


app.use(express.json())

app.use('/contatos', contatos)
app.use('/produtos', produtos)
app.use('/usuarios', usuarios)


app.listen(port, () => {
  console.log(`Rodando na porta : ${port}`)
})