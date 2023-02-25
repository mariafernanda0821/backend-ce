const User = require('../models/User');

const isAdmin = async (email) => {
    try {
        const [admin] = await User.aggregate([
            {
                '$match': {
                    'email': email
                }
            }, {
                '$lookup': {
                    'from': 'roles',
                    'localField': 'roleId',
                    'foreignField': '_id',
                    'as': 'roleId'
                }
            }
        ]);
        if(admin){
            
            let roleCatch = admin.roleId.filter(role => role?.pronoun !== 'appUser' && role?.pronoun !== 'appDriver');
    
            if (roleCatch.length) {
                return (true);
            }

        }
        
        throw Error("ERROR_DATA-Unauthorized user");

    } catch (error) {
        
        console.log(error);
        
        throw new Error("ERROR_DATA-Unauthorized user")
    }

};


module.exports = {
    isAdmin,
}