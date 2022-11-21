const ClientRepository = require('../repository/mysql2/ClientRepository');
const authUtil = require('../util/authUtils')

exports.login = (req,res,next) => {
    const email = req.body.email;
    const password = req.body.password
    ClientRepository.findByEmail(email)
        .then(klient => {
            console.log(klient)
            if(!klient){
                res.render('index',{
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }else if(authUtil.comparePasswords(password,klient.password) === true){
                req.session.loggedUser = klient
                res.redirect('/');
            }else{
                res.render('index',{
                    navLocation: '',
                    loginError: "Nieprawidłowy adres email lub hasło"
                })
            }
        })
        .catch(err => {
            console.log(err)
        })
}
exports.logout = (req,res,next) => {
    req.session.loggedUser = undefined;
    res.redirect('/')
}