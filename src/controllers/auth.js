const { SERVER } = require('../config');

const { GraphQLError } = require('graphql');

const { generarJWT } = require('../helpers/generar-jwt');

const { catchError} = require('../helpers/catchError');

const { v4: uuidv4 } = require('uuid');

const bcrypt = require('bcryptjs');

//modles
//const User = require('../models/User');
const User = require('../models/User');
const Administrador = require('../models/Administrador');


const Registrar = async (parent, args, context, info) => {
 
    try {

        const {
            nombre,
            apellido, 
            password, 
            email,
        } = args;

        const searchUser = await User.findOne({ email: email });

        if (searchUser) {

            throw new Error("ERROR_DATA-Correo electronico ya registrado.");

        }

        const salt = bcrypt.genSaltSync(10);

        hash = bcrypt.hashSync(password, salt);
        
        const newObjectUser = {
            nombre,
            apellido, 
            password:hash, 
            email,
        };

        await new User(newObjectUser).save();
       
        return ({
            ok: true,

            status: 200,

            message: "Se ha registrado perfectamente.",

        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const Login = async (parent, args, context, info) => {
    try {

        const { email, password } = args;

        const searchUser = await User.findOne({ email: email });

        if (!searchUser) {
            return {
                ok: true,
                token: null,
                register: false,
                message: "Usuario no registrado."
            }
        }

        const comparePassword = searchUser?.password ? await bcrypt.compare(password, searchUser.password) : false;

        if (!comparePassword) throw new Error("ERROR_DATA-Contrasena incorrecta");

        const { token } = await generarJWT({ id: searchUser._id.toString() });

        return {
            ok: true,
            token,
            status: 200,
            register: true,
            message: "Se ha inicia session perfectamente."
        }


    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const RegistrarAdmin = async (parent, args, context, info) => {
 
    try {

        const {
            nombre,
            apellido, 
            password, 
            email,
        } = args;

        const searchUser = await User.findOne({ email: email });

        if (searchUser) throw new Error("ERROR_DATA-Correo electronico ya registrado.");

    
        const salt = bcrypt.genSaltSync(10);

        hash = bcrypt.hashSync(password, salt);
        
        const newObjectUser = {
            nombre,
            apellido, 
            password:hash, 
            email,
        };

        await new User(newObjectUser).save();

        const uuid = uuidv4().substr(0,6);
        
        await new Administrador({
            credenciales: uuid
        }).save();
        
        return ({
            ok: true,

            status: 200,

            message: "Se ha registrado perfectamente.",

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
    Registrar,
    Login,
    RegistrarAdmin,
}