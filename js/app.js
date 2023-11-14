// Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners (){
    // Cuando agregas un curso presionando "Agregar al Carrito"
    listaCursos.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCruso);

    // Vaciar carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = []; // reseteamos el array
        limpiarHTML(); // Eliminamos todo el HTML
    })
}

// Funciones

function agregarCurso(e) {
    //Prevenimos que nos haga scroll hacia arriba luego de apretar el boton "Agregar al carrito"
    e.preventDefault();
    // Prevenimos el Event Bubbling
    if (e.target.classList.contains('agregar-carrito')) {
        const cursoSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Funcion para eliminar un curso del carrito
function eliminarCruso(e){
    // Usamos delegation para asegurarnos de que se ejecute la funcion al presionar en el boton
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id')
        // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML

    }
}
// Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso) {
    console.log(curso)
    // Crear un objeto con el contenido del curso actual
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    // Revisa si el elemento ya existe en el carrito 
    const existe = articulosCarrito.some( curso => curso.id === infoCurso.id)
    if(existe){
        //Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            } else {
                return curso; // Retorna los objetos que no son duplicados
            }
        } );
        articulosCarrito = [...cursos];
    } else{
        //Agregamos el curso al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }
    carritoHTML();
}

// Mostrar el carrito de compras en el HTML
function carritoHTML(){
    //Limpiar el HTML
    limpiarHTML();

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr')
        row.innerHTML = 
        `
        <td><img src="${imagen}" width="100"></td>
        <td>${titulo}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
        `
        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row);
    })
}
// Elimina los cursos del tbody
function limpiarHTML() {
    // Forma lenta de limpiar el HTML
    // contenedorCarrito.innerHTML = '';
    // Forma mas rápida y eficiente
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
        
    }
}