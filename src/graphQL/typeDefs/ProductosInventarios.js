const { gql } = require("apollo-server-express");

const ProductosInventariosTypeDefs = gql`
    type Query {
        buscarProductos(tipo: String, page: Int, numItem: Int): ArrayProductos

        listarCarritoCompra: ListarCarrito
        buscarTodosLosInventarios: ArrayInventario
        buscarTodosLosInventariosYProductos(
            inventarioRegistroId: String
        ): InventarioRegistroProductos

        buscarLosProductosDeLosInventarios(
            productoId: String
        ): InventarioDeProductos

        buscarProcesoCompra: RespuestaProcesoComprax
        procesoCompraAdmin: RespuestaProcesoCompraAdmin
        #listadoProcesosCompra: RespuestaListadoProcesosCompra
    }


    type RespuestaProcesoCompraAdmin{
        lista:[listaProceso]
 
    }

    type listaProceso {
        _id:String
        metodoPago:MetodoPagoX
        status: String
        montoTotal: Int
        userId: User
    }
    type User {
        _id: String
        nombre: String,
        apellido: String
    }
    type RespuestaListadoProcesosCompra{
        metodoPago:MetodoPagoX
        status: String
        montoTotal: Int
        inventarioProductos:InventarioProductoAB
    }

    type MetodoPagoX{
        tipo: String,
        dato: dato
    }
   
    type dato {
            tarjeta:String,
            nombre: String,
            cvc: String,
            fecha:String,
            fechaVencimiento: String,
            criptomoneda: String,
        }


    type RespuestaProcesoComprax{
        lista:[RespuestaProcesoCompra]
    }
    type RespuestaProcesoCompra{
        item:Item,
        inventarioProductos:[ArrayInventarioDeProductos],
    }

    type Item{
        _id: String,
        status: String,
        montoTotal: String,
        metodoPago: MetodoPago01,
    }

    type DetallarPago01 {
        tarjeta: String,
        nombre: String,
        cvc: String,
        criptomoneda: String,
        fechaVencimiento: String,
    }

    type MetodoPago01 {
        tipo: String,
        datos:DetallarPago01
    }
    

    type InventarioDeProductos {
        inventarioRegistro: [ArrayInventarioDeProductos]
    }

    type ArrayInventarioDeProductos {
        _id: String
        productoId: Producto
        cantidadDisponible: Int
        cantidadVentida: Int
        costoIndividual: Int
        cantodadInicial: Int
        inventarioRegistroId: InventarioRegistro
    }

    type ArrayInventario {
        inventarioRegistro: [InventarioRegistro]
    }

    type InventarioRegistroProductos {
        inventarioRegistro: InventarioRegistro
        inventarioProducto: [InventarioProductoAB]
    }

    type InventarioProductoAB {
        productoId: Producto
        cantidadDisponible: Int
        cantidadVentida: Int
        costoIndividual: Int
        cantodadInicial: Int
    }
    type InventarioRegistro {
        _id: String
        nombre: String
        fecha: String
        numProducts: Int
        responsable: Usuario
    }
    type ListarCarrito {
        _id: String,
        productoId: [String],
        productos: [Producto],
        inventarioproductos: [Inventarioproductos],
    }

    type Inventarioproductos {
        _id:String,
        productoId: String,
        inventarioRegistroId:String,
        cantidadDisponible: Int,
        cantidadVentida: Int,
        costoIndividual: Int,
        cantodadInicial: Int,
    }
    type ArrayProductos {
        productos: [ProductoData]
        page: Int
        numItem: Int
        lastPage: Int
    }

    type ProductoData {
        producto: Producto
        precio: String
        cantidadDisponible: String
    }
    type Producto {
        _id: String
        codigo: String
        tipo: String
        categoria: String
        nombre: String
        imagen: String
        descripcion: String
    }

    type Respuesta {
        ok: Boolean
        message: String
    }

    type Usuario {
        nombre: String
        apellido: String
        password: String
        email: String
        active: Boolean
        role: String
    }


    input DetallarPago {
        tarjeta: String,
        nombre: String,
        cvc: String,
        pin: String,
        criptomoneda: String,
        fechaVencimiento: String,
    }

    input MetodoPago {
        tipo: String,
        datos:DetallarPago
    }
    
    input Compra {
        cantidad:Int,
        inventarioProductoId: String,
        precio: Int,
    }
    
    input ListaCompra{
        compra: [Compra]
    }

    type Mutation {

        agregarProductos(codigo: String!): Respuesta,

        agregarRegistrodeInventario(codigo: String!): Respuesta,

        agregarProductoCarrito(arrayProductoId: String!): Respuesta,

        quitarProductoCarrito(productoId: String!): Respuesta,

        agregarUnProcesoDeCompra(
            compra: [Compra!]
            metodoPago: MetodoPago!
            montoTotal: Int!
        ): Respuesta
    }
`;

module.exports = ProductosInventariosTypeDefs;
