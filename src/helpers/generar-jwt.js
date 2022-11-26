// const jwt = require('jsonwebtoken');
// const  {SERVER} = require('../config');


// const MESSAGE='ocurrio un error en crear el token'

// const generarJWT = ( uid = '' ) => {

//     return new Promise( async(resolve, reject) => {
//         try {
            
//             const payload = typeof uid === 'string' ? { uid } : uid; // si no es un string, entonces es un objecto
    
//             await jwt.sign( 
//                 payload, 
//                 SERVER.SECRETOR_PRIVATE_KEY, 
//                 {
//                 expiresIn: SERVER.EXPIRES_ID
//             }
//             )
//             resolve( token );

//         } catch (error) {
            
//             console.log(error);
            
//             reject(MESSAGE);   
//         }

//     })
// }




// module.exports = {
//     generarJWT
// }

