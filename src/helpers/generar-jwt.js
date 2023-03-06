const jwt = require('jsonwebtoken');

const { SERVER } = require('../config');
const User = require('../models/User');

const MESSAGE = 'ocurrio un error en crear el token'


const generarJWT = async (data) => {

    const { id } = data;

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
            
            resolve({
                token
            });

        } catch (error) {

            console.log(error);

            reject('NOT_AUTHORIZED-User not authorized, token invalid.');
        }

    })
}

const searchValuejwtUser = async (token) => {

    return new Promise(async (resolve, reject) => {
        try {

            const userId = jwt.verify(token, SERVER.SECRETOR_PRIVATE_KEY);

            const searchUser = await User.findById(userId.id);

            if (!searchUser) {
                
                reject(new Error('NOT_AUTHORIZED-User not authorized, User does not exist.'));

            }

            resolve({ id: searchUser._id.toString() });

        } catch (error) {

            reject(new Error('NOT_AUTHORIZED-User not authorized, User does not exist.'));
        }

    });

}


module.exports = {
    generarJWT,
    searchValuejwtUser
}

