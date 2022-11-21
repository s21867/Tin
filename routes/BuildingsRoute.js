const express = require('express');
const router = express.Router();
const buildingController = require('../controllers/BuildingController')
router.get('/',buildingController.showBuildingsList)
router.get('/add',buildingController.showAddBuildingForm)
router.get('/edit/:mieszkanieId',buildingController.showEditBuildingForm)
router.get('/details/:mieszkanieId',buildingController.showBuildingDetails)
router.post('/add',buildingController.addBuilding)
router.post('/edit',buildingController.updateBuilding)
router.get('/delete/:mieszkanieId',buildingController.deleteBuilding)
module.exports = router;