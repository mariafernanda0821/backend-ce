



const auth = () => {
    try {
        
    } catch (error) {
        console.log(error);

        const {code , message} = {code: 401, message: 'Authentication not validated.'};

        return res.status(code).json({
            ok: false,
            message: message
        });

    }
}



module.exports = {
    auth,
}