const { gql } = require('apollo-server-express');
const {
    AgregarRegistrodeInventario,
    AgregarProductos,
    BuscarTodosLosInventarios,
    BuscarTodosLosInventariosYProductos
} = require('../../controllers/inventario');
const {
    AgregarCarrito,
    QuitarProductoCarrito,
    AgregarUnProcesoDeCompra,
    ListarProductos,
    ListarCarritoCompra
} = require('../../controllers/productos');



const ProductosInventariosResolver ={
    Query: {

        buscarProductos: (parent, args, context, info) => ListarProductos(parent, args, context, info),  
        
        listarCarritoCompra: (parent, args, context, info) => ListarCarritoCompra(parent, args, context, info),
   
        //inventarios
        buscarTodosLosInventarios : (parent, args, context, info) => BuscarTodosLosInventarios (parent, args, context, info),
        buscarTodosLosInventariosYProductos : (parent, args, context, info) => BuscarTodosLosInventariosYProductos (parent, args, context, info),
        
    },

    Mutation: {
       
        agregarProductos: (parent, args, context, info) => AgregarProductos(parent, args, context, info),  
        
        agregarRegistrodeInventario: (parent, args, context, info) => AgregarRegistrodeInventario(parent, args, context, info),  
    
        agregarProductoCarrito: (parent, args, context, info) => AgregarCarrito(parent, args, context, info),  

        quitarProductoCarrito: (parent, args, context, info) => QuitarProductoCarrito(parent, args, context, info),  

        agregarUnProcesoDeCompra: (parent, args, context, info) => AgregarUnProcesoDeCompra(parent, args, context, info),  

    }

}


module.exports = ProductosInventariosResolver;