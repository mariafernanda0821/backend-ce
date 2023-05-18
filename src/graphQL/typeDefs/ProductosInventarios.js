const { gql } = require("apollo-server-express");

const ProductosInventariosTypeDefs = gql`

    type Query {

        buscarProductos(tipo:String, page:Int, numItem: Int): ArrayProductos,

        listarCarritoCompra: ListarCarrito,
        buscarTodosLosInventarios: ArrayInventario
        buscarTodosLosInventariosYProductos(inventarioRegistroId:String): InventarioRegistroProductos
    }

    type ArrayInventario {
        inventarioRegistro: [InventarioRegistro]
    }

    type InventarioRegistroProductos {
       
        inventarioRegistro:InventarioRegistro
        inventarioProducto:[InventarioProductoAB]
    }

    type InventarioProductoAB{
        productoId: Producto,
        cantidadDisponible: Int,
        cantidadVentida: Int,
        costoIndividual: Int,
        cantodadInicial: Int
    }
    type InventarioRegistro {
        _id: String, 
        nombre:  String, 
        fecha:  String, 
        numProducts: Int
        responsable: Usuario
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
        cantodadInicial: Int,
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

    type Usuario{
        nombre: String,
        apellido: String,
        password: String,
        email: String,
        active: Boolean,
        role: String,
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
