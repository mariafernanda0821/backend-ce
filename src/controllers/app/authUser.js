

const loginOrRegistre = async (parent, args, context, info) => {
    console.log({ parent, args, context, info });
    return {
        token: "funciono el token"
    };
}


module.exports = {
    loginOrRegistre,
}