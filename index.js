// -----------------------------
// PRODUCTOS
// -----------------------------

const productos = [
    {
        id: 1,
        nombre: "Textil",
        precio: 6000,
        imagen: "imagenes/textil.jpeg",
        olores: [
            "Limón", "Lima", "Naranja", "Pomelo", "Menta", "Té Verde",
            "Bambú", "Lavanda", "Jazmín", "Flores Blancas", "Flower",
            "María C", "Caricia de Ángel", "Chicle", "Coco y Vainilla",
            "Papaya", "Néctar", "Melón", "Uva", "Oriental",
            "Etiqueta Negra", "Royal", "Cony", "Amour", "Daniel",
            "Paula", "Shopping"
        ]
    },
    {
        id: 2,
        nombre: "Difusor",
        precio: 6500,
        imagen: "imagenes/difusor.jpeg",
        olores: [
            "Vainilla", "Lavanda", "Coco", "Flores blancas",
            "Sandía y pepino", "Limón", "Lima", "Pomelo", "Naranja"
        ]
    },
    {
        id: 3,
        nombre: "Spray",
        precio: 4500,
        imagen: "imagenes/spray.jpeg",
        olores: [
            "Lavanda", "Coco", "Flores blancas",
            "Limón", "Citrus", "Mery", "Uva"
        ]
    },
    {
        id: 4,
        nombre: "Colgante",
        precio: 5500,
        imagen: "imagenes/colgante.jpeg",
        olores: ["Lavanda", "Coco", "Flores blancas"]
    },
    {
        id: 5,
        nombre: "Aerosol",
        precio: 5500,
        imagen: "imagenes/aerosoles.jpeg",
        olores: ["Lavanda", "Coco", "Flores blancas"]
    },
    {
        id: 6,
        nombre: "Perfumina para auto",
        precio: 5500,
        imagen: "imagenes/WhatsApp Image 2026-06-16 at 12.29.39.jpeg",
        olores: ["Lavanda", "Coco", "Flores blancas"]
    },
    {
        id: 7,
        nombre: "Jabón líquido",
        precio: 5500,
        imagen: "imagenes/jabon.jpeg",
        olores: ["Lavanda", "Coco", "Flores blancas"]
    }
];

// -----------------------------
// VARIABLES
// -----------------------------

let carrito = JSON.parse(localStorage.getItem("carritoBruma")) || [];
let productoActual = null;
let cantidadActual = 1;

// -----------------------------
// ELEMENTOS
// -----------------------------

const catalogo = document.getElementById("catalogoProductos");
const buscador = document.getElementById("buscador");
const filtroPrecio = document.getElementById("filtroPrecio");
const sinResultados = document.getElementById("sinResultados");

const card = document.getElementById("Card");
const nombreProducto = document.getElementById("nombreProducto");
const precioProducto = document.getElementById("precioProducto");
const selectorOlores = document.getElementById("selectorOlores");
const cantidadProducto = document.getElementById("cantidadProducto");

const fondoCarrito = document.getElementById("fondoCarrito");
const listaCarrito = document.getElementById("listaCarrito");
const carritoVacio = document.getElementById("carritoVacio");
const totalCarrito = document.getElementById("totalCarrito");
const cantidadCarrito = document.getElementById("cantidadCarrito");

// -----------------------------
// MOSTRAR PRODUCTOS
// -----------------------------

function mostrarProductos() {
    const texto = buscador.value.toLowerCase();
    const precioMaximo = filtroPrecio.value;

    catalogo.innerHTML = "";

    const productosFiltrados = productos.filter(function(producto) {
        const coincideNombre = producto.nombre.toLowerCase().includes(texto);

        const coincidePrecio =
            precioMaximo === "todos" ||
            producto.precio <= Number(precioMaximo);

        return coincideNombre && coincidePrecio;
    });

    if (productosFiltrados.length === 0) {
        sinResultados.style.display = "block";
        return;
    }

    sinResultados.style.display = "none";

    productosFiltrados.forEach(function(producto) {
        const tarjeta = document.createElement("div");

        tarjeta.className = "contenedor__catalogo_items";

        tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}" class="catalogo_imagen">
            <h3>${producto.nombre}</h3>
            <p class="precioCard">${formatearPrecio(producto.precio)}</p>
        `;

        tarjeta.addEventListener("click", function() {
            abrirCard(producto.id);
        });

        catalogo.appendChild(tarjeta);
    });
}

// -----------------------------
// MODAL PRODUCTO
// -----------------------------

function abrirCard(id) {
    productoActual = productos.find(function(producto) {
        return producto.id === id;
    });

    cantidadActual = 1;
    actualizarCantidad();

    nombreProducto.textContent = productoActual.nombre;
    precioProducto.textContent = "Precio: " + formatearPrecio(productoActual.precio);

    selectorOlores.innerHTML = "";

    productoActual.olores.forEach(function(olor) {
        const opcion = document.createElement("option");

        opcion.value = olor;
        opcion.textContent = olor;

        selectorOlores.appendChild(opcion);
    });

    card.style.display = "flex";
    document.body.classList.add("bloqueado");
}

function cerrarCard() {
    card.style.display = "none";
    document.body.classList.remove("bloqueado");
}

// -----------------------------
// CANTIDAD
// -----------------------------

function actualizarCantidad() {
    cantidadProducto.textContent = cantidadActual;
}

document.getElementById("masCantidad").addEventListener("click", function() {
    cantidadActual++;
    actualizarCantidad();
});

document.getElementById("menosCantidad").addEventListener("click", function() {
    if (cantidadActual > 1) {
        cantidadActual--;
        actualizarCantidad();
    }
});

// -----------------------------
// AGREGAR AL CARRITO
// -----------------------------

function agregarCarrito() {
    const olorElegido = selectorOlores.value;

    const productoExistente = carrito.find(function(item) {
        return item.id === productoActual.id && item.olor === olorElegido;
    });

    if (productoExistente) {
        productoExistente.cantidad += cantidadActual;
    } else {
        carrito.push({
            id: productoActual.id,
            producto: productoActual.nombre,
            precio: productoActual.precio,
            olor: olorElegido,
            cantidad: cantidadActual
        });
    }

    guardarCarrito();
    mostrarCarrito();
    cerrarCard();

    mostrarMensaje(
        productoActual.nombre + " agregado al carrito"
    );
}

// -----------------------------
// CARRITO
// -----------------------------

function mostrarCarrito() {
    listaCarrito.innerHTML = "";

    let cantidadTotal = 0;
    let total = 0;

    carrito.forEach(function(item, indice) {
        cantidadTotal += item.cantidad;
        total += item.precio * item.cantidad;

        const elemento = document.createElement("div");
        elemento.className = "itemCarrito";

        elemento.innerHTML = `
            <div class="itemInfo">
                <div>
                    <strong>${item.producto}</strong>
                    <p>Aroma: ${item.olor}</p>
                    <p>Cantidad: ${item.cantidad}</p>
                </div>

                <span class="itemPrecio">
                    ${formatearPrecio(item.precio * item.cantidad)}
                </span>
            </div>

            <div class="itemAcciones">
                <button type="button" data-accion="menos">−</button>
                <span>${item.cantidad}</span>
                <button type="button" data-accion="mas">+</button>
                <button type="button" class="eliminar" data-accion="eliminar">
                    Eliminar
                </button>
            </div>
        `;

        elemento.querySelector('[data-accion="menos"]').addEventListener(
            "click",
            function() {
                cambiarCantidad(indice, -1);
            }
        );

        elemento.querySelector('[data-accion="mas"]').addEventListener(
            "click",
            function() {
                cambiarCantidad(indice, 1);
            }
        );

        elemento.querySelector('[data-accion="eliminar"]').addEventListener(
            "click",
            function() {
                eliminarProducto(indice);
            }
        );

        listaCarrito.appendChild(elemento);
    });

    cantidadCarrito.textContent = cantidadTotal;
    totalCarrito.textContent = formatearPrecio(total);

    if (carrito.length === 0) {
        carritoVacio.style.display = "block";
    } else {
        carritoVacio.style.display = "none";
    }
}

function cambiarCantidad(indice, cambio) {
    carrito[indice].cantidad += cambio;

    if (carrito[indice].cantidad <= 0) {
        carrito.splice(indice, 1);
    }

    guardarCarrito();
    mostrarCarrito();
}

function eliminarProducto(indice) {
    carrito.splice(indice, 1);

    guardarCarrito();
    mostrarCarrito();

    mostrarMensaje("Producto eliminado del carrito");
}

function vaciarCarrito() {
    if (carrito.length === 0) {
        mostrarMensaje("El carrito ya está vacío");
        return;
    }

    carrito = [];

    guardarCarrito();
    mostrarCarrito();

    mostrarMensaje("Carrito vacío");
}

// -----------------------------
// FINALIZAR COMPRA
// -----------------------------

function finalizarCompra() {
    if (carrito.length === 0) {
        mostrarMensaje("Agregá productos antes de finalizar");
        return;
    }

    let mensaje = "Hola! Quiero realizar este pedido:%0A%0A";

    carrito.forEach(function(item) {
        mensaje +=
            "• " + item.producto +
            " - Aroma: " + item.olor +
            " - Cantidad: " + item.cantidad +
            "%0A";
    });

    mensaje += "%0ATotal: " + totalCarrito.textContent;

    // Reemplazá el número por el WhatsApp real de Bruma & Esencia.
    const numeroWhatsApp = "5490000000000";

    window.open(
        "https://wa.me/" + numeroWhatsApp + "?text=" + mensaje,
        "_blank"
    );
}

// -----------------------------
// LOCAL STORAGE
// -----------------------------

function guardarCarrito() {
    localStorage.setItem(
        "carritoBruma",
        JSON.stringify(carrito)
    );
}

// -----------------------------
// MENSAJE
// -----------------------------

function mostrarMensaje(texto) {
    const mensaje = document.getElementById("mensaje");

    mensaje.textContent = texto;
    mensaje.classList.add("mostrar");

    setTimeout(function() {
        mensaje.classList.remove("mostrar");
    }, 2200);
}

// -----------------------------
// FORMATO DE PRECIO
// -----------------------------

function formatearPrecio(precio) {
    return "$" + precio.toLocaleString("es-AR");
}

// -----------------------------
// EVENTOS
// -----------------------------

buscador.addEventListener("input", mostrarProductos);
filtroPrecio.addEventListener("change", mostrarProductos);

document.getElementById("btnAgregarCarrito").addEventListener(
    "click",
    agregarCarrito
);

document.getElementById("cerrarCard").addEventListener(
    "click",
    cerrarCard
);

document.getElementById("botonCarrito").addEventListener(
    "click",
    function() {
        fondoCarrito.classList.add("abierto");
        document.body.classList.add("bloqueado");
    }
);

document.getElementById("cerrarCarrito").addEventListener(
    "click",
    function() {
        fondoCarrito.classList.remove("abierto");
        document.body.classList.remove("bloqueado");
    }
);

document.getElementById("vaciarCarrito").addEventListener(
    "click",
    vaciarCarrito
);

document.getElementById("finalizarCompra").addEventListener(
    "click",
    finalizarCompra
);

// Cerrar modal haciendo click fuera de la tarjeta
card.addEventListener("click", function(evento) {
    if (evento.target === card) {
        cerrarCard();
    }
});

// Cerrar carrito haciendo click en el fondo
fondoCarrito.addEventListener("click", function(evento) {
    if (evento.target === fondoCarrito) {
        fondoCarrito.classList.remove("abierto");
        document.body.classList.remove("bloqueado");
    }
});

// Cerrar con ESC
document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape") {
        cerrarCard();
        fondoCarrito.classList.remove("abierto");
        document.body.classList.remove("bloqueado");
    }
});

// -----------------------------
// INICIO
// -----------------------------

mostrarProductos();
mostrarCarrito();
