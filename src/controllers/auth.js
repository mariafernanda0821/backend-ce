

//models
const User = require('../models/User');
const Campany = require('../models/Business')
const Role = require('../models/Role');

const { catchError, CODIGO } = require('../../helpers/catchError');

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

        const {name, address, code, numberPhone } = args;

        const towTruckcompany = "towTruckcompany";
        const insuranceCompany = "insuranceCompany";

        const roleId = await Role.findOne({pronoun: towTruckcompany});

        const objectCompany ={
            name: name,
            roleId: [roleId],
            phone: {
                code: code,
                number: numberPhone
            },
            address: [address]
        }

        await new Campany(objectCompany).save();

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