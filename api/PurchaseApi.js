const purchaseRepository = require('../repository/mysql2/PurchaseRepository');
const jwt = require('jsonwebtoken')


exports.getPurchases = (req,res,next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    const isAdmin = jwt.decode(token).admin
    const klientId = jwt.decode(token).userId
    if(isAdmin){
        purchaseRepository.getPurchases()
            .then(purchases => {
                res.status(200).json(purchases);
            })
            .catch(err=>{
                console.log(err);
            });
    }else{
        purchaseRepository.getFilteredPurchases(klientId)
            .then(purchases => {
                res.status(200).json(purchases);
            })
            .catch(err=>{
                console.log(err);
            });
    }

};
exports.getPurchaseById = (req,res,next) => {
    const ID_Kupna = req.params.ID_Kupna;
    purchaseRepository.getPurchaseById(ID_Kupna)
        .then(purchase => {
            if(!purchase.length){
                res.status(404).json({
                    message: 'Purchase with id: '+ID_Kupna+' not found'
                })
            }else{
                res.locals.purchase = purchase
                next()
            }
        })
}
exports.createPurchase = (req,res,next)=>{
    purchaseRepository.createPurchase(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.status(500).json(err.details)
            next(err);
        })
}
exports.updatePurchase = (req,res,next)=>{
    const ID_Kupna = req.params.ID_Kupna;
    purchaseRepository.updatePurchase(ID_Kupna,req.body)
        .then(result => {
            res.status(200).json({message: 'Purchase updated!',purchase:result});
        })
        .catch(err => {
            console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.status(500).json(err.details)
            next(err);
        });
};
exports.deletePurchase = (req,res,next)=>{
    const ID_Kupna = req.params.ID_Kupna;
    purchaseRepository.deletePurchase(ID_Kupna)
        .then(result => {
            res.status(200).json({message: 'Removed purchase',purchase:result});
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })
}