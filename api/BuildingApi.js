const buildingRepository = require('../repository/mysql2/BuildingRepository');

exports.getBuildings = (req,res,next) => {
    buildingRepository.getBuildings()
        .then(buildings => {
            res.status(200).json(buildings);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getBuildingById = (req,res,next) => {
    const buildingId = req.params.buildingId;
    buildingRepository.getBuildingById(buildingId)
        .then(building => {
            if(!building){
                res.status(404).json({
                    message: 'Building with id '+buildingId+'not found'
                })
            }else{
                res.status(200).json(building)
            }
        })
}
exports.createBuilding = (req,res,next)=>{
    buildingRepository.createBuilding(req.body)
        .then(newObj => {
            res.status(201).json(newObj)
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.status(500).json(err.details)
            next(err);
        })
}
exports.updateBuilding = (req,res,next)=>{
    const buildingId = req.params.buildingId;
    buildingRepository.updateBuilding(buildingId,req.body)
        .then(result => {
            res.status(200).json({message:'Building updated!',building:result});
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.status(500).json(err.details)
            next(err);
        });
}
exports.deleteBuilding = (req,res,next) => {
    const buildingId = req.params.buildingId;
    buildingRepository.deleteBuilding(buildingId)
        .then(result => {
            res.status(200).json({message: 'Removed building',building:result})
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })
}