const ClientRepository = require('../repository/mysql2/ClientRepository')
const config = require("../config/auth/key")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.login = (req,res) => {
    const email = req.body.email
    const password = req.body.password
    ClientRepository.findByEmail(email)
        .then(user=>{
            if(!user){
                console.log('user')
                return res.status(401).send({message: "Nieprawidłowy email lub hasło!"})
            }
            bcrypt.compare(password,user.password)
                .then(isEqual => {
                    if(!isEqual){
                        return res.status(401).send({message: "Nieprawidłowy email lub hasło!"})
                    }
                    const token = jwt.sign(
                        {
                            email:user.email,
                            userId:user.klientId,
                            admin:user.admin
                        },
                        config.secret,
                        {expiresIn: '1h'}
                    )
                    res.status(200).json({token: token, userId: user.klientId})
                })
                .catch(err => {
                    console.log(err)
                    res.status(501)
                })
        })
}