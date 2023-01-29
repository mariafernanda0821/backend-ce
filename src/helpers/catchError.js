

const CODIGO = {
    NOT_AUTHORIZED: {
        message: 'invalid token',
        extensions: {
            code: 'NOT_AUTHORIZED',
            myCustomExtensions: {
                status: 401,
                message: 'invalid token'
            }
        }
    },
    ERROR: {
        message: 'An unexpected error occurred',
        extensions: {
            code: 'ERROR',
            myCustomExtensions: {
                status: 400,
                message: 'An unexpected error occurred'
            }
        }
    },

    BASE_DATO: {
        message: 'Data required to make the request',
        extensions:{
            code: 'DATA_REQUIRED_DB',
            myCustomExtensions: {
                status: 412,
                message: 'Data required to make the request',
                required: []
            }
        }
    }

}

const catchError = (error) => {
    try {
        
        return(CODIGO["NOT_AUTHORIZED"]);
    


    } catch (error) {

        
        return (CODIGO["NOT_AUTHORIZED"]);

    }
}


module.exports = {
    catchError,
    CODIGO,
}