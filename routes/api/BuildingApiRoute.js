const express = require('express')
const router = express.Router();
const isAuth = require('../../middleware/isAuth')

const buildingApiController = require('../../api/BuildingApi');

router.get('/',isAuth,buildingApiController.getBuildings);
router.get('/:buildingId',isAuth,buildingApiController.getBuildingById);
router.post('/add',isAuth,buildingApiController.createBuilding);
router.put('/edit/:buildingId',isAuth,buildingApiController.updateBuilding)
router.delete('/delete/:buildingId',isAuth,buildingApiController.deleteBuilding);

module.exports = router;