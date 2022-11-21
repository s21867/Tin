const express = require('express');
const router = express.Router();
const clientController = require('../controllers/ClientController')
router.get('/',clientController.showClientsList)
router.get('/add',clientController.showAddClientForm)
router.get('/edit/:klientId',clientController.showEditClientForm)
router.get('/details/:klientId',clientController.showClientDetails)
router.post('/add',clientController.addClient);
router.post('/edit',clientController.updateClient);
router.get('/delete/:klientId',clientController.deleteClient)
module.exports = router;