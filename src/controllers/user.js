//const { SERVER } = require('../config');
const User = require('../models/User');

const {searchValuejwtUser} = require('../helpers/generar-jwt');

const { GraphQLError } = require('graphql');

const { catchError} = require('../helpers/catchError');


const User = async (parent, args, context, info) => {
    try {

        const token = context?.authorization;

        const userId = await searchValuejwtUser(token);

        const user = await User.findById(userId?.id);
        
        return {
            ok: true,
            user: user,
        }

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const UserApp = async (parent, args, context, info) => {
    try {

        const token = context?.authorization;

        const userId = await searchValuejwtUser(token);

        const users = await User.find({role: 'userApp'});
        
        return {
            usuarios: users,
        }

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}

module.exports = {
    User,
    UserApp
}