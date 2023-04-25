const InventarioRegistro = require('../models/InventarioRegistro');
const InventarioProductos = require('../models/InventarioProductos');
const Administrador = require('../models/Administrador');
const invetarioJson = require('../../data/inventario.json');
const productosJson = require('../../data/productos.json');
const Producto = require('../models/Productos');

const { v4: uuidv4 } = require('uuid');

const AgregarProductos = async (parent, args, context, info) =>{
    try {
    
        await Promise.all(productosJson.map(async item =>{
            try {
                [1,2,3,4,5,6,7,8,9,10].map( async item => {
                    await new Producto({
                        codigo: `${item?.codigo}#0${item}`,
                        
                        tipo:item?.tipo,
                        
                        categoria: categoria,
                        
                        nombre: `${item?.name}#0${item}`,
    
                        descripcion: item.descripcion,

                        imagen: `${item?.imagen}#0${item}`
                    }).save();

                })

            } catch (error) {
                throw new Error("ERROR_DATA-Ocurrio un error en agregar inventario.");
            }
            

        }));

        return({
            ok: false,
            message: "Se ha creado perfectamente el registro",
        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const AgregarRegistrodeInventario = async (parent, args, context, info) =>{
    try {
        
        const {administrador, productos} = invetarioJson;

        const admin = await Administrador.findOne({credenciales: administrador});
       
        if(!admin)  throw new Error("ERROR_DATA-Administrador No existe.");

        const inventario = await new InventarioRegistro({
            nombre: `Inventario-${Date.now()}`,
            date: new Date(),
            responsable: admin?._id
        }).save();

        const productosParaInventario = await Producto.find();

        await Promise.all(productosParaInventario.map(async item =>{
            try {
                const producto = await Producto.findOne({codigo:item?.codigo});

                await new InventarioProductos({
                    inventarioRegistroId: inventario?._id,
                    productoId: producto?._id,
                    cantidadDisponible: 20,//item?.Inicial,
                    cantodadInicial: 20,//item?.Inicial,
                    cantidadVentida: 0,
                    costoIndividual: 5//item?.costoIndividual,
                }).save();

            } catch (error) {

                throw new Error("ERROR_DATA-Ocurrio un error en agregar inventario.");

            }
            
        }));

        return({
            ok: false,
            message: "Se ha creado perfectamente el registro",
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
    AgregarRegistrodeInventario,
    AgregarProductos,
  
}
