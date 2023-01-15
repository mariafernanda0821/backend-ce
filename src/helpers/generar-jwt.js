const jwt = require('jsonwebtoken');

const { SERVER } = require('../config');


const MESSAGE='ocurrio un error en crear el token'


const generarJWT = async({id, uid}) => {

    return new Promise((resolve, reject) => {
        try {
            
            const payload = {
                id: id ,//id unico de usuario,
                //uid: uid ,//"id unicio del usuario"
            }
            
            const token = jwt.sign( 
                payload, 
                SERVER.SECRETOR_PRIVATE_KEY, 
                {
                expiresIn: SERVER.EXPIRES_ID
            }
            )

            resolve({
                token
            } );

        } catch (error) {
            
            console.log(error);
            
            reject({
                MESSAGE
            });   
        }

    })
}




module.exports = {
    generarJWT
}

