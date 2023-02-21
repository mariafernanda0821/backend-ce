

const CODIGO = {
    NOT_AUTHORIZED: {
        message: 'invalid token',
        extensions: {
            code: 'NOT_AUTHORIZED',
            myCustomExtensions: {
                ok:false,
                status: 401,
                message: 'user not authorized, token invalid'
            }
        }
    },
    ERROR: {
        message: 'An unexpected error occurred',
        extensions: {
            code: 'ERROR',
            myCustomExtensions: {
                status: 400,
                ok:false,
                message: 'An unexpected error occurred'
            }
        }
    },

    BASE_DATO: {
        message: 'Data required to make the request',
        extensions:{
            code: 'ERROR_DATA',
            myCustomExtensions: {
                ok: false,
                status: 412,
                message: 'Data required to make the request',
                required: []
            }
        }
    },
    USERNOTREGISTER: {
        message: 'the user is not registered',
        extensions: {
            code: 'ERROR',
            myCustomExtensions: {
                status: 412,
                message: 'the user is not registered',
                required: []
            }
        }
    },

}

const catchError = (error) => {
    try {
        //let message="";
        let required= []

        if(error.errors){
            for (const errs in error.errors) {
                        
                required = required.concat(`${error.errors[errs].message}`) ; 
                message += `${error.errors[errs].message}, `
            }
            return( {
                message: 'Data required to make the request',
                extensions:{
                    code: 'DATA_REQUIRED_DB',
                    myCustomExtensions: {
                        status: 412,
                        ok: false,
                        message: message ,//'Data required to make the request',
                        required: required,
                    }
                }
            });
        }

        if (typeof(error.message === 'string')){
            return({
                message: error?.message ||'An unexpected error occurred',
                extensions: {
                    code: 'ERROR',
                    myCustomExtensions: {
                        status: 412,
                        ok: false,
                        message: error?.message 
                    }
                }
            });
        }

        return({
            message: 'An unexpected error occurred',
            extensions: {
                code: 'ERROR',
                myCustomExtensions: {
                    status: 400,
                    message: 'An unexpected error occurred'
                }
            }
        });


    } catch (error) {

        console.log("error error error", error)
        return (CODIGO["NOT_AUTHORIZED"]);

    }
}


module.exports = {
    catchError,
    CODIGO,
}