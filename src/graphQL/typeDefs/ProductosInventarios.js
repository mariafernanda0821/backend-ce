const { gql } = require('apollo-server-express');


const ProductosInventariosTypeDefs = gql`

    type Query {

        buscarProductos(tipo:String, page:Int, numItem: Int): ArrayProductos,

        listarCarritoCompra: ListarCarrito,
    
    }

    type ListarCarrito {
        _id: String,
        productoId:[String],
        productos:[Producto],
        inventarioproductos:[Inventarioproductos]
    }

    type Inventarioproductos{
        productoId: String,
        cantidadDisponible: Int,
        cantidadVentida: Int,
        costoIndividual: Int,
    }
    type ArrayProductos {
        productos:[ProductoData]
        page: Int,
        numItem: Int,
        lastPage: Int,
    }

    type ProductoData {
        producto:Producto,
        precio:String,
        cantidadDisponible: String
    }
    type Producto {
        _id: String,
        codigo: String,
        tipo: String,
        categoria: String,
        nombre: String,
        imagen: String,
        descripcion: String
    }

    type  Respuesta {

        ok: Boolean,
        status: Int,
        message: String,

    }
    
    type Mutation{ 

        agregarProductos(codigo: String!): Respuesta,

        agregarRegistrodeInventario(codigo: String!):Respuesta,

        agregarProductoCarrito(arrayProductoId:String!):Respuesta,

        quitarProductoCarrito(productoId:String!):Respuesta,
        
        agregarUnProcesoDeCompra(compra:String!, metodoPago:String!, montoTotal:String!):Respuesta,

    }
`;


module.exports = ProductosInventariosTypeDefs;