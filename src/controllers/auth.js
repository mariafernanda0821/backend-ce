

//models
const User = require('../models/User');
const Campany = require('../models/Company');
const Role = require('../models/Role');
const { generarJWT } = require('../helpers/generar-jwt');


const { catchError, CODIGO } = require('../helpers/catchError');

//helper



const signut = async (parent, args, context, info) => {
    try {

        const {
            firstName,
            lastName, 
            email,
            code,
            numberPhone,
        } = args;
        
        const roleId = await Role.findOne({pronoun: "towTruckAgencyAdmin"});

        const newObjectUser = {
            firstName,
            lastName,
            email,
            role: [roleId],
            phone:{
                code: code || "+000",
                number: numberPhone
            }
        };
        
        await new User(newObjectUser).save();

        return({
            status: 200,
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


const signutCompany = async(parent, args, context, info) => {
    try {

        const {firstName, lastName, email, numberPhoneUser,
            
            nameCampany, code, numberPhone,typeCampany, postCode, address01, city, state, ref, address02
         } = args;

        const towTruckcompany = "towTruckCompany";
        const insuranceCompany = "insuranceCompany";

        const roleId = await Role.findOne({pronoun: typeCampany});
        
        const roleUser = await Role.findOne({pronoun: "towTruckAgencyAdmin"});
        
        const objectUser = {
            firstName,
            lastName,
            email,
            numberPhoneUser,
            roleId: [roleUser._id],
            phone:{
                number:numberPhoneUser
            }
        }

        const createdUser = await new User(objectUser).save();
        
        const objectCompany ={
            name: nameCampany,
            userOwnerId:createdUser._id,
            roleId: [roleId],
            phone: {
                code: code,
                number: numberPhone
            },
            address: [{
                postCode, 
                address01,
                address02: address02 || "" , 
                city, 
                state, 
        
            }]
        }
        
        await new Campany(objectCompany).save();

        return({
            status: 200,
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


const signutAdmin = async (parent, args, context, info) => {
    try {

        const {
            firstName,
            lastName, 
            email,
            code,
            numberPhone,
        } = args;
        
        const roleId = await Role.findOne({pronoun: "appAdmin"});

        const newObjectUser = {
            firstName,
            lastName,
            email,
            role: [roleId],
            phone:{
                code: code || "+000",
                number: numberPhone
            }
        };
        
        await new User(newObjectUser).save();

        return({
            ok: true,
            status: 200,
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

module.exports = {
    signut,
    signutCompany,
    signutAdmin,
}