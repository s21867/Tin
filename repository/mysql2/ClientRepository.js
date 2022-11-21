const db = require('../../config/mysql2/db');
const clientSchema = require('../../model/joi/Client')
const {hashPassword} = require("../../util/authUtils");
exports.getClients = () => {
    return db.promise().query(`SELECT * FROM Klient`)
        .then((results,fields) => {
            return results[0]
        })
        .catch(err => {
            console.log(err);
            throw err;
        })
};
exports.getClientsById = (clientId) => {
    const query =`Select c.klientId as klientId, c.imie, c.nazwisko, c.email, c.numerTelefonu, m.mieszkanieId as mieszkanieId,
         m.ulica, m.numerBudynku, m.numerMieszkania, m.stanDeweloperski FROM Klient c
         left join Kupione_Mieszkanie km on km.ID_klient = c.klientID
         left join Mieszkanie m on km.ID_Mieszkanie = m.mieszkanieId
         where c.klientId = ?`
    return db.promise().query(query,[clientId])
        .then((results,fields) => {
            const firstRow = results[0][0];
            if(!firstRow){
                return {};
            }
            const client = {
                klientId: parseInt(clientId),
                imie: firstRow.imie,
                nazwisko: firstRow.nazwisko,
                email: firstRow.email,
                numerTelefonu: firstRow.numerTelefonu,
                mieszkania: []
            }
            for( let i=0;i<results[0].length;i++){
                const row = results[0][i];
                if(row.mieszkanieId){
                    const mieszkanie = {
                        mieszkanieId: row.mieszkanieId,
                        ulica: row.ulica,
                        numerBudynku: row.numerBudynku,
                        numerMieszkania: row.numerMieszkania,
                        stanDeweloperski: row.stanDeweloperski

                    }
                    client.mieszkania.push(mieszkanie)
                };

            }
            return client;
        })
        .catch(err=>{
            console.log(err);
            throw err;
        })

};
checkEmailUnique = (email,empId) =>{
    let sql,promise
    if(empId) {
        sql = `SELECT COUNT(1) as c FROM  Klient where klientId != ? and email = ?`;
        promise = db.promise().query(sql,[empId,email])
    }else{
        sql = `SELECT COUNT(1) as c FROM  Klient where email = ?`;
        promise = db.promise().query(sql,[email])
    }
    return promise.then( (results,fields)=>{
        const count = results[0][0].c;
        let err;
        if(count>0) {
            err = {
                details: [{
                    path: ['email'],
                    message: 'Podany adres email jest już używany'
                }]
            }
        }
        return err;
    })
}
exports.createClient = (newClientData) => {
    console.log(newClientData)
    const vRes = clientSchema.validate(newClientData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    return checkEmailUnique(newClientData.email)
        .then(emailErr => {
            if(emailErr){
                return Promise.reject(emailErr);
            }else{
                const imie = newClientData.imie;
                const nazwisko = newClientData.nazwisko;
                const email = newClientData.email;
                const tel = newClientData.numerTelefonu;
                const pass = hashPassword(newClientData.password);
                const sql = 'INSERT INTO Klient (imie,nazwisko,email,numerTelefonu,password) VALUES (?,?,?,?,?)'
                return db.promise().execute(sql,[imie,nazwisko,email,tel,pass])
            }
        }).catch(err =>{
            console.log(err)
            return Promise.reject(err)
        })


};
exports.updateClient = (clientId, newClientData) => {
    const vRes = clientSchema.validate(newClientData,{abortEarly: false});
    if(vRes.error){
        return Promise.reject(vRes.error)
    }
    return checkEmailUnique(newClientData.email,clientId)
        .then(emailErr => {
            if(emailErr){
                return Promise.reject(emailErr);
            }else{
                const imie = newClientData.imie;
                const nazwisko = newClientData.nazwisko;
                const email = newClientData.email;
                const tel = newClientData.numerTelefonu;
                const pass = hashPassword(newClientData.password)
                const sql= 'UPDATE Klient set imie = ?, nazwisko = ?, email = ?, numerTelefonu = ?, password = ? where klientId = ?'
                return db.promise().execute(sql,[imie,nazwisko,email,tel,pass,clientId])
            }
        }).catch(err =>{
            console.log(err)
            return Promise.reject(err)
        })
};
exports.deleteClient = (clientId) =>{
    const sql1 = 'DELETE FROM Kupione_Mieszkanie WHERE ID_Klient = ?'
    const sql2 = 'DELETE FROM Klient WHERE klientId = ?'
    return db.promise().execute(sql1,[clientId])
        .then(()=>{
            return db.promise().execute(sql2,[clientId])
        });
}
exports.findByEmail = (email) => {
    const sql = 'SELECT * FROM Klient WHERE EMAIL = ?'
    return db.promise().execute(sql,[email])
        .then((results,fields)=>{
            const firstRow = results[0][0]
            const Klient = {
                klientId: firstRow.klientId,
                imie: firstRow.imie,
                nazwisko: firstRow.nazwisko,
                email: firstRow.email,
                numerTelefonu: firstRow.numerTelefonu,
                mieszkania: [],
                password: firstRow.password,
                admin: firstRow.admin
            }
            return Klient;
        }).catch(err=>{
            console.log(err)
            return Promise.reject(err)
        })
}

