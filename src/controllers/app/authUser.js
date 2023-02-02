const { SERVER } = require('../../config');

const { Magic } = require('@magic-sdk/admin');

const { Claim } = require('@magic-sdk/admin');

const { GraphQLError } = require('graphql');

const { generarJWT } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

//modles
const User = require('../../models/User');
const Role = require('../../models/Role');
//https://magic.link/posts/magic-link-nodejs

const mAdmin = new Magic(SERVER.MAGIC_SDK_SECRET_API_KEY);

const tokenMagic = new Magic(SERVER.MAGIC_SDK_PUBLISHABLE_API_KEY, { email: "mariafernanda@gmail.com" });

//const token=
console.log(mAdmin.token);
console.log(mAdmin.token.getIssuer);
console.log(mAdmin.token.getPublicAddress);
console.log(mAdmin.token.decode);
console.log(mAdmin.token.validate);
/* 
issuer (String): The Decentralized ID of the user. We recommend this value to be used as the user ID in your own tables.
publicAddress(String): The authenticated user's public address (a.k.a.: public key). Currently, this value is associated with the Ethereum blockchain.
email (String | null): Email address of the authenticated user.
oauthProvider (String | null): OAuth of the authenticated user.
phoneNumber (String | null): Phone number of the authenticated user.

*/

const SignutUserApp = async (parent, args, context, info) => {
    try {

        const {
            firstName,
            lastName, 
            email,
            code,
            phone,
        } = args;
        
        const roleId = await Role.findOne({pronoun: "appUser"});

        const newObjectUser = {
            firstName,
            lastName,
            email,
            role: [roleId],
            phone:{
                code: code ,
                number: phone
            }
        };
        
        await new User(newObjectUser).save();

        return({
            ok: true,
            message: "Se ha creado el usuario perfectamente."
        });

    } catch (error) {
        console.log(error);
    
        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message,{
            extensions
        });

    }
}


const MagicLinkLogin = async (parent, args, context, info) => {
    try {

        const tokenMagicSdk = context.authorization;

        if (!tokenMagicSdk) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"], extensions);

        }
        //const DIDToken = tokenMagicSdk.substring(7);
        const [proof, claim] = mAdmin.token.decode(tokenMagicSdk);
        console.log("claim ======>", claim);

        console.log("validate", mAdmin.token.validate(tokenMagicSdk));

        // Grabs the issuer from a DID Token
        const issuerMagic = mAdmin.token.getIssuer(tokenMagicSdk);

        // Gets user metadata based on the given issuer
        const metadata = await mAdmin.users.getMetadataByIssuer(issuerMagic);

        //const metadata = await mAdmin.users.getMetadataByPublicAddress(userPublicAddress);

        const { issuer, publicAddress, email, phoneNumber } = metadata;

        const searchUser = User.findOne({ email: email });

        if (searchUser) {

            const { token } = await generarJWT({ id: searchUser._id.toString() });

            return {
                ok: true,
                token,
                message: "You have perfectly started the session."
            }
        }

        const searchRole = Role.findOne({ pronoun: "appUser" });

        const registerUser = await new User({
            firstName: "xxxxx",
            lasttName: "xxxxx",
            email: email,
            phone: {
                code: "+57",
                number: phoneNumber
            },
            role: [searchRole],
            magicLink: {
                issuer,
                publicAddress
            }
        }).save();

        const { token } = await generarJWT({ id: registerUser._id });

        return {
            ok: true,
            token: "token_nue",
            message: "You have successfully registered and logged in"
        }

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