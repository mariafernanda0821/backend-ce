const { SERVER } = require('../../config');

const { Magic } = require('@magic-sdk/admin');

const mAdmin = new Magic(SERVER.MAGIC_SDK_SECRET_API_KEY);

const { GraphQLError } = require('graphql');

const { generarJWT } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

//modles
const User = require('../../models/User');
const Role = require('../../models/Role');


/* 
issuer (String): The Decentralized ID of the user. We recommend this value to be used as the user ID in your own tables.
publicAddress(String): The authenticated user's public address (a.k.a.: public key). Currently, this value is associated with the Ethereum blockchain.
email (String | null): Email address of the authenticated user.
oauthProvider (String | null): OAuth of the authenticated user.
phoneNumber (String | null): Phone number of the authenticated user.

*/


const loginOrRegistreUserApp = async (parent, args, context, info) => {
    try {

        const tokenMagicSdk = context.authorization;
        
        if(!tokenMagicSdk){

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"],extensions);
        
        }

        const userPublicAddress = mAdmin.token.getPublicAddress(tokenMagicSdk);

        const metadata = await mAdmin.users.getMetadataByPublicAddress(userPublicAddress);

        const { issuer, publicAddress, email, phoneNumber } = metadata;

        const searchUser = User.findOne({email:email });

        if(searchUser){

            const { token } = await generarJWT({ id: searchUser._id});

            return{
                ok: true,
                token,
                message: "You have perfectly started the session."
            }
        }

        const searchRole = Role.findOne({pronoun:"appUser"});

        const registerUser = await User({
            email: email,
            phone: phoneNumber,
            role: [searchRole],
            magicLink:{
                issuer,
                publicAddress
            }
        }).save();
        
        const { token } = await generarJWT({ id: registerUser._id});

            return{
                ok: true,
                token,
                message: "You have successfully registered and logged in"            
            }
    
    } catch (error) {

        console.log(error);

        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message,{
            extensions
        });

    }
}


module.exports = {
    loginOrRegistreUserApp,
}