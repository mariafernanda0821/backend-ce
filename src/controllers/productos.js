const mongoose = require('mongoose');
const Carrito = require('../models/Carrito');
const ProcesoCompra = require('../models/ProcesoCompra');
const {searchValuejwtUser} = require('../helpers/generar-jwt');
const InventarioProductos = require('../models/InventarioProductos');


const ListarProductos =  async (parent, args, context, info) =>{
    try {
        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-User not authorized, token invalid.');

        }

        const {page, numItem, tipo} = args;

        if (page < 0 && numItem < 0) {

            throw new Error("ERROR_DATA-Numero de pagina y item tiene que se mayor que cero.");
        }

        const newSkip = (parseInt(page) - 1) || 0;

        const limit = parseInt(numItem) || 7

        const arrayProductos = await InventarioProductos.aggregate([
            {
              '$match': {
                'activo': true
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
              '$match': {
                'productoId.delete': false, 
                'productoId.tipo': tipo
              }
            }, {
              '$group': {
                '_id': '$productoId', 
                'cantidadDisponible': {
                  '$sum': '$cantidadDisponible'
                }, 
                'precio': {
                  '$first': '$costoIndividual'
                }
              }
            }, {
              '$skip':newSkip *limit
            }, {
              '$limit': limit
            },{
                '$sort': {
                    '_id.nombre': 1
                }
            }
        ]);


        console.log("arrayProductos arrayProductos", arrayProductos);

        const newArray = await Promise.all(arrayProductos.map(async(item) => {
            console.log(item)
            return({
                producto: item._id,

                precio:item.precio,
                
                cantidadDisponible:item?.cantidadDisponible
            })

        }));

        const numMatch = await InventarioProductos.find({ 'activo': true,}).countDocuments(); //cantidad de documentos;

        let lastPage = numMatch / (numItem == 0 ? 1 : (numItem || 10));

        if (lastPage % 1 != 0) {

            lastPage = parseInt(lastPage) + 1;
        }


        console.log("newArray newArray", newArray);
        return({
            productos:newArray,
            page: page,
            lastPage: lastPage,
            numItem: numItem

        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const AgregarCarrito = async (parent, args, context, info) =>{
    try {
        const {
            arrayProductoId
        } = args;

        const token = context.authorization;


        console.log("token token", token);
        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        const userId = await searchValuejwtUser(token);
        
        const arrayProductos = arrayProductoId === "" ? [] : arrayProductoId.split(",");
        
        const searchCarrito = await Carrito.findOne({userId: userId?.id})
        
        const menssaje = arrayProductos.length > 2 ? "Se ha Agregado los productos al carrito" : "Se ha Agregado el producto carrito"

        if(!searchCarrito){
            await Carrito({
                userId:userId?.id,
                productos:arrayProductos
            }).save()
      
            return({
                ok: true,
                status: 200,
                message: menssaje,
            });
        }

        const newArray = await Promise.all(searchCarrito?.productoId?.map(async(item) => item.toString()));

        const filterArray = newArray.filter(x => x!=arrayProductos[0].toString());

        const x = filterArray.concat(arrayProductos);

        await Carrito.findByIdAndUpdate(searchCarrito?._id, { productoId: x});

        return({
            ok: true,
            status:200,
            message: menssaje,
        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}

const QuitarProductoCarrito = async (parent, args, context, info) =>{
    try {
        const {
            productoId
        } = args;

        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        const userId = await searchValuejwtUser(token);
        
        //const arrayProductos = productos === "" ? [] : productos.split(",");
        
        const searchCarrito = await Carrito.findOne({userId: userId?.id})
        
        const menssaje =  "Se ha eliminados los productos del carrito";

        if(!searchCarrito){

            throw new Error('ERROR_DATA-Este carrito no existe');

        }
        
        // const newArray = await Promise.all(searchCarrito.productoId.filter(async(item) => {
        //     console.log("item.toString()", item.toString());
        //     console.log("productoId ",productoId);

        //     console.log(item.toString() != productoId.toString());
        //     item.toString() != productoId.toString()
        // }
        // ));
        const newArray = await Promise.all(searchCarrito?.productoId?.map(async(item) => item.toString()));

        const filterArray = newArray.filter(x => x!=productoId);

        await Carrito.findByIdAndUpdate(searchCarrito?._id, {productoId: filterArray});

        return({
            ok: false,
            message: menssaje,
        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const AgregarUnProcesoDeCompra = async (parent, args, context, info) =>{
    try {
        const {
            compra, metodoPago, montoTotal
        } = args;

        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        
        return({
            ok: true,
            status:200,
            message: menssaje,
        });

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}


const  ListarCarritoCompra =async (parent, args, context, info) =>{
    try {
        
        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        const userId = await searchValuejwtUser(token);
        
        const [searchCarrito] = await Carrito.aggregate([
            {
              '$match': {
                'userId': mongoose.Types.ObjectId(userId?.id)
              }
            }, {
              '$lookup': {
                'from': 'productos', 
                'localField': 'productoId', 
                'foreignField': '_id', 
                'as': 'productos'
              }
            },{
                '$lookup': {
                  'from': 'inventarioproductos', 
                  'localField': 'productoId', 
                  'foreignField': 'productoId', 
                  'as': 'inventarioproductos'
                }
              },{
                '$sort': {
                    'productoId': 1
                }
            },
        ]);
        
        //console.log(searchCarrito)
       
        const carrito = searchCarrito ;

        //console.log(carrito)
        return(carrito);

    } catch (error) {

        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions
        });

    }
}

module.exports = {
    AgregarCarrito,
    QuitarProductoCarrito,
    AgregarUnProcesoDeCompra,
    ListarProductos,
    ListarCarritoCompra,
}