const User = require('../../models/User');

const { generarJWT, searchValuejwt } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');


const searchUser = async () => {
    try {
        const token =  context.authorization;
        if (!token) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"], extensions);

        }

        const userId = searchValuejwt(token);

        const user = await User.aggregate()

        return({
            "firstName":"maria",
            "lastName":"maria", 
            "email":"maria",
            "code":"maria",
            "phone":"maria"
        })

    } catch (error) {
        console.log(error);
    
        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message,{
            extensions
        });

    }
}