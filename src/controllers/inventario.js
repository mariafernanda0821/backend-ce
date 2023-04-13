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
                
                await new Producto({
                    codigo: item?.codigo,
                    
                    tipo:item?.tipo,
                    
                    categoria: categoria,
                    
                    nombre: item?.name,

                    descripcion: item.descripcion,

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


const AgregarRegistrodeInventario = async (parent, args, context, info) =>{
    try {
        
        const {administrador, productos} = invetarioJson;

        const admin = await Administrador.findOne({credenciales: administrador});


        const inventario = await new InventarioRegistro({
            nombre: `Inventario-${Date.now()}`,
            date: new Date(),
        }).save();


        await Promise.all(productos.map(async item =>{
            try {
                const producto = await Producto.findOne({codigo:item?.codigo});

                await new InventarioProductos({
                    inventarioRegistroId: inventario?._id,
                    productoId: producto?._id,
                    cantidadDisponible: item?.Inicial,
                    cantodadInicial: item?.Inicial,
                    cantidadVentida: 0,
                    costoIndividual: item?.costoIndividual,
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
  
}
