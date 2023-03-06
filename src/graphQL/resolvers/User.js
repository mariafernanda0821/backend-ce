const {
    searchUserApp, 
    AddVehicleUserApp,
    UpdateUserApp,
    UpdateVehicleUserApp,
} = require('../../controllers/app/User');


const UserResolver = {
    
    Query: {
        user: (parent, args, context, info) => searchUserApp(parent, args, context, info),
       // Hello: () => 'hello wordl Maria Fernanda'
    },
    
    Mutation: {
        
        updateUserApp: (parent, args, context, info) => UpdateUserApp(parent, args, context, info),

        addVehicleUserApp: (parent, args, context, info) => AddVehicleUserApp(parent, args, context, info),
    
        updateVehicleUserApp: (parent, args, context, info) => UpdateVehicleUserApp(parent, args, context, info),
    }
};



module.exports = UserResolver;
