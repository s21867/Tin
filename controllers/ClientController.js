const ClientRepository = require('../repository/mysql2/ClientRepository');
const {hashPassword} = require("../util/authUtils");

exports.showClientsList = (req,res,next) => {
    ClientRepository.getClients()
        .then(clients => {
            res.render('Pages/Klienci/list',{
                clients: clients,
                navLocation: 'client',
                pageTitle: req.__('client.list.title')
            })
        })
}
exports.showAddClientForm = (req,res,next) => {
    res.render('Pages/Klienci/form', {
        m_client:{},
        pageTitle:req.__('client.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('client.form.add.btnLabel'),
        formAction: '/clients/add',
        navLocation: 'client',
        validationErrors: []

    })
}
exports.showEditClientForm = (req,res,next) => {
    const klientId = req.params.klientId
    ClientRepository.getClientsById(klientId)
        .then(client =>{
            res.render('Pages/Klienci/form', {
                m_client:client,
                pageTitle:req.__('client.form.add.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('client.form.edit.btnLabel'),
                formAction: '/clients/edit',
                navLocation: 'client',
                validationErrors: []

            })
        })
}
exports.showClientDetails = (req,res,next) => {
    const klientId = req.params.klientId;
    ClientRepository.getClientsById(klientId)
        .then(client => {
            res.render('Pages/Klienci/form',{
                m_client: client,
                formMode:'showDetails',
                pageTitle:req.__('client.form.details.pageTitle'),
                formAction: '',
                navLocation: 'client',
                validationErrors: []
            })
        })
}
exports.addClient = (req,res,next) => {
    const clientData = {...req.body};
    ClientRepository.createClient(clientData)
        .then(() => {
            res.redirect('/Clients');
        }).catch(err =>{
            console.log(err)
            console.log(err.details)
            res.render('Pages/Klienci/form', {
                m_client:clientData,
                pageTitle: req.__('client.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('client.form.add.btnLabel'),
                formAction: '/clients/add',
                navLocation: 'client',
                validationErrors: err.details
            })

        })
}
exports.updateClient = (req,res,next) => {
    const clientData = {...req.body};
    console.log(clientData)
    const klientId = req.body.klientId
    ClientRepository.updateClient(klientId,clientData)
        .then(() => {
            res.redirect('/Clients');
        }).catch(err =>{
        res.render('Pages/Klienci/form', {
            m_client:clientData,
            pageTitle: req.__('client.form.edit.pageTitle'),
            formMode: 'edit',
            btnLabel: req.__('client.form.edit.btnLabel'),
            formAction: '/clients/edit',
            navLocation: 'client',
            validationErrors: err.details

        })
    })
}
exports.deleteClient = (req,res,next) => {
    const clientId = req.params.klientId
    ClientRepository.deleteClient(clientId)
        .then(() =>{
            res.redirect('/Clients')
        })
}