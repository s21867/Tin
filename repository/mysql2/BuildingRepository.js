const db = require('../../config/mysql2/db')
const buildingSchema = require('../../model/joi/Building')
exports.getBuildings = () => {
    return db.promise().query(`SELECT * FROM Mieszkanie`)
        .then((results,fields) => {
            return results[0]
        })
        .catch(err=>{
            console.log(err)
            throw err;
        })
};
exports.getBuildingById = (buildingId) => {
    const query = `SELECT m.mieszkanieId, m.ulica, m.numerBudynku,m.numerMieszkania, m.stanDeweloperski, 
                    c.klientId, c.imie, c.nazwisko, c.email,c.numerTelefonu FROM Mieszkanie m
                    left join Kupione_Mieszkanie km on km.ID_Mieszkanie = m.mieszkanieId
                    left join Klient c on km.ID_Klient = c.klientId
                    where m.mieszkanieId = ?`
    return db.promise().query(query,[buildingId])
        .then((results,fields)=>{
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const mieszkanie = {
                mieszkanieId: parseInt(buildingId),
                ulica: firstRow.ulica,
                numerBudynku: firstRow.numerBudynku,
                numerMieszkania: firstRow.numerMieszkania,
                stanDeweloperski: firstRow.stanDeweloperski,
                kupcy: []
            }
            for(let i=0;i<results[0].length;i++){
                const row = results[0][i]
                if(row.klientId){
                    const klient = {
                        klientId: row.klientId,
                        firstName: row.imie,
                        lastName: row.nazwisko,
                        email: row.email,
                        numerTelefonu: row.numerTelefonu,
                    }
                    mieszkanie.kupcy.push(klient)
                }
            }
            return mieszkanie;
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
}
exports.createBuilding = (newBuildingData) => {
    console.log(newBuildingData)
    const vRes = buildingSchema.validate(newBuildingData,{abortEarly:false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    if(newBuildingData.stanDeweloperski==='true'){
        newBuildingData.stanDeweloperski = 1
    }else{
        newBuildingData.stanDeweloperski = 0
    }
    const ulica = newBuildingData.ulica;
    const numerBudynku = newBuildingData.numerBudynku;
    const numerMieszkania = newBuildingData.numerMieszkania;
    const stanDeweloperski = newBuildingData.stanDeweloperski;
    const sql = `INSERT INTO Mieszkanie (ulica,numerBudynku,numerMieszkania,stanDeweloperski) VALUES (?,?,?,?)`
    return db.promise().execute(sql,[ulica,numerBudynku,numerMieszkania,stanDeweloperski])
}
exports.updateBuilding = (buildingId,newBuildingData) => {
    const vRes = buildingSchema.validate(newBuildingData,{abortEarly:false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    if(newBuildingData.stanDeweloperski==='true'){
        newBuildingData.stanDeweloperski = 1
    }else{
        newBuildingData.stanDeweloperski = 0
    }
    const ulica = newBuildingData.ulica;
    const numerBudynku = newBuildingData.numerBudynku;
    const numerMieszkania = newBuildingData.numerMieszkania;
    const stanDeweloperski = newBuildingData.stanDeweloperski;
    const sql = `UPDATE Mieszkanie set ulica = ?, numerBudynku =?, numerMieszkania = ?, stanDeweloperski = ? WHERE mieszkanieId = ?`
    return db.promise().execute(sql,[ulica,numerBudynku,numerMieszkania,stanDeweloperski,buildingId])
}
exports.deleteBuilding = (mieszkanieId) => {
    const sql1 = `DELETE FROM Kupione_Mieszkanie WHERE ID_Mieszkanie = ?`
    const sql2 = `DELETE FROM Mieszkanie WHERE mieszkanieid = ?`
    return db.promise().execute(sql1,[mieszkanieId])
        .then(()=>{
            return db.promise().execute(sql2,[mieszkanieId])
        });
}