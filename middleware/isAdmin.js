const jwt = require('jsonwebtoken')
const purchaseApiController = require("../api/PurchaseApi");
const purchaseRepository = require("../api/PurchaseApi");
const {json} = require("express");
module.exports = (req,res,next) =>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const isAdmin = jwt.decode(token).admin
    const userId = jwt.decode(token).userId
    const purchase = res.locals.purchase

    console.log(purchase[0].ID_Klient)
    if(isAdmin === 0 && userId != purchase[0].ID_Klient){
         res.status(403).json({
             message: "Forbidden"
         })
    }else{
        res.status(200).json(purchase)
    }
}