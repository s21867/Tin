const express = require('express');
const router = express.Router();
const purchaseController = require('../controllers/PurchaseController');
router.get('/',purchaseController.showPurchasesList);
router.get('/add',purchaseController.showAddPurchaseForm);
router.get('/details/:purchaseId',purchaseController.showPurchaseDetail);
router.get('/edit/:purchaseId',purchaseController.showEditPurchaseForm)
router.post('/add',purchaseController.addPurchase)
router.post('/edit',purchaseController.updatePurchase)
router.get('/delete/:purchaseId',purchaseController.deletePurchase)
module.exports = router