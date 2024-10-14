// Inicializamos el carrito
let carrito = [];

// Número de WhatsApp al que se enviará el mensaje (en formato internacional)
const numeroWhatsApp = "5493735417958"; // Reemplaza con el número deseado

// Función para cargar el carrito desde localStorage
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        actualizarCarrito();  // Refrescamos el DOM con los productos cargados
    }
}

// Función para guardar el carrito en localStorage
function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Función para agregar un producto al carrito
function agregarAlCarrito(nombreProducto, precio) {
    carrito.push({ nombre: nombreProducto, precio: precio });
    guardarCarrito(); // Guardamos el carrito
    actualizarCarrito(); // Actualizamos el carrito visual
}

// Función para actualizar el carrito en el DOM
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = ''; // Limpiamos la lista

    let total = 0; // Inicializamos el total

    carrito.forEach((producto) => {
        const li = document.createElement('li');
        li.textContent = `${producto.nombre} - $${producto.precio}`;
        
        // Añadir un botón para eliminar el producto
        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = () => {
            eliminarDelCarrito(producto.nombre);
        };
        
        li.appendChild(btnEliminar);
        listaCarrito.appendChild(li);
        
        total += producto.precio; // Sumar al total
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`; // Actualizar el total
    document.getElementById('contador-carrito').textContent = `(${carrito.length})`; // Actualizar el contador
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(nombreProducto) {
    carrito = carrito.filter(producto => producto.nombre !== nombreProducto);
    guardarCarrito(); // Guardar cambios
    actualizarCarrito(); // Actualizar visual
}

// Función para mostrar y ocultar el carrito
function toggleCarrito() {
    const carritoPopup = document.getElementById('carrito-popup');
    carritoPopup.classList.toggle('mostrar');
}

// Función para construir el mensaje y abrir WhatsApp
function enviarPorWhatsApp(event) {
    event.preventDefault(); // Prevenir el comportamiento por defecto

    if (carrito.length === 0) {
        alert("El carrito está vacío.");
        return;
    }

    let mensaje = "¡Hola! quería realizar el siguiente pedido:\n\n";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `${item.nombre} - $${item.precio.toFixed(2)}\n`;
        total += item.precio;
    });

    mensaje += `\nTotal: $${total.toFixed(2)}`;

    // Codificamos el mensaje para la URL
    const mensajeCodificado = encodeURIComponent(mensaje);
    const enlaceWhatsApp = `https://api.whatsapp.com/send?phone=text=${numeroWhatsApp}&text=${mensajeCodificado}`;

    // Abrimos el enlace en una nueva ventana
    window.open(enlaceWhatsApp, "_blank");
}

// Asegúrate de que la función se llame al hacer clic en el botón
document.getElementById('enviarWhatsapp').onclick = enviarPorWhatsApp;

// Cargar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', cargarCarrito);
