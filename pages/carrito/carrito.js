function obtenerCarrito() 
{
    let carritoGuardado = localStorage.getItem("carrito");
    
    // Convertimos a array si existe, sino array vacío.
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
}
function obtenerFilaHeader() 
{
    // Retornamos HTML del encabezado de la tabla.
    return "<tr class='fila-header-carrito'><td class='celda-header-tabla-carrito'>Nombre del producto</td><td class='celda-header-tabla-carrito'>Cantidad</td><td class='celda-header-tabla-carrito'>Precio unitario</td></tr>";
}

function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito"); // Capturamos la tabla.
    let valorFinal = document.getElementById("valor-final"); // Capturamos el contenedor del total.
    let carrito = obtenerCarrito(); // Usamos la función de antes.
    let total = 0; // Acumulador para el precio.

    tabla.innerHTML = obtenerFilaHeader(); // Limpiamos y establecemos encabezado.

    for (let i = 0; i < carrito.length; i++) 
    {
        if (carrito[i].cantidad >= 1) // Si hay productos en el carrito.
        {
            // Agregamos fila con datos del producto.
            tabla.innerHTML = tabla.innerHTML + "<tr><td>" + carrito[i].nombre + "</td><td>" + carrito[i].cantidad + "</td><td>$" + carrito[i].precio + "</td></tr>";
            total = total + carrito[i].precio * carrito[i].cantidad; // Sumamos al subtotal.
        }
    }

    valorFinal.textContent = "El valor final a pagar es de: $" + total; // Damos valor al HTML.
}

function limpiarCarrito() 
{
    let tabla = document.getElementById("tabla-carrito"); // Capturamos la tabla.
    let valorFinal = document.getElementById("valor-final"); // Capturamos el total.

    localStorage.removeItem("carrito"); // Borramos el carrito del almacenamiento local.
    tabla.innerHTML = obtenerFilaHeader(); // Reiniciamos la tabla solo con el encabezado.
    valorFinal.textContent = "El valor final a pagar es de: $0"; // Resetea el texto del total.
    alert("Carrito limpiado correctamente"); // Notificación para el usuario.
}

// Asociar evento al botón 
window.addEventListener("DOMContentLoaded", () => {
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});
