const User = require('../../models/User');

const { generarJWT, searchValuejwt } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');

const searchUserApp = async (parent, args, context, info) => {
    try {
        
        const token = context.authorization;

        if (!token) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"], extensions);

        }

        const userId = await searchValuejwt(token);

        console.log("userId userId userId",userId.id);
        const [user] = await User.aggregate([
            {
                '$match': {
                    '_id': mongoose.Types.ObjectId(userId),
                    "delete.deleted": false
                }
            }, {
                '$lookup': {
                    'from': 'roles',
                    'localField': 'roleId',
                    'foreignField': '_id',
                    'as': 'roleId'
                }
            }, {
                '$lookup': {
                    'from': 'userapps',
                    'localField': '_id',
                    'foreignField': 'userId',
                    'as': 'userApp'
                }
            }
        ]);

        return (user)

    } catch (error) {
        console.log(error);

        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}

module.exports = {
    searchUserApp
}