const { SERVER } = require('../../config');
const { Magic } = require('@magic-sdk/admin');
const { GraphQLError } = require('graphql');

//models
const User = require('../../models/User');
const Campany = require('../../models/Company');
const Role = require('../../models/Role');
const UserAdmin = require('../../models/UserAdmin');
//herpers
const { generarJWT } = require('../../helpers/generar-jwt');
const { catchError, CODIGO } = require('../../helpers/catchError');
const {isAdmin} = require('../../helpers/isAdmin');
const bcrypt = require('bcryptjs');


const mAdmin = new Magic(SERVER.MAGIC_SECRET_KEY);


const signutAdminCampany = async (parent, args, context, info) => {
    let hash=null;
    try {

        const {
            firstName,
            lastName,
            email,
            code,
            numberPhone,
            password,
            campanyId,
        } = args;

        const campany = await Campany.findById(campanyId);

        //const searchRole = campany.roleId[0];
        if (password) {

            const salt = bcrypt.genSaltSync(10);

            hash = bcrypt.hashSync(password, salt);

        }

        const newObjectUser = {
            firstName,
            lastName,
            email,
            //role: [searchRole],
            phone: {
                code: code || "+000",
                number: numberPhone
            },
            password: hash,
        };

        const user = await new User(newObjectUser).save();
        
        await UserAdmin({
            campanyId: campany._id,
            userId: user._id,
        }).save();

        return ({
            status: 200,
            ok: true,
            message: "Se ha creado el usuario perfectamente."
        });

    } catch (error) {
        console.log(error);

        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}

// const towTruckCompany = "towTruckCompany";
// const insuranceCompany = "insuranceCompany";
const signutCompany = async (parent, args, context, info) => {
    let user, company, hash="";
    try {

        const { 
            firstName, lastName, email, numberPhoneUser,codeUser,
            nameCampany, code, numberPhone, typeCompany, postCode, 
            address01, city, state, address02, password
        } = args;

        const roleId = await Role.findOne({ pronoun: typeCompany });

        const objectCompany = {
            name: nameCampany,
            roleId: [roleId],
            phone: [{
                code: code || '+00',
                number: numberPhone
            }],

            address: [{
                postCode,
                address01,
                address02: address02 || "",
                city,
                state,

            }]
        }

        company = await new Campany(objectCompany).save();
        
        if (password) {

            const salt = bcrypt.genSaltSync(10);

            hash = bcrypt.hashSync(password, salt);

        }
        const objectUser = {
            firstName,
            lastName,
            email,
            password: hash || null,
            roleId: [roleId._id],
            phone: {
                code: codeUser || "+00",
                number: numberPhoneUser
            },
        }

        user = await new User(objectUser).save();

        await UserAdmin({
            campanyId: company._id,
            userId: user._id,
            owner: true,
        }).save();

        return ({
            status: 200,
            ok: true,
            message: "Se ha creado el usuario perfectamente."
        });

    } catch (error) {

        console.log(error);

        if (user && user._id) {

            await User.deleteOne({ _id: user._id });

        }

        if (company && company._id) {

            await Campany.deleteOne({ _id: company._id });

        }
        
        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message, {
            extensions
        });
    }
}


const signutAdmin = async (parent, args, context, info) => {
    try {

        const {
            firstName,
            lastName,
            email,
            code,
            numberPhone,
        } = args;

        const roleId = await Role.findOne({ pronoun: "appAdmin" });

        const newObjectUser = {
            firstName,
            lastName,
            email,
            role: [roleId],
            phone: {
                code: code || "+000",
                number: numberPhone
            }
        };

        const user = await new User(newObjectUser).save();

        const campany = await Campany.findOne();

        await new UserAdmin({
            userId: user._id,
            campanyId: campany._id
        }).save();

        return ({
            ok: true,
            status: 200,
            message: "Se ha creado el usuario perfectamente."
        });

    } catch (error) {
        console.log(error);

        const { message, extensions } = await catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const LoginUserAdmin = async (parent, args, context, info) => {
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

        await isAdmin(email);

        const comparePassword =searchUser?.password ?  await bcrypt.compare(password, searchUser?.password) : false;

        if (!comparePassword) {

            throw new Error("ERROR_DATA-Incorrect password.");
         
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

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const MagicLinkLoginAdmin = async (parent, args, context, info) => {
    try {

        const tokenMagicSdk = context.authorization;

        if (!tokenMagicSdk) {

            throw new Error("NOT_AUTHORIZED-User not authorized, token invalid.")
            
        }

        await isAdmin(email);

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
    signutAdminCampany,
    signutCompany,
    signutAdmin,
    MagicLinkLoginAdmin,
    LoginUserAdmin,
}