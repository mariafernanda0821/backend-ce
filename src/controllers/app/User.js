const User = require('../../models/User');
const UserApp = require('../../models/UserApp');
const Vehicle = require('../../models/Vihicle');

const { generarJWT, searchValuejwtUser } = require('../../helpers/generar-jwt');

const { catchError, CODIGO } = require('../../helpers/catchError');

const { GraphQLError } = require('graphql');

const mongoose = require('mongoose');


const searchUserApp = async (parent, args, context, info) => {
    try {
        
        const token = context.authorization;

        if (!token) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"].extensions);

        }

        const userId = await searchValuejwtUser(token);
        
        const [user] = await User.aggregate([
            {
              '$match': {
                '_id':mongoose.Types.ObjectId(userId.id), 
                'delete.deleted': false
              }
            }, {
              '$lookup': {
                'from': 'roles', 
                'localField': 'roleId', 
                'foreignField': '_id', 
                'as': 'roleId'
              }
            }, {
              '$lookup': {
                'from': 'userapps', 
                'localField': '_id', 
                'foreignField': 'userId', 
                'as': 'userApp'
              }
            }, {
              '$lookup': {
                'from': 'vehicles', 
                'localField': 'userApp.vehicleId', 
                'foreignField': '_id', 
                'as': 'vehicle'
              }
            }
          ]);

        return (user)

    } catch (error) {
        console.log(error);

        const { message, extensions } = await catchError(error);

        console.log(message, "========",extensions );

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const AddVehicleUserApp = async (parent, args, context, info) => {
    try {
        const {
            make,
            model,
            year,
            colour,
            licencePlate,
        } = args;
        
        //console.log("context context", context);

        const token = context.authorization;

        if (!token) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"].extensions);

        }
        
        const userId = await searchValuejwtUser(token); //return {id: id}
        
        const vehicle = {
            make,
            model,
            year,
            colour,
            licencePlate
        }
        const addVehicle = await new Vehicle(vehicle).save();

        const searchVehicleUserApp = await UserApp.findOne({userId : userId.id});
    
        const arrayVehicle = searchVehicleUserApp?.vehicleId?.concat(addVehicle._id);

        await UserApp.findOneAndUpdate({ userId: userId.id }, {vehicleId: arrayVehicle});

        return{
            ok: true,
            status: 200,
            message: "A new vehicle has been successfully added."
        }

    } catch (error) {

        console.log(error);

        const { message, extensions } = await catchError(error);
        
        console.log(message, "========",extensions );

        throw new GraphQLError(message, {
            extensions
        });
    }
}


const UpdateVehicleUserApp = async (parent, args, context, info) => {
    try {
        const {
            make,
            model,
            year,
            colour,
            licencePlate,
            vehicleId,
        } = args;
        
        const token = context.authorization;

        if (!token) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"].extensions);

        }
        
        const userId = await searchValuejwtUser(token); //return {id: id}

        const vehicle = {
            make,
            model,
            year,
            colour,
            licencePlate
        }
        
        const searchVehicleUserApp = await UserApp.findOne({userId : userId.id,vehicleId:{$in: [vehicleId]} });
    
        if(!searchVehicleUserApp){
            console.log("entre aqui")
            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"].extensions);

        }

        await Vehicle.findByIdAndUpdate(vehicleId, vehicle);

        return{
            ok: true,
            status: 200,
            message: "A new vehicle has been successfully added."
        }

    } catch (error) {

        console.log(error);

        const { message, extensions } = await catchError(error);
        
        console.log(message, "========",extensions );

        throw new GraphQLError(message, {
            extensions
        });
    }
}



const UpdateUserApp = async (parent, args, context, info) => {
    try {
        const {
            firstName,
            lastName, 
            email,
            code,
            numberPhone,
        }= args;

        const token = context.authorization;

        if (!token) {

            throw new GraphQLError(CODIGO["NOT_AUTHORIZED"].message, CODIGO["NOT_AUTHORIZED"].extensions);

        }

        const userId = await searchValuejwtUser(token); //return {id: id}

        const updateUser = {
            firstName,
            lastName, 
            email,
            phone:{
                code,
                number:numberPhone
            },
        }

        await User.findByIdAndUpdate(userId.id, updateUser )

        return{
            status: 200,
            ok: true,
            message: "The user has been perfectly updated"
        }

    } catch (error) {
        console.log(error);

        const { message, extensions } = await catchError(error);

        console.log(message, "========",extensions );

        throw new GraphQLError(message, {
            extensions
        });
    }
}


module.exports = {
    searchUserApp,
    AddVehicleUserApp,
    UpdateUserApp,
    UpdateVehicleUserApp,
}


/* 
const nombreFuncion = async (parent, args, context, info) => {
    try {
        
    } catch (error) {
        console.log(error);

        const { message, extensions } = await catchError(error);

        console.log(message, "========",extensions );

        throw new GraphQLError(message, {
            extensions
        });
    }
}

*/

/* 
  if(vehicleId){

            searchVehecle = searchVehicleUserApp.vehicle.map((item) => {
                if(item._id ==vehicleId){

                    return newtem = {
                        ...item,
                        ...vehicle
                    }
                }
                return item;
            })

        }

*/