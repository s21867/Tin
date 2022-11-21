const bcrypt = require('bcryptjs');

const salt = bcrypt.genSaltSync(8);

exports.hashPassword = (passPlain) => {
    const passHashed = bcrypt.hashSync(passPlain,salt);
    return passHashed
}
exports.comparePasswords = (passPlain,passHash) =>{
    const res = bcrypt.compareSync(passPlain,passHash);
    return res
}
exports.permitAuthenticatedUser = (req,res,next) => {

    const loggedUser = req.session.loggedUser
    console.log(loggedUser)
    if(loggedUser){
        console.log('tututu')
        next()
    }else{
        console.log('tetete')
        throw new Error('unathorized access')
    }
}