const { SERVER } = require('../../config');

const { Magic } = require('@magic-sdk/admin');


const { GraphQLError } = require('graphql');

const { generarJWT } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

//modles
const User = require('../../models/User');
const Role = require('../../models/Role');


const mAdmin = new Magic(SERVER.MAGIC_SDK_SECRET_API_KEY);

/* 
issuer (String): The Decentralized ID of the user. We recommend this value to be used as the user ID in your own tables.
publicAddress(String): The authenticated user's public address (a.k.a.: public key). Currently, this value is associated with the Ethereum blockchain.
email (String | null): Email address of the authenticated user.
oauthProvider (String | null): OAuth of the authenticated user.
phoneNumber (String | null): Phone number of the authenticated user.

*/


const MagicLinkLogin = async (parent, args, context, info) => {
    try {
        
        const tokenMagicSdk = context.authorization;
        
        //console.log(tokenMagicSdk);
        
        if(!tokenMagicSdk){

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"],extensions);
        
        }
        //const issuer01 = mAdmin.token.getIssuer(tokenMagicSdk);

        //console.log("issuer01 issuer01", issuer01);
        
        //const DIDToken = context.authorization.substring(7);

        //const publicAddress01 = mAdmin.token.getPublicAddress(DIDToken);

        //console.log("issuer01 issuer01", publicAddress01);

        const userPublicAddress = mAdmin.token.getPublicAddress(tokenMagicSdk);

        console.log("userPublicAddress", userPublicAddress);
        
        const metadata = await mAdmin.users.getMetadataByPublicAddress(userPublicAddress);

        const { issuer, publicAddress, email, phoneNumber } = metadata;

        const searchUser = User.findOne({email:email });

        if(searchUser){

            const { token } = await generarJWT({ id: searchUser._id.toString()});

            return{
                ok: true,
                token,
                message: "You have perfectly started the session."
            }
        }

        const searchRole = Role.findOne({pronoun:"appUser"});

        const registerUser = await new User({
            email: email,
            phone:{
                code: "+57",
                number: phoneNumber
            },
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
    MagicLinkLogin,
}