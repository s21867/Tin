const clientRepository = require('../repository/mysql2/ClientRepository');

exports.getClients = (req,res,next) => {
    clientRepository.getClients()
        .then(clients => {
            res.status(200).json(clients);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getClientById = (req,res,next) => {
    const clientId = req.params.clientId;
    clientRepository.getClientsById(clientId)
        .then(client => {
            if(!client.klientId){
                res.status(404).json({
                    message: 'Client with id: '+clientId+' not found'
                })
            }else{
                res.status(200).json(client);
            }
        })
}
exports.createClient = (req,res,next)=>{
    clientRepository.createClient(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.status(500).json(err.details)
            next(err);
        })
}
exports.updateClient = (req,res,next)=>{
    const clientId = req.params.clientId;
    clientRepository.updateClient(clientId,req.body)
        .then(result => {
            res.status(200).json({message: 'Client updated!',client:result});
        })
        .catch(err => {
            console.log(err)
            if(!err.statusCode){
                err.statusCode = 500;
            }
            res.status(500).json(err.details)
            next(err);
        });
};
exports.deleteClient = (req,res,next)=>{
    const clientId = req.params.clientId;
    clientRepository.deleteClient(clientId)
        .then(result => {
            res.status(200).json({message: 'Removed client',client:result});
        })
        .catch(err =>{
            if(!err.statusCode){
                err.statusCode = 500
            }
            next(err)
        })
}