const jwt = require('jsonwebtoken');

const { SERVER } = require('../config');
const User = require('../models/User');

const MESSAGE = 'ocurrio un error en crear el token'


const generarJWT = async (data) => {

    const  {id } = data;
    
    return new Promise((resolve, reject) => {
        try {

            const payload = {
                id: id,//id unico de usuario,
            }

            const token = jwt.sign(
                payload,
                SERVER.SECRETOR_PRIVATE_KEY,
                {
                    expiresIn: SERVER.EXPIRES_ID
                }
            );
            const userId = jwt.verify(token, SERVER.SECRETOR_PRIVATE_KEY);
            
            //console.log("contrario ", userId)
            
            resolve({
                token
            });

        } catch (error) {

            console.log(error);

            reject({
                MESSAGE
            });
        }

    })
}

const searchValuejwtUser = async (token) => {

   return new Promise(async (resolve, reject) => {
        try {

            const userId = jwt.verify(token, SERVER.SECRETOR_PRIVATE_KEY);
            
            const searchUser = await User.findById(userId.id);
                        
            if(!searchUser){

                reject({message: "unauthorized user does not exist"})
            
            }

            //return {id: _id}

            resolve({id: searchUser._id.toString()});

            //return(userId);

        } catch (error) {

            console.log("=============>", error);
            reject(error)
            //throw(error);
        }

    });
 
}


module.exports = {
    generarJWT,
    searchValuejwtUser
}

