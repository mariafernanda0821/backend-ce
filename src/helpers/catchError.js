



const CODIGO = {
    NOT_AUTHORIZED:{
        code: 401,
        codeMessage:  'NOT_AUTHORIZED',
        message: 'invalid token'  
    },


}
const catchError = (error) => {
    try {
        
        
        
        const message= error.message || "motivo del error ";
        
        const extensions={
            code: 'NOT_AUTHORIZED' ,
            myCustomExtensions:{
                message:"motivo del error myCustomExtensions"
            }
        }

        return ({
            message,
            extensions
        });

    } catch (error) {
        const message="motivo del error ";
        
        const extensions={
            code: "codigo en mayuscula",
            myCustomExtensions:{

            }
        }
        
        return ({
            message,
            extensions
        });
        
    }
}


module.exports = {
    catchError 
}