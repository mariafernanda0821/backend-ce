

//const { skip } = require('graphql-resolvers');

// export const isAuthenticated = (parent, args, { me }) =>
//   me ? skip : new Error('Not authenticated as user.');

const isAuthenticated = ({ parent, args, context, info }, next)  => {
    try {
        
        console.log({ parent, args, context, info });

    } catch (error) {
        console.log(error);

        const {code , message} = {code: 401, message: 'Authentication not validated.'};

        return res.status(code).json({
            ok: false,
            message: message
        });

    }
}



module.exports = isAuthenticated;