const { SERVER } = require('../../config');

const { Magic } = require('@magic-sdk/admin');

const { GraphQLError } = require('graphql');

const { generarJWT } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

const { sendEmail } = require('../../helpers/sendEmail');


const bcrypt = require('bcryptjs');

//modles
const User = require('../../models/User');
const Role = require('../../models/Role');
const UserApp = require('../../models/UserApp');
const Authorization = require('../../models/Authorization');


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

        const searchUser = await User.findOne({ email: email });

        if (searchUser) {

            throw new Error("ERROR_DATA-The email is already registered.");

        }

        if (password) {

            const salt = bcrypt.genSaltSync(10);

            hash = bcrypt.hashSync(password, salt);

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

            newObjectUser.password = hash;

        }

        const saveUser = await new User(newObjectUser).save();

        await new UserApp({

            userId: saveUser._id

        }).save();

        return ({
            ok: true,

            status: 200,

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

        const comparePassword = searchUser?.password ? await bcrypt.compare(password, searchUser.password) : false;

        if (!comparePassword) {

            throw new Error("ERROR_DATA-Incorrect password.");

        }

        const { token } = await generarJWT({ id: searchUser._id.toString() });

        return {
            ok: true,
            token,
            status: 200,
            register: true,
            message: "You have perfectly started the session."
        }


    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const MagicLinkLogin = async (parent, args, context, info) => {
    try {

        const tokenMagicSdk = context.authorization;

        if (!tokenMagicSdk) {

            throw new Error("NOT_AUTHORIZED-User not authorized, token invalid.");

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
            status: 200,
            ok: true,
            token: null,
            register: false,
            message: "user not registered."
        }


    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}

const ForgotPassword = async (parent, args, context, info) => {
    let createdCode;
    try {
        const { email } = args;

        const user = await User.findOne({ email: email });

        if (!user) {

            throw new Error("ERROR_DATA-User not registered");
        }

        //sendEmail data={message, code}
        const code = "4512"; //Math.floor(1000 + Math.random() * 9000);

        createdCode = await Authorization({
            userId: user._id,
            code: code
        }).save();

        const data = {
            message: "The code to recover your account is as follows.",
            code: code
        }

        const subject = "Forgot Password";

        //const answerEmail = await sendEmail(data, user?.email, subject, 'forgotPassword');

        const answerEmail = "The email has been sent perfectly."

        return {
            status: 200,
            ok: true,
            message: answerEmail
        }

    } catch (error) {
        
        console.log(error);

        if(createdCode?._id) await Authorization.findByIdAndDelete(createdCode._id);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const ChangePasswordByCode = async (parent, args, context, info) => {
    try {
        const { code, email, password } = args;

        const user = await User.findOne({ email: email });

        if (!user) {

            throw new Error("ERROR_DATA-User not registered.");
        }

        //sendEmail data={message, code}
        const searchCode = await Authorization.findOne({
            userId: user._id,
            code: code
        });

        if(!searchCode){

            throw new Error("ERROR_DATA-The supplied code is incorrect, please verify");
        
        }
        
        const salt = bcrypt.genSaltSync(10);

        const hash = bcrypt.hashSync(password, salt);

        user.password = hash;

        user.save();

        await Authorization.findByIdAndDelete(searchCode._id);

        return( { 
            status: 200,
            ok: true,
            message: "Password has been perfectly changed."
        });

    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}



module.exports = {
    MagicLinkLogin,
    SignutUserApp,
    LoginUser,
    ForgotPassword,
    ChangePasswordByCode,
}