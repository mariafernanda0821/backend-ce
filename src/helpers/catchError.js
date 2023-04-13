
const catchError = (error) => {
    try {
        //let message="";
        console.log("catchError ",error);
        
        let required = []
        let message;

        if (error.errors) {

            for (const errs in error.errors) {
                message += `${error.errors[errs].message}.`;
                break;
            }

            return ({
                message: 'Data required to make the request',
                extensions: {
                    code: 'DATA_REQUIRED_DB',
                    myCustomExtensions: {
                        status: 412,
                        ok: false,
                        message: message
                    }
                }
            });
        }

        const arrayMessage = error?.message?.split("-") || [];

        if (arrayMessage[0] === 'ERROR_DATA') {
            return ({
                message: arrayMessage[1] || 'Data required',
                extensions: {
                    code: 'ERROR_DATA',
                    myCustomExtensions: {
                        status: 412,
                        ok: false,
                        message: arrayMessage[1]
                    }
                }
            });
        }

        if (arrayMessage[0] === 'NOT_AUTHORIZED') {
            return ({
                message: 'invalid token',
                extensions: {
                    code: 'NOT_AUTHORIZED',
                    myCustomExtensions: {
                        ok: false,
                        status: 401,
                        message: 'User not authorized, token invalid.'
                    }
                }
            });
        }

        return ({
            message: 'An unexpected error occurred',
            extensions: {
                code: 'ERROR',
                myCustomExtensions: {
                    status: 400,
                    ok: false,
                    message: 'An unexpected error occurred.'
                }
            }
        });


    } catch (error) {

        console.log("error error error", error);

        return ({
            message: 'An unexpected error occurred',
            extensions: {
                code: 'ERROR',
                myCustomExtensions: {
                    status: 400,
                    ok: false,
                    message: 'An unexpected error occurred'
                }
            }
        });

    }
}


module.exports = {
    catchError,
}