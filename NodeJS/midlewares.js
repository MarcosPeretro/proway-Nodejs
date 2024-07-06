const validator = require("validator")
const jwt = require("jsonwebtoken")
const validaContato = (req, res, next) =>{
    if(req.body.nome == ""){
        res.status(400).send("O nome deve ser informado")
        return
    }
    if (req.body.email == "") {
        res.status(400).send("O email deve ser informado")
        return
    }

    if(!validator.isEmail(req.body.email)){
        res.status(400).send("O email está incoreto")
        return
    }
    next()
}

const verificaToken = (req, res, next) =>{
    let token = req.header["x-code-acess"]
    if(!token){
        res.status(400).send("precisa estar logado")
    }
    else{
        let decoded = jwt.verify(token, process.env.SECRET_KEY)
        console.log(decoded.perfil)
        if(req.method == "POST" & decoded.perfil != "Operador"){
            res.status(400).send("Voce não possui permiçoes de OPERADOR")
            return  
        }
        next()
    }
    
}
module.exports = { validaContato, verificaToken }
