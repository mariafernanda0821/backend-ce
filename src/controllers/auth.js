

//models
const User = require('../models/User');
const Business = require('../models/Business')


const signut = async (req, res)=> {
    try {
        

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
        
        const {code, message}= {code: 400, message:"User has not been successfully created."}

        return res.status(code).json({
            ok: false,
            message,
            error
        })
    }
}


const login = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
        
        const {code, message}= {code: 400, message:"Session startup failed"}

        return res.status(code).json({
            ok: false,
            message,
            error,
        }); 
    }
}

module.exports = {
    signut,
    login
}