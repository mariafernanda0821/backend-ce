const {GraphQLError}=  require('graphql');

const {generarJWT} = require('../../helpers/generar-jwt');

const {catchError} = require('../../helpers/catchError');



const loginOrRegistreUserApp = async (parent, args, context, info) => {
    try {
        //console.log({  context });
        
        //console.log(context, "expressMiddleware(apolloServer,")
        const { token } = await generarJWT({id:"1234", uid:"1234"});

        console.log("token token",token)
        
        return {
            token: token,
            message: "exitosa la operacion"
        };
        
    } catch (error) {

        console.log(error);
        
        const { message, extensions} = await catchError(error);

        throw new GraphQLError(message, { 
            extensions
        });
 
    }
}


module.exports = {
    loginOrRegistreUserApp,
}