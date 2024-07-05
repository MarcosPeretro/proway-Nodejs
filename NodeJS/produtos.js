const express = require('express')
const router = express.Router()
const pool = require('./config')


router.get('/', async (req, res) => {
    try {
        let produtos = await pool.connect()
        let dados = await produtos.query("select * from tb_produtos")
        produtos.end()
        res.send(dados.rows)
    } catch (error) {
        res.send(error.message)
    }
})

router.post('/', async (req, res) => {
    try {
        let produtos = await pool.connect()
        let dados = await produtos.query("insert into tb_produtos (descricao, preco, estoque) values($1, $2, $3) RETURNING * ", [req.body.descricao, req.body.preco, req.body.estoque])
        produtos.end()
        res.status(201).send(dados.rows[0])
    } catch (error) {
        res.send(error.message)
    }
})

router.delete('/:id', async (req, res) => {
    try {
        let produtos = await pool.connect()
        let dados = await produtos.query("delete from tb_produtos where id = $1", [req.params.id])
        produtos.end()
        res.status(200).send(`O id ${req.params.id} foi deletado`)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.get('/:id', async (req, res) => {
    try {
        let produtos = await pool.connect()
        let dados = await produtos.query("select * from tb_produtos where id = $1", [req.params.id])
        if (dados.rowCount > 0) {
            produtos.end()
            res.status(200).send(dados.rows[0])
        }
        else {
            res.status(404).send("Contato não encontrado")
        }

    } catch (error) {
        res.send(error.message)
    }
})

router.put('/:id', async (req, res) => {
    try {
        let produtos = await pool.connect()
        let dados = await produtos.query("select * from tb_produtos where id = $1", [req.params.id])
        if (dados.rowCount > 0) {
            let novosValores = [req.body.descricao, req.body.preco, req.body.estoque, req.params.id]
            await produtos.query("update tb_produtos set descricao = $1, preco = $2, estoque = $3 where id = $4", novosValores)

            produtos.end()

            res.status(200).send("Contato alterado com sucesso")
        }
        else {
            res.status(404).send("Contado não encontrado")
        }

    } catch (error) {
        res.send(error.message)
    }
})


module.exports = router