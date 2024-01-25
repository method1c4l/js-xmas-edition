// TAREA 2:
// Creá un formulario que capture el primer nombre, segundo nombre, apellido/s y edad del usuario.
// También vamos a crear un '<h1>' que diga 'Bienvenido!'.
// Crear un botón de acción que una vez que lo apretás, va a mostrar toda la información junta en un campo de texto,
// y va a cambiar el '<h1>' para decir "Bienvenido, nombreDeUsuario"!


const $formulario = document.formulario;

$formulario.onsubmit = function (event) {
    const usuario = obtenerDatosUsuario();

    const errores = validarDatosUsuario(usuario);

    const hayErrores = manejarErrores(errores) > 0;

    if (!hayErrores) {
        mostrarDatosUsuario(usuario);

        saludarUsuario(usuario.nombre);
    }


    event.preventDefault();
}


const $botonReiniciar = document.querySelector('#reiniciar');

$botonReiniciar.onclick = function () {
    eliminarSaludoUsuario();

    eliminarErrores();

    eliminarDatosUsuario();
}



function obtenerDatosUsuario() {
    const $nombreUsuario = $formulario.nombre.value;
    const nombreUsuario = $nombreUsuario.trim();

    const $apellidoUsuario = $formulario.apellido.value;
    const apellidoUsuario = $apellidoUsuario.trim();

    const $edadUsuario = $formulario.edad.value;
    const edadUsuario = Number($edadUsuario);

    const usuario = {
        nombre: nombreUsuario,
        apellido: apellidoUsuario,
        edad: edadUsuario
    }

    return usuario;
}


function validarDatosUsuario(datosUsuario) {
    const errorNombre = validarNombre(datosUsuario.nombre);
    const errorApellido = validarApellido(datosUsuario.apellido);
    const errorEdad = validarEdad(datosUsuario.edad);

    const errores = {
        nombre: errorNombre,
        apellido: errorApellido,
        edad: errorEdad
    }

    return errores;
}

function validarNombre(nombreUsuario) {
    if (nombreUsuario.length === 0) {
        return 'El nombre debe tener al menos 1 caracter';
    }

    if (nombreUsuario.length >= 50) {
        return 'El nombre debe tener menos de 50 caracteres';
    }

    if (!/^[a-zÀ-ü ]+$/i.test(nombreUsuario)) {
        return 'El campo nombre sólo acepta letras';
    }

    return '';
}

function validarApellido(apellidoUsuario) {
    if (apellidoUsuario.length === 0) {
        return 'El apellido debe tener al menos 1 caracter';
    }

    if (apellidoUsuario.length >= 50) {
        return 'El apellido debe tener menos de 50 caracteres';
    }

    if (!/^[a-zÀ-ü ]+$/i.test(apellidoUsuario)) {
        return 'El campo apellido sólo acepta letras';
    }

    return '';
}

function validarEdad(edadUsuario) {
    if (edadUsuario === 0) {
        return 'La edad debe ser mayor que 0';
    }

    if (edadUsuario < 0) {
        return 'La edad no puede ser menor que 0';
    }

    if (edadUsuario >= 130) {
        return 'La edad debe ser menor que 130';
    }

    if (!/^[0-9]+$/.test(edadUsuario)) {
        return 'El campo edad sólo acepta números';
    }

    return '';
}


function manejarErrores(errores) {
    const keys = Object.keys(errores);

    let contadorErrores = 0;

    keys.forEach(function (key) {
        const error = errores[key];

        if (error) {
            mostrarError(key, error);

            contadorErrores += 1;
        } else {
            eliminarError(key);
        }
    })

    return contadorErrores;
}

function mostrarError(tipo, error) {
    const $input = $formulario[tipo];
    const $error = document.querySelector(`#error-${tipo}`);

    $input.classList.add('border-error');
    $error.textContent = error;
}

function eliminarError(tipo) {
    const $input = $formulario[tipo];
    const $error = document.querySelector(`#error-${tipo}`);

    $input.classList.remove('border-error');
    $error.textContent = '';
}

function eliminarErrores() {
    const $inputs = document.querySelectorAll('.input');
    const $errores = document.querySelectorAll('.error');

    for (let i = 0; i < $inputs.length; i++) {
        $inputs[i].classList.remove('border-error');
        $errores[i].textContent = '';
    }
}


function mostrarDatosUsuario(datosUsuario) {
    const nombre = datosUsuario.nombre;
    const apellido = datosUsuario.apellido;
    const edad = datosUsuario.edad;


    const $output = document.querySelector('#datos-usuario');

    $output.textContent = `${nombre} ${apellido}, ${edad} años.`;
}

function eliminarDatosUsuario() {
    const $output = document.querySelector('#datos-usuario');

    $output.textContent = '';
}


function saludarUsuario(nombreUsuario) {
    const $titulo = document.querySelector('#titulo');

    $titulo.textContent = `¡Bienvenid@, ${nombreUsuario}!`;
}

function eliminarSaludoUsuario() {
    const $titulo = document.querySelector('#titulo');

    $titulo.textContent = '¡Bienvenid@!';
}
