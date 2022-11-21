const express = require('express')
const router = express.Router()
const isAuth = require('../../middleware/isAuth')
const isAdminClient = require('../../middleware/isAdminClient')

const clientApiController = require('../../api/ClientAPI');

router.get('/',isAuth,clientApiController.getClients);
router.get('/:clientId',isAuth,clientApiController.getClientById);
router.post('/add',isAuth,clientApiController.createClient);
router.put('/edit/:clientId',isAuth,isAdminClient,clientApiController.updateClient);
router.delete('/delete/:clientId',isAuth,isAdminClient,clientApiController.deleteClient);

module.exports = router;