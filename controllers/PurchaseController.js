const PurchaseRepository = require('../repository/mysql2/PurchaseRepository')
const ClientRepository = require('../repository/mysql2/ClientRepository')
const BuildingRepository = require('../repository/mysql2/BuildingRepository')

exports.showPurchasesList = (req, res, next) =>{
    PurchaseRepository.getPurchases()
        .then(purchases => {
            res.render('pages/Historia_Zakupów/list',{
                purchases: purchases,
                navLocation: 'purch',
                pageTitle: req.__('purchase.list.pageTitle')})
        })
}

exports.showAddPurchaseForm = (req,res,next) =>{
    ClientRepository.getClients()
        .then(clients => {
            BuildingRepository.getBuildings()
                .then(buildings => {
                    res.render('pages/Historia_Zakupów/form',{
                        purchase: [],
                        purchaseData: null,
                        clients: clients,
                        buildings: buildings,
                        pageTitle: req.__('purchase.form.add.pageTitle'),
                        formMode: 'add',
                        btnLabel: req.__('purchase.form.add.btnLabel'),
                        formAction: '/Purchases/add',
                        navLocation: 'purch',
                        validationErrors: []})
                })
        })
}
exports.showEditPurchaseForm = (req,res,next) =>{
    const purchaseId = req.params.purchaseId;
        PurchaseRepository.getPurchaseById(purchaseId)
        .then(purchase=>{
            ClientRepository.getClients()
                .then(clients => {
                    BuildingRepository.getBuildings()
                        .then(buildings => {
                            res.render('pages/Historia_Zakupów/form',{
                                m_purchaseId: purchaseId,
                                purchaseData: null,
                                purchase: purchase,
                                clients: clients,
                                buildings: buildings,
                                pageTitle: req.__('purchase.form.edit.pageTitle'),
                                formMode: 'edit',
                                btnLabel: req.__('purchase.form.edit.btnLabel'),
                                formAction: '/purchases/edit',
                                navLocation: 'purch',
                                validationErrors: []})
                        })
                })

    })
}
exports.showPurchaseDetail = (req, res, next) =>{
    const purchaseId = req.params.purchaseId;
    PurchaseRepository.getPurchaseById(purchaseId)
        .then(purchase=>{
            console.log(purchase)
            ClientRepository.getClients()
                .then(clients => {
                    BuildingRepository.getBuildings()
                        .then(buildings => {
                            res.render('pages/Historia_Zakupów/form',{
                                m_purchaseId: purchaseId,
                                purchaseData: null,
                                purchase: purchase,
                                clients: clients,
                                buildings: buildings,
                                pageTitle: req.__('purchase.form.details.pageTitle'),
                                formMode: 'showDetails',
                                formAction: '',
                                navLocation: 'purch',
                                validationErrors: []})
                        })
                })

        })
}
exports.addPurchase = (req, res, next) =>{
    const purchaseData = {...req.body}
    purchaseData.client = parseInt(purchaseData.client)
    purchaseData.flat = parseInt(purchaseData.flat)
    PurchaseRepository.createPurchase(purchaseData)
        .then(()=>{
            res.redirect('/Purchases')
        })
        .catch(err =>{
            ClientRepository.getClients()
                .then(clients => {
                    BuildingRepository.getBuildings()
                        .then(buildings => {
                            res.render('pages/Historia_Zakupów/form',{
                                purchase: [],
                                clients: clients,
                                buildings: buildings,
                                purchaseData: purchaseData,
                                pageTitle: req.__('purchase.form.add.pageTitle'),
                                formMode: 'add',
                                btnLabel:req.__('purchase.form.add.btnLabel'),
                                formAction: '/Purchases/add',
                                navLocation: 'purch',
                                validationErrors: err.details})
                        })
                })
        })
}
exports.updatePurchase = (req, res, next) =>{
    const purchaseId = req.body.purchaseId
    const purchaseData = {...req.body}
    purchaseData.client = parseInt(purchaseData.client)
    purchaseData.flat = parseInt(purchaseData.flat)
    console.log(purchaseData)
    PurchaseRepository.updatePurchase(purchaseId,purchaseData)
        .then(()=>{
            res.redirect('/Purchases')
        }).catch(err => {
            PurchaseRepository.getPurchaseById(purchaseId)
                .then(purchase=>{
                    ClientRepository.getClients()
                     .then(clients => {
                           BuildingRepository.getBuildings()
                               .then(buildings => {
                                  res.render('pages/Historia_Zakupów/form',{
                                    purchase: purchase,
                                    purchaseData: purchaseData,
                                    clients: clients,
                                    buildings: buildings,
                                    pageTitle: req.__('purchase.form.edit.pageTitle'),
                                    formMode: 'edit',
                                    btnLabel:req.__('purchase.form.edit.btnLabel'),
                                    formAction: '/purchases/edit',
                                    navLocation: 'purch',
                                    validationErrors: err.details})
                            })
                    })

            })
    })
}
exports.deletePurchase = (req, res, next) =>{
    const purchaseId = req.params.purchaseId
    PurchaseRepository.deletePurchase(purchaseId)
        .then(()=>{
            res.redirect('/Purchases')
        })
}