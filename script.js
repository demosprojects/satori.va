let carrito = [];

// Función para agregar productos al carrito con su precio
function agregarAlCarrito(producto, precio) {
    carrito.push({ nombre: producto, precio: precio });
    actualizarCarrito();
}

// Función para actualizar la lista del carrito, el contador y el total
function actualizarCarrito() {
    const listaCarrito = document.getElementById('lista-carrito');
    const contadorCarrito = document.getElementById('contador-carrito');
    const totalCarrito = document.getElementById('total-carrito');
    listaCarrito.innerHTML = '';
    
    let total = 0;

    carrito.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.nombre} - $${item.precio.toFixed(2)}`;
        listaCarrito.appendChild(li);
        total += item.precio;
    });

    if (carrito.length === 0) {
        listaCarrito.innerHTML = '<li>No hay productos en el carrito.</li>';
        total = 0;
    }

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
    contadorCarrito.textContent = `(${carrito.length})`;

    actualizarBotonWhatsApp();
}

// Función para actualizar el enlace de WhatsApp con productos y precios
function actualizarBotonWhatsApp() {
    const enviarWhatsapp = document.getElementById('enviarWhatsapp');
    const mensaje = `https://api.whatsapp.com/send?phone=+54 9 3735 417958&text=Hola,%20me%20gustaría%20comprar%20los%20siguientes%20productos:%0A${carrito.map(item => item.nombre + ' - $' + item.precio.toFixed(2)).join('%0A')}%0ATotal:%20$${carrito.reduce((acc, item) => acc + item.precio, 0).toFixed(2)}`;
    enviarWhatsapp.setAttribute('href', mensaje);
}

// Función para abrir/cerrar el carrito popup
function toggleCarrito() {
    const carritoPopup = document.getElementById('carrito-popup');
    carritoPopup.style.display = carritoPopup.style.display === 'flex' ? 'none' : 'flex';
}
