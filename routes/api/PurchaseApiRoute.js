const express = require('express')
const router = express.Router();
const isAuth = require('../../middleware/isAuth')
const isAdmin = require('../../middleware/isAdmin')
const isAdminPurchase = require('../../middleware/isAdminPurchase')

const purchaseApiController = require('../../api/PurchaseApi');

router.get('/',isAuth,purchaseApiController.getPurchases);
router.get('/:ID_Kupna',isAuth,purchaseApiController.getPurchaseById,isAdmin);
router.post('/add',isAuth,purchaseApiController.createPurchase);
router.put('/edit/:ID_Kupna',isAuth,purchaseApiController.getPurchaseById,isAdminPurchase,purchaseApiController.updatePurchase);
router.delete('/delete/:ID_Kupna',isAuth,purchaseApiController.getPurchaseById,isAdminPurchase,purchaseApiController.deletePurchase);

module.exports = router;