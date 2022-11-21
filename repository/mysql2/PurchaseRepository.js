const db = require('../../config/mysql2/db')
const purchaseSchema = require('../../model/joi/Purchase')

exports.getPurchases = () => {
    const query = `SELECT ID_Kupna,ID_Mieszkanie,ID_Klient,klientId,mieszkanieId,DataKupna,CenaKupna,Imie,Nazwisko,ulica,numerBudynku,numerMieszkania FROM Kupione_Mieszkanie km
                    left join Mieszkanie m on km.ID_Mieszkanie = m.mieszkanieId
                    left join Klient k on km.ID_Klient = k.klientId`
    return db.promise().query(query)
        .then((results,fields) => {
            return results[0]
        })
        .catch(err => {
            throw err;
        })

}
exports.getFilteredPurchases = (ID_Klient) => {
    const query = `SELECT ID_Kupna,ID_Mieszkanie,ID_Klient,klientId,mieszkanieId,DataKupna,CenaKupna,Imie,Nazwisko,ulica,numerBudynku,numerMieszkania FROM Kupione_Mieszkanie km
                    left join Mieszkanie m on km.ID_Mieszkanie = m.mieszkanieId
                    left join Klient k on km.ID_Klient = k.klientId
                    where k.klientId = ?`
    return db.promise().query(query,[ID_Klient])
        .then((results,fields) => {
            return results[0]
        })
        .catch(err => {
            throw err;
        })

}

exports.getAll = () => {
    const query = `SELECT ID_Kupna,ID_Mieszkanie,ID_Klient,klientId,mieszkanieId,DataKupna,CenaKupna,Imie,Nazwisko,ulica,numerBudynku,numerMieszkania FROM Kupione_Mieszkanie km
                    left join Mieszkanie m on km.ID_Mieszkanie = m.mieszkanieId
                    right join Klient k on km.ID_Klient = k.klientId
                    UNION
                    SELECT ID_Kupna,ID_Mieszkanie,ID_Klient,klientId,mieszkanieId,DataKupna,CenaKupna,Imie,Nazwisko,ulica,numerBudynku,numerMieszkania FROM Kupione_Mieszkanie km
                    right join Mieszkanie m on km.ID_Mieszkanie = m.mieszkanieId
                    left join Klient k on km.ID_Klient = k.klientId`
    return db.promise().query(query)
        .then((results,fields) => {
            return results[0]
        })
        .catch(err => {
            throw err;
        })
}
exports.getPurchaseById = (ID_Kupna) =>{
    const query = `SELECT ID_Kupna,ID_Mieszkanie,ID_Klient,DataKupna,CenaKupna,Imie,Nazwisko,ulica,numerBudynku,numerMieszkania FROM Kupione_Mieszkanie km
                    left join Mieszkanie m on km.ID_Mieszkanie = m.mieszkanieId
                    left join Klient k on km.ID_Klient = k.klientId
                    where ID_Kupna = ?`
    return db.promise().query(query,[ID_Kupna])
        .then((results,fields) => {
            return results[0]
        })
        .catch(err => {
            throw err;
        })
}
exports.createPurchase = (data) => {
    console.log(data)
    const vRes = purchaseSchema.validate(data,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    const sql = `INSERT INTO Kupione_Mieszkanie (ID_Klient,ID_Mieszkanie,DataKupna,CenaKupna) VALUES(?,?,?,?)`
    return db.promise().execute(sql,[data.client,data.flat,data.DataKupna,data.CenaKupna]);
}
exports.updatePurchase = (ID_Kupna,newData) => {
    const vRes = purchaseSchema.validate(newData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    const sql = 'UPDATE Kupione_Mieszkanie set ID_Klient = ?, ID_Mieszkanie = ?,DataKupna = ?, CenaKupna = ? WHERE ID_Kupna = ?';
    return db.promise().execute(sql,[newData.client,newData.flat,newData.DataKupna,newData.CenaKupna,ID_Kupna])
}
exports.deletePurchase = (ID_Kupna) => {
    const sql = `DELETE FROM Kupione_Mieszkanie where ID_Kupna = ?`
    return db.promise().execute(sql,[ID_Kupna])
}