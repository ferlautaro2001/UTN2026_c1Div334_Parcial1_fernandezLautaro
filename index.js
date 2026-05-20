// Obtiene el carrito del localStorage y lo retorna como array.
function obtenerCarrito() {
    let carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}

// Guarda el carrito recibido en localStorage como string.
function guardarCarrito(carrito) {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Retorna el índice del botón clickeado dentro del selector recibido.
function obtenerIndiceBoton(elementoClickeado, selectorBotones) {
    let botones = document.querySelectorAll(selectorBotones);
    let indiceEncontrado = -1; // Bandera.

    for (let i = 0; i < botones.length; i++) {
        if (botones[i] === elementoClickeado) {
            indiceEncontrado = i; // Cambiamos bandera por índice.
            break; // Dejamos de consumir memoria que no hace falta.
        }
    }

    return indiceEncontrado;
}

// Retorna un objeto producto construido a partir del índice recibido.
function obtenerProductoPorIndice(indice) {
    let nombre = document.querySelectorAll(".nombre-producto")[indice].textContent;
    let precio = parseInt(document.querySelectorAll(".precio-producto")[indice].textContent.replace("$", ""), 10);

    return { nombre, precio, cantidad: 1 };
}

// Retorna el índice del producto en el carrito según su nombre, o -1 si no existe.
function buscarIndiceProducto(carrito, nombreProducto) {
    let indiceEncontrado = -1; // Bandera.

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].nombre === nombreProducto) {
            indiceEncontrado = i; // Guardamos la posición
            break; // Frenamos el bucle para no seguir gastando memoria
        }
    }

    return indiceEncontrado; // Retornamos
}

// Obtiene el producto clickeado y su estado actual dentro del carrito,
// retornando el carrito completo, el producto seleccionado y su índice.
function obtenerContextoEvento(e, selectorBotones) {
    let indiceBoton = obtenerIndiceBoton(e.target, selectorBotones);
    let productoSeleccionado = obtenerProductoPorIndice(indiceBoton);
    let carrito = obtenerCarrito();
    let indiceProducto = buscarIndiceProducto(carrito, productoSeleccionado.nombre);

    return { carrito, productoSeleccionado, indiceProducto };
}

// Una práctica extra que me quedó de Progra 1, para dividir responsabilidad ahora aplicada a objetos.
const mensajes = {
    agregado: (nombre) => alert("Un/una: " + nombre + " fue agregado al carrito"),
    eliminado: (nombre) => alert("Un/una: " + nombre + " fue eliminado del carrito"),
    noHayMas: (nombre) => alert("No hay más " + nombre + " en el carrito"),
    carritoVacio: () => alert("No hay ningún producto guardado en el carrito")
};

// Suma o resta una unidad del producto clickeado según la acción recibida ("sumar" o "restar").
function actualizarCarrito(e, accion) {

    const selectores = {
        sumar: ".btn-sumar-a-carrito",
        restar: ".btn-restar-a-carrito"
    };

    let selector = selectores[accion];

    // Excelente oportunidad para aplicar el destructuring que vimos en la última clase. 
    let { carrito, productoSeleccionado, indiceProducto } = obtenerContextoEvento(e, selector);

    if (accion === "sumar") {
        if (indiceProducto === -1) {
            carrito.push(productoSeleccionado);
        } else {
            carrito[indiceProducto].cantidad = carrito[indiceProducto].cantidad + productoSeleccionado.cantidad;
        }
        mensajes.agregado(productoSeleccionado.nombre);

    } else {
        // Si se intenta eliminar un producto pero el carrito está vacío
        if (carrito.length === 0) {
            mensajes.carritoVacio();
            return;
        }

        // Si el carrito tiene cosas, pero NO existía previamente este producto
        if (indiceProducto === -1) {
            mensajes.noHayMas(productoSeleccionado.nombre);
            return;
        }

        // Si existía, se resta en 1 y se avisa cuál se eliminó
        carrito[indiceProducto].cantidad = carrito[indiceProducto].cantidad - 1;
        mensajes.eliminado(productoSeleccionado.nombre);

        // El carrito NO almacena productos con cantidad en 0
        if (carrito[indiceProducto].cantidad === 0) {
            carrito.splice(indiceProducto, 1);
        }
    }

    console.log(carrito); // Imprimimos en consola antes de subirlo
    guardarCarrito(carrito);
}

window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", (e) => actualizarCarrito(e, "sumar")));
    botonesRestar.forEach(btn => btn.addEventListener("click", (e) => actualizarCarrito(e, "restar")));
});