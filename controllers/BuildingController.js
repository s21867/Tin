const BuildingRepository = require('../repository/mysql2/BuildingRepository');
exports.showBuildingsList = (req,res,next) => {
    BuildingRepository.getBuildings()
        .then(buildings => {
            res.render('Pages/Mieszkanie/List',{
                buildings: buildings,
                navLocation: 'build',
                pageTitle: req.__('flat.list.title')
            })
        })
}
exports.showAddBuildingForm = (req,res,next) => {
    res.render('pages/Mieszkanie/form',{
        mieszkanie:{},
        pageTitle: req.__('flat.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('flat.form.add.btnLabel'),
        formAction:'/buildings/add',
        navLocation: 'build',
        validationErrors: []});
}
exports.showBuildingDetails = (req,res,next) => {
    const buildId = req.params.mieszkanieId
    BuildingRepository.getBuildingById(buildId)
        .then(mieszkanie =>{
            console.log(mieszkanie)
            res.render('pages/Mieszkanie/form',{
                mieszkanie:mieszkanie,
                formMode:'showDetails',
                pageTitle: req.__('flat.form.details.pageTitle'),
                formAction:'',
                navLocation: 'build',
                validationErrors: []});
        })
}
exports.showEditBuildingForm = (req,res,next) => {
    const buildId = req.params.mieszkanieId
    BuildingRepository.getBuildingById(buildId)
        .then(mieszkanie =>{
            res.render('pages/Mieszkanie/form',{
                mieszkanie:mieszkanie,
                formMode:'edit',
                pageTitle:req.__('flat.form.edit.pageTitle'),
                btnLabel: req.__('flat.form.edit.btnLabel'),
                formAction:'/buildings/edit',
                navLocation: 'build',
                validationErrors: []});
        })
}
exports.addBuilding = (req,res,next) =>{
    const buildingData = {...req.body};
    console.log(buildingData.stanDeweloperski)
    if(!buildingData.numerMieszkania){
        buildingData.numerMieszkania = null
    }
    BuildingRepository.createBuilding(buildingData)
        .then(()=>{
            res.redirect('/Buildings');
        }).catch(err => {
            console.log(buildingData)
            res.render('pages/Mieszkanie/form',{
            mieszkanie:buildingData,
            pageTitle: req.__('flat.form.add.pageTitle'),
            formMode: 'createNew',
            btnLabel: req.__('flat.form.add.btnLabel'),
            formAction:'/buildings/add',
            navLocation: 'build',
            validationErrors: err.details});
    })
}
exports.updateBuilding = (req,res,next) =>{
    const buildingData = {...req.body};
    if(!buildingData.numerMieszkania){
        buildingData.numerMieszkania = null
    }
    const buildingId = req.body.mieszkanieId
    BuildingRepository.updateBuilding(buildingId,buildingData)
        .then(()=>{
            res.redirect('/Buildings')
        }).catch(err=>{
        res.render('pages/Mieszkanie/form',{
            mieszkanie:buildingData,
            formMode:'edit',
            pageTitle: req.__('flat.form.edit.pageTitle'),
            btnLabel: req.__('flat.form.edit.btnLabel'),
            formAction:'/buildings/edit',
            navLocation: 'build',
            validationErrors: err.details});
    })
}
exports.deleteBuilding = (req,res,next) =>{
    const buildingId = req.params.mieszkanieId
    BuildingRepository.deleteBuilding(buildingId)
        .then(()=>{
            res.redirect('/Buildings')
        })
}