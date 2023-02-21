const { SERVER } = require('../../config');

const { Magic } = require('@magic-sdk/admin');

const { GraphQLError } = require('graphql');

const { generarJWT } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

const bcrypt = require('bcryptjs')

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
    let hash = "";
    try {

        const {
            firstName,
            lastName,
            email,
            code,
            phone,
            password,
        } = args;


        if (password) {

            const salt = bcrypt.genSaltSync(10);

            hash = bcrypt.hashSync(password, salt);

            console.log("hash hast", hash);
        }

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

        if (hash) {
            console.log("entre al if de hash");

            newObjectUser.password = hash;

        }

        const saveUser = await new User(newObjectUser).save();

        await new UserApp({

            userId: saveUser._id

        }).save();

        return ({
            ok: true,

            message: "The user has been created perfectly.",

            user: password ? "notMagicLink" : "magicLink",

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


const LoginUser = async (parent, args, context, info) => {
    try {

        const { email, password } = args;

        const searchUser = await User.findOne({ email: email });

        if (!searchUser) {
            return {
                ok: true,
                token: null,
                register: false,
                message: "user not registered."
            }
        }

        const comparePassword = await bcrypt.compare(password, searchUser.password);


        if (!comparePassword) {

            throw new GraphQLError("Incorrect password", {

                code: 'ERROR_DATA',
                myCustomExtensions: {
                    ok: false,
                    status: 412,
                    message: 'Incorrect password.'
                }

            });
        }

        const { token } = await generarJWT({ id: searchUser._id.toString() });

        return {
            ok: true,
            token,
            register: true,
            message: "You have perfectly started the session."
        }


    } catch (error) {

        console.log(error);

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

        console.log("metadata ======> metadata ", metadata);

        const { issuer, publicAddress, email } = metadata;

        const searchUser = await User.findOne({ email: email });

        if (searchUser) {

            const { token } = await generarJWT({ id: searchUser._id.toString() });

            const magicLink = {
                issuer: issuer,
                publicAddress: publicAddress
            };

            await User.findOneAndUpdate({ email: email }, { magicLink: magicLink });

            return {
                ok: true,
                token,
                register: true,
                message: "You have perfectly started the session."
            }

        }

        return {
            ok: true,
            token: null,
            register: false,
            message: "user not registered."
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
    LoginUser,
}