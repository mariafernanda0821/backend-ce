const { SERVER } = require('../../config');

const { Magic } = require('@magic-sdk/admin');

const { Claim } = require('@magic-sdk/admin');

const { GraphQLError } = require('graphql');

const { generarJWT } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

//modles
const User = require('../../models/User');
const Role = require('../../models/Role');
const UserApp = require('../../models/UserApp')


const mAdmin = new Magic(SERVER.MAGIC_SECRET_KEY);

/* 
issuer (String): The Decentralized ID of the user. We recommend this value to be used as the user ID in your own tables.
publicAddress(String): The authenticated user's public address (a.k.a.: public key). Currently, this value is associated with the Ethereum blockchain.
email (String | null): Email address of the authenticated user.
oauthProvider (String | null): OAuth of the authenticated user.
phoneNumber (String | null): Phone number of the authenticated user.

*/

const SignutUserApp = async (parent, args, context, info) => {
    let saveUser;
    try {
     
        const {
            firstName,
            lastName,
            email,
            code,
            phone,
        } = args;

        const roleId = await Role.findOne({ pronoun: "appUser" });
        
        const newObjectUser = {
            firstName,
            lastName,
            email,
            roleId: [roleId._id],
            phone: {
                code: code,
                number: phone
            }
        };

        const saveUser = await new User(newObjectUser).save();

        await new UserApp({
            userId: saveUser._id
        }).save(); 

        return ({
            ok: true,
            message: "The user has been created perfectly."
        });

    } catch (error) {
        
        console.log(error);

        if (saveUser && saveUser._id) {

            await User.deleteOne({ _id: saveUser._id });

        }

        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const MagicLinkLogin = async (parent, args, context, info) => {
    try {

        const tokenMagicSdk = context.authorization;

        if (!tokenMagicSdk) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"].extensions);

        }
    
        const searchIssuer = mAdmin.token.getIssuer(tokenMagicSdk);
    
        const metadata = await mAdmin.users.getMetadataByIssuer(searchIssuer);
        
        //console.log("claim ======> metadata ", metadata);

        const { issuer, publicAddress, email} = metadata;

        const searchUser = await User.findOne({ email: email });

        if (searchUser) {

            const { token } = await generarJWT({ id: searchUser._id.toString()});

            return {
                ok: true,
                token,
                message: "You have perfectly started the session."
            }

        }

        throw new GraphQLError(CODIGO["USERNOTREGISTER"].message, CODIGO["USERNOTREGISTER"].extensions);
        

    } catch (error) {

        console.log(error);

        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


module.exports = {
    MagicLinkLogin,
    SignutUserApp,
}