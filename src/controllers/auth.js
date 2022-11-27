//models
const User = require('../models/User');
const Business = require('../models/Business')


const signut = async (req, res)=> {
    try {
        const arrayRole = [roleId];

        const newObjectUser = {
            firstName,
            lastName, 
            roleId: arrayRole,
            email,
            profilePhoto,
        };

        const newObjectBusiness = {
            companyName,
            userId,
            type,
            address
        };

        await new User(newObject).save();

        await new Business(newObjectBusiness).save();

        return res.status(201).json({
            ok: false,
            message : "se ha creado exitosamente el usuario"
        });

    } catch (error) {
        console.log(error);
        
        const {code, message}= {code: 412, message:""}

        return res.status(code).json({
            ok: false,
            message
        })
    }
}


const login = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        
        const {code, message}= {code: 412, message:" Se ha presentado un error"}

        return res.status(code).json({
            ok: false,
            message
        })   
    }
}

module.exports = {
    signut,
    login
}