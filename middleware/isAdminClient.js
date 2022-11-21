const jwt = require('jsonwebtoken')
const purchaseApiController = require("../api/PurchaseApi");
const purchaseRepository = require("../api/PurchaseApi");
const {json} = require("express");
module.exports = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const isAdmin = jwt.decode(token).admin
    const klientId = jwt.decode(token).userId
    const client = req.params.clientId

    if(isAdmin === 0 && klientId != client){
        res.status(403).json({
            message: "Forbidden"
        })
    }else{
        next()
    }
}