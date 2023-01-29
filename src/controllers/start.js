
const Role = require('../models/Role');
const PaymentMethod = require('../models/PaymentMethod');

const dataRoles = require('../../data/roles.json');
const dataPaymentMethods = require('../../data/paymentMethods.json');

/* 
load database, with default data
*/
const loadDataBase = async (req, res) => {
    try {

        const saveRoles = () => {
            return Promise.all(dataRoles.map(async (key) => {
                try {
                    const searchRole = await Role.findOne({
                        name: key.name,
                    });

                    if (searchRole) {
                        await Role.findByIdAndUpdate(searchRole._id, {
                            name: key.name,
                            pronoun: key.pronoun,
                            description: key.description
                        });

                        return true;
                    }

                    await new Role({
                        name: key.name,
                        pronoun: key.pronoun,
                        description: key.description
                    }).save();

                    return true;

                } catch (error) {
                    console.log(error);
                    return false
                }

            }))
        }

        const savePaymetMethods = () => {

            return Promise.all(
                Object.keys(dataPaymentMethods).map(async (key) => {
                    try {
                        const searchPayment = await PaymentMethod.findOne({
                            name: dataPaymentMethods[key].name
                        });

                        if (searchPayment) {
                            await PaymentMethod.findByIdAndUpdate(searchPayment._id, {
                                name: dataPaymentMethods[key].name,
                                description: dataPaymentMethods[key].description
                            });

                            return true;
                        }

                        await new PaymentMethod({
                            name: dataPaymentMethods[key].name,
                            description: dataPaymentMethods[key].description
                        }).save();

                        return true;

                    } catch (error) {
                        console.log(error);
                        return false;
                    }

                })
            );
        }

        const [role, paymentMethods] = await Promise.all([saveRoles(), savePaymetMethods()]);

        if(role.includes(false) || paymentMethods.includes(false)){

            return res.status(400).json({
                ok: true,
                message: 'Cargar nuevamente ocurrio un error a carga la base de datos',
            });
        }

        return res.status(300).json({
            ok: true,
            message: 'Se cargo perfectamente Role en la Base de Datos'
        });
        

    } catch (error) {

        console.log(error);

        //const { code, message } = { code: 412, message: "Cargar nuevamente la base de datos" }

        return res.status(400).json({
            ok: true,
            message: 'Cargar nuevamente ocurrio un error a carga la base de datos',
        });

    }
}


module.exports = {
    loadDataBase
}