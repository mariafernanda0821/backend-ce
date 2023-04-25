const Carrito = require('../models/Carrito');
const ProcesoCompra = require('../models/ProcesoCompra');
const {} = require('../helpers/generar-jwt');


const AgregarCarrito = async (parent, args, context, info) =>{
    try {
        const {
            productos
        } = args;

        const token = context.authorization;

        if (!token) {

            throw new Error('NOT_AUTHORIZED-Token invalido.');

        }

        const userId = await searchValuejwtUser(token);
        
        const arrayProductos = productos === "" ? [] : productos.split(",");
        
        const searchCarrito = await Carrito.findOne({userId: userId?.id})
        
        const menssaje = arrayProductos.length > 2 ? "Se ha Agregado los productos al carrito" : "Se ha Agregado el producto carrito"

        if(!searchCarrito){
            await Carrito({
                userId:userId?.id,
                productos:arrayProductos
            }).save()
      
            return({
                ok: ok,
                message: menssaje,
            });
        }

        await Carrito.findByIdAndUpdate(searchCarrito?._id, {productos: arrayProductos});

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
        
        const menssaje = arrayProductos.length > 2 ? "Se ha Agregado los productos al carrito" : "Se ha Agregado el producto carrito"

        if(!searchCarrito){

            throw new Error('ERROR_DATA-Este carrito no existe');

        }
        
        const newArray = searchCarrito.productos.filter(async(item) => item._id.toString() != productoId);

        await Carrito.findByIdAndUpdate(searchCarrito?._id, {productos: newArray});

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

        const userId = await searchValuejwtUser(token);
        
        

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
  
}