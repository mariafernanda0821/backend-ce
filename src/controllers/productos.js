const mongoose = require("mongoose");
const Carrito = require("../models/Carrito");
const ProcesoCompra = require("../models/ProcesoCompra");
const { searchValuejwtUser } = require("../helpers/generar-jwt");

const { catchError } = require("../helpers/catchError");
const InventarioProductos = require("../models/InventarioProductos");
const bcrypt = require("bcryptjs");

const axios = require("axios");


/* 
cliente
tarjeta: 42429811763194904
fecha:04/26
cvv:148

criptomoneda:
pin 2716826
Address: 0xaac008bAc79D2286014aF491bF5e55db7A00a379
Llave privada: 0xa27d8e7a1488c6657649c4b8651f88c4910798810cbcb82d71ccfdd53ab04bd6

Empresa: 
api token rexKm9gVYV9XfZXPxV0VO

tarjeta 42422672851483000
fecha: 04/26
cvv: 965

criptomoneda:
pin 4622108
llave privada:0xdefe9203e25a22a746271bee0ab080dcfb98201a25069f637548f68e1f961f22
Address:0x78Aa9a4c2f65a39CF7acC3Ca78f9AEC4D1Eee66c

*/

const TOKENEGOCIO = "rexKm9gVYV9XfZXPxV0VO";

const peticionDelProcesoBanco = (tipo, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (tipo === "tarjetaCredito") {
                const respuesta = await axios.post(
                    "https://cryptobanco.jsmb.lat/api/pay-with-tdc",
                    data
                );
                
                console.log("respuestaPeticion respuestaPeticion", respuesta);
                const {ok} = respuesta.data;

                resolve({ok});
            }

            if (tipo === "criptomoneda") {
                const respuesta = await axios.post(
                    "https://cryptobanco.jsmb.lat/api/pay-with-cripto",
                    data
                );
                console.log("respuestaPeticion respuestaPeticion", respuesta);

                const {ok} = respuesta.data;
                
                resolve({ok});
                
            }
        } catch (error) {
            console.log("error ===========>", error);
            reject("ERROR_DATA-Ocurrio un error en el metodo de pago.");
        }

        // if(/* petición exitosa */) {
        //   resolve();
        // } else {
        //   reject("ERROR_DATA-Ocurrio un error en el metodo de pago.");
        // }
    });
};

const ListarProductos = async (parent, args, context, info) => {
    try {
        const token = context.authorization;

        if (!token) {
            throw new Error(
                "NOT_AUTHORIZED-User not authorized, token invalid."
            );
        }

        const { page, numItem, tipo } = args;

        if (page < 0 && numItem < 0) {
            throw new Error(
                "ERROR_DATA-Numero de pagina y item tiene que se mayor que cero."
            );
        }

        const newSkip = parseInt(page) - 1 || 0;

        const limit = parseInt(numItem) || 7;

        const arrayProductos = await InventarioProductos.aggregate([
            {
                $match: {
                    activo: true,
                },
            },
            {
                $lookup: {
                    from: "productos",
                    localField: "productoId",
                    foreignField: "_id",
                    as: "productoId",
                },
            },
            {
                $unwind: {
                    path: "$productoId",
                    preserveNullAndEmptyArrays: true,
                },
            },
            {
                $match: {
                    "productoId.delete": false,
                    "productoId.tipo": tipo,
                },
            },
            {
                $group: {
                    _id: "$productoId",
                    cantidadDisponible: {
                        $sum: "$cantidadDisponible",
                    },
                    precio: {
                        $first: "$costoIndividual",
                    },
                },
            },
            {
                $skip: newSkip * limit,
            },
            {
                $limit: limit,
            },
            {
                $sort: {
                    "_id.nombre": 1,
                },
            },
        ]);

        console.log("arrayProductos arrayProductos", arrayProductos);

        const newArray = await Promise.all(
            arrayProductos.map(async (item) => {
                console.log(item);
                return {
                    producto: item._id,

                    precio: item.precio,

                    cantidadDisponible: item?.cantidadDisponible,
                };
            })
        );

        const numMatch = await InventarioProductos.find({
            activo: true,
        }).countDocuments(); //cantidad de documentos;

        let lastPage = numMatch / (numItem == 0 ? 1 : numItem || 10);

        if (lastPage % 1 != 0) {
            lastPage = parseInt(lastPage) + 1;
        }

        console.log("newArray newArray", newArray);
        return {
            productos: newArray,
            page: page,
            lastPage: lastPage,
            numItem: numItem,
        };
    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

const AgregarCarrito = async (parent, args, context, info) => {
    try {
        const { arrayProductoId } = args;

        const token = context.authorization;

        console.log("token token", token);

        console.log("token token arrayProductoId", arrayProductoId);

        if (!token) {
            throw new Error("NOT_AUTHORIZED-Token invalido.");
        }

        const userId = await searchValuejwtUser(token);

        const arrayProductos =
            arrayProductoId === "" ? [] : arrayProductoId.split(",");

        const searchCarrito = await Carrito.findOne({ userId: userId?.id });

        console.log("token token arrayProductos", arrayProductos);

        const menssaje =
            arrayProductos.length > 2
                ? "Se ha Agregado los productos al carrito"
                : "Se ha Agregado el producto carrito";

        if (!searchCarrito) {
            await Carrito({
                userId: userId?.id,
                productos: arrayProductos,
            }).save();

            return {
                ok: true,
                status: 200,
                message: menssaje,
            };
        }

        const newArray = await Promise.all(
            searchCarrito?.productoId?.map(async (item) => item.toString())
        );

        const filterArray = newArray.filter(
            (x) => x != arrayProductos[0]?.toString()
        );

        const x = filterArray.concat(arrayProductos);
        console.log("token token arrayProductos x", x);

        await Carrito.findByIdAndUpdate(searchCarrito?._id, { productoId: x });

        return {
            ok: true,
            status: 200,
            message: menssaje,
        };
    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

const QuitarProductoCarrito = async (parent, args, context, info) => {
    try {
        const { productoId } = args;

        const token = context.authorization;

        if (!token) {
            throw new Error("NOT_AUTHORIZED-Token invalido.");
        }
        console.log("productoId productoId", productoId);

        const userId = await searchValuejwtUser(token);

        const searchCarrito = await Carrito.findOne({ userId: userId?.id });

        const menssaje = "Se ha eliminados los productos del carrito";

        if (!searchCarrito) {
            throw new Error("ERROR_DATA-Este carrito no existe");
        }

        // const newArray = await Promise.all(searchCarrito.productoId.filter(async(item) => {
        //     console.log("item.toString()", item.toString());
        //     console.log("productoId ",productoId);

        //     console.log(item.toString() != productoId.toString());
        //     item.toString() != productoId.toString()
        // }
        // ));
        console.log("prodictos", productoId);

        const newArray = await Promise.all(
            searchCarrito?.productoId?.map(async (item) => item?.toString())
        );

        const filterArray = newArray.filter((x) => x != productoId);

        console.log("filterArray", filterArray);

        await Carrito.findByIdAndUpdate(searchCarrito?._id, {
            productoId: filterArray,
        });

        return {
            ok: false,
            message: menssaje,
        };
    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

const AgregarUnProcesoDeCompra = async (parent, args, context, info) => {
    try {
        const { compra, metodoPago, montoTotal } = args;

        const token = context.authorization;

        if (!token) {
            throw new Error("NOT_AUTHORIZED-Token invalido.");
        }

        return {
            ok: true,
            status: 200,
            message: menssaje,
        };
    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

const ListarCarritoCompra = async (parent, args, context, info) => {
    try {
        const token = context.authorization;

        if (!token) {
            throw new Error("NOT_AUTHORIZED-Token invalido.");
        }

        const userId = await searchValuejwtUser(token);

        const [searchCarrito] = await Carrito.aggregate([
            {
                $match: {
                    userId: mongoose.Types.ObjectId(userId?.id),
                },
            },
            {
                $lookup: {
                    from: "productos",
                    localField: "productoId",
                    foreignField: "_id",
                    as: "productos",
                },
            },
            {
                $lookup: {
                    from: "inventarioproductos",
                    localField: "productoId",
                    foreignField: "productoId",
                    as: "inventarioproductos",
                },
            },
            {
                $sort: {
                    "productos.nombre": 1,
                },
            },
        ]);

        //console.log(searchCarrito)

        const carrito = searchCarrito;

        //console.log(carrito)
        return carrito;
    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

const ProcesoDeCompra = async (parent, args, context, info) => {
    try {
        const token = context.authorization;

        if (!token) {
            throw new Error("NOT_AUTHORIZED-Token invalido.");
        }

        const userId = await searchValuejwtUser(token);
        console.log("userId userId", userId);
        if (!userId?.id)
            throw new Error("NOT_AUTHORIZED-Usuario No autorizado.");

        const { compra, metodoPago, montoTotal } = args;

        if (!metodoPago?.datos?.tarjeta && !metodoPago?.datos?.criptomoneda) {
            throw new Error("ERROR_DATA- Se requieren todo la informacion.");
        }

        console.log("{ compra, metodoPago, montoTotal }", {
            compra,
            metodoPago,
            montoTotal,
        });

        const { tipo } = metodoPago;

        let respuestaPeticion = "";
        let procesoCompra = "";
        if (tipo === "criptomoneda") {
            const { criptomoneda, pin } = metodoPago?.datos;

            procesoCompra = await new ProcesoCompra({
                compra: compra,
                metodoPago: {
                    tipo: tipo,
                    dato: {
                        criptomoneda: criptomoneda,
                        fecha: new Date(),
                    },
                },
                montoTotal: montoTotal,
                userId: userId.id,
            }).save();

            const dataCriptomoneda = {
                correo: criptomoneda,
                pin: pin,
                monto: montoTotal.toString(),
                token: TOKENEGOCIO,
            };
            respuestaPeticion = await peticionDelProcesoBanco(
                tipo,
                dataCriptomoneda
            );
        }

        if (tipo === "tarjetaCredito") {
            const { tarjeta, nombre, cvc, fechaVencimiento } =
                metodoPago?.datos;

            const regex = /^(0[1-9]|1[0-2])\/\d{2}$/;

            if (regex.test(fechaVencimiento)) {
                const salt = bcrypt.genSaltSync(10);

                hashCvc = bcrypt.hashSync(cvc, salt);

                procesoCompra = await new ProcesoCompra({
                    compra: compra,
                    metodoPago: {
                        tipo: tipo,
                        dato: {
                            tarjeta: tarjeta,
                            nombre: nombre,
                            cvc: hashCvc,
                            fecha: new Date(),
                            fechaVencimiento: fechaVencimiento,
                        },
                    },
                    montoTotal: montoTotal,
                    userId: userId.id,
                }).save();

                const dataTarjetaCredito = {
                    tarjeta: tarjeta,
                    cvv: cvc,
                    fecha: fechaVencimiento,
                    monto: montoTotal.toString(),
                    token: TOKENEGOCIO,
                };
                respuestaPeticion = await peticionDelProcesoBanco(
                    tipo,
                    dataTarjetaCredito
                );
            }
        }

        if (!respuestaPeticion.ok) {
            await ProcesoCompra.findByIdAndUpdate(procesoCompra._id, {
                status: "rechazada",
            });

            return {
                ok: false,
                message: "La compra fue rechazada.",
            };
        }

        console.log("respuestaPeticion respuestaPeticion", respuestaPeticion)
            await ProcesoCompra.findByIdAndUpdate(procesoCompra._id, {
                status: 'finalizada',
            });

        const newArray = compra.map((item) => item?.inventarioProductoId);

        const newArrayInventarioProducto = await InventarioProductos.find(
            { _id: { $in: newArray } },
            { productoId: 1, _id: 0 }
        );

        const productoEliminar = await Promise.all(
            newArrayInventarioProducto.map(async (item) => {
                const productoId = item?.productoId;
                console.log("productoId productoId", productoId);
                if (productoId) return productoId.toString();
            })
        );

        const searchCarrito = await Carrito.findOne({ userId: userId?.id });

        const filterArray = searchCarrito?.productoId?.filter(
            (x) => !productoEliminar.includes(x.toString())
        );

        await Carrito.findByIdAndUpdate(searchCarrito?._id, {
            productoId: filterArray,
        });
        /* 
        compra: [
            {
            cantidad: 4,
            inventarioProductoId: '6449b104025694ca8591349f',
            precio: 5
            }
        ],*/
        await Promise.all(
            compra.map(async (item) => {
                const inventario = await InventarioProductos.findById(
                    item?.inventarioProductoId
                );

                const cantidad = inventario?.cantidadVentida + item?.cantidad;

                const actualizar = {
                    cantidadVentida: cantidad,
                    cantidadDisponible: inventario.cantodadInicial - cantidad,
                };

                await InventarioProductos.findByIdAndUpdate(
                    item?.inventarioProductoId,
                    actualizar
                );
            })
        );



    
        return {
            ok: true,
            message: "Se esta procesando la Compra",
        };
        
    } catch (error) {
        // console.log(error);

        const { message, extensions } = catchError(error);

        console.log({ message, extensions });

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

const ListadoProcesosCompra = async (parent, args, context, info) => {
    try {
        const token = context?.authorization;

        if (!token) {
            throw new Error("NOT_AUTHORIZED-Token invalido.");
        }

        const userId = await searchValuejwtUser(token);
        console.log("userId userId", userId);

        if (!userId?.id)
            throw new Error("NOT_AUTHORIZED-Usuario No autorizado.");

        const procesoDeCompra = await ProcesoCompra.find({
            userId: userId?.id,
        });
        console.log("procesoDeCompra procesoDeCompra", procesoDeCompra);

        const newInventarioProductos = await Promise.all(
            procesoDeCompra.map(async (item) => {
                const productoId = item?.compra?.map(
                    (item) => item?.inventarioProductoId
                );

                const newInventarioProductos =
                    await InventarioProductos.aggregate([
                        {
                            $match: {
                                _id: {
                                    $in: productoId,
                                },
                            },
                        },
                        {
                            $lookup: {
                                from: "productos",
                                localField: "productoId",
                                foreignField: "_id",
                                as: "productoId",
                            },
                        },
                        {
                            $unwind: {
                                path: "$productoId",
                                preserveNullAndEmptyArrays: true,
                            },
                        },
                    ]);

                return {
                    item,
                    inventarioProductos: newInventarioProductos,
                };
            })
        );

        console.log(
            "newInventarioProductos newInventarioProductos",
            newInventarioProductos
        );

        return ({
            lista: newInventarioProductos,
         
        });

    } catch (error) {
        console.log(error);

        const { message, extensions } = catchError(error);

        throw new GraphQLError(message, {
            extensions,
        });
    }
};

module.exports = {
    AgregarCarrito,
    QuitarProductoCarrito,
    AgregarUnProcesoDeCompra,
    ListarProductos,
    ListarCarritoCompra,
    ProcesoDeCompra,
    ListadoProcesosCompra,
};
