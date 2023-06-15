const mongoose = require('mongoose');
const InventarioRegistro = require('../models/InventarioRegistro');
const InventarioProductos = require('../models/InventarioProductos');
const Administrador = require('../models/Administrador');
//const invetarioJson = require('../../data/inventario.json');
const productosJson = require('../../data/productos.json');
const Producto = require('../models/Producto');

const {searchValuejwtUser} = require('../helpers/generar-jwt');
const {catchError} = require('../helpers/catchError');
const { v4: uuidv4 } = require('uuid');

const AgregarProductos = async (parent, args, context, info) =>{
    try {
    
        const x = productosJson.map(async item =>{
            try {
                console.log("item", item);
                await Promise.all([1,2,3,4,5].map(async index => {
                    
                    await new Producto({
                        codigo: `${item?.codigo}-0${index}`,
                        
                        tipo: item?.tipo,
                        
                        categoria: item?.categoria,
                        
                        nombre: `${item?.nombre}-0${index}`,
    
                        descripcion: item?.descripcion,

                        imagen: `${item?.imagen}-0${index}`
                    }).save();

                }))
                return;

            } catch (error) {

                throw new Error("ERROR_DATA-Ocurrio un error en agregar inventario.");
            }
            
        });

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
        
        //const {administrador, productos} = invetarioJson;
        const { codigo} = args;

        const admin = await Administrador.findOne({credenciales: codigo});
       
        if(!admin)  throw new Error("ERROR_DATA-Administrador No existe.");

        const inventario = await new InventarioRegistro({
            nombre: `Inventario-${Date.now()}`,
            fecha: new Date(),
            responsable: admin?._id
        }).save();

        const productosParaInventario = await Producto.find();

        await Promise.all(productosParaInventario.map(async item =>{
            try {
            
                await new InventarioProductos({
                    inventarioRegistroId: inventario?._id,
                    productoId: item?._id,
                    cantidadDisponible: 20,//item?.Inicial,
                    cantodadInicial: 20,//item?.Inicial,
                    cantidadVentida: 0,
                    costoIndividual: 5//item?.costoIndividual,
                }).save();

                return;
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


const BuscarTodosLosInventarios = async (parent, args, context, info) =>{
    try {
        
        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        const userId = await searchValuejwtUser(token);

        const inventarioRegistro = await InventarioRegistro.aggregate([
            {
              '$lookup': {
                'from': 'inventarioproductos', 
                'localField': '_id', 
                'foreignField': 'inventarioRegistroId', 
                'as': 'productos'
              }
            }, {
              '$project': {
                '_id': 1, 
                'nombre': 1, 
                'fecha': 1, 
                'responsable': 1, 
                'numProducts': {
                  '$size': '$productos'
                }
              }
            }
        ])

        
        
        return({
            inventarioRegistro: inventarioRegistro
        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const BuscarTodosLosInventariosYProductos = async (parent, args, context, info) =>{
    try {
        const {inventarioRegistroId}= args;
        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        const userId = await searchValuejwtUser(token);

        const inventarioRegistro = await InventarioProductos.aggregate([
            {
              '$match': {
                'inventarioRegistroId': mongoose.Types.ObjectId(inventarioRegistroId)
              }
            }, {
              '$lookup': {
                'from': 'productos', 
                'localField': 'productoId', 
                'foreignField': '_id', 
                'as': 'productoId'
              }
            }, {
              '$unwind': {
                'path': '$productoId', 
                'preserveNullAndEmptyArrays': true
              }
            }, {
              '$lookup': {
                'from': 'inventarioregistros', 
                'localField': 'inventarioRegistroId', 
                'foreignField': '_id', 
                'as': 'inventarioRegistroId'
              }
            }, {
              '$unwind': {
                'path': '$inventarioRegistroId', 
                'preserveNullAndEmptyArrays': true
              }
            },{
                '$lookup': {
                  'from': 'users', 
                  'localField': 'inventarioRegistroId.responsable', 
                  'foreignField': '_id', 
                  'as': 'inventarioRegistroId.responsable'
                }
              }, {
                '$unwind': {
                  'path': '$inventarioRegistroId.responsable', 
                  'preserveNullAndEmptyArrays': true
                }
              }
        ])

        const inventarioRegistroObject = inventarioRegistro[0].inventarioRegistroId;
  
        const newArray = await Promise.all(inventarioRegistro.map(async(item) => {

            delete item.inventarioRegistroId;
            return{
                ...item
            }
        }))
       
     
        
        return({
            inventarioRegistro: inventarioRegistroObject,
            inventarioProducto: newArray
        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const BuscarLosProductosDeLosInventarios = async (parent, args, context, info) =>{
  try {
      
      const {productoId}= args;

      const token = context?.authorization;

      if (!token) {

          throw new Error('NOT_AUTHORIZED-Token invalido.');

      }

      //const userId = await searchValuejwtUser(token);

      const inventarioRegistro = await InventarioProductos.aggregate([
        {
          '$match': {
            'productoId': mongoose.Types.ObjectId(productoId)
          }
        }, {
          '$lookup': {
            'from': 'productos', 
            'localField': 'productoId', 
            'foreignField': '_id', 
            'as': 'productoId'
          }
        }, {
          '$unwind': {
            'path': '$productoId', 
            'preserveNullAndEmptyArrays': true
          }
        }, {
          '$lookup': {
            'from': 'inventarioregistros', 
            'localField': 'inventarioRegistroId', 
            'foreignField': '_id', 
            'as': 'inventarioRegistroId'
          }
        }, {
          '$unwind': {
            'path': '$inventarioRegistroId', 
            'preserveNullAndEmptyArrays': true
          }
        }
      ]
      )

      return({
          inventarioRegistro: inventarioRegistro,
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
    BuscarTodosLosInventarios,
    BuscarTodosLosInventariosYProductos,
    BuscarLosProductosDeLosInventarios,
}
