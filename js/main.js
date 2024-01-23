const $formulario = document.formulario;

$formulario.onsubmit = validarFormulario;
// Cliente -> $formulario.onsubmit(new ClickEvent());


function validarFormulario(event) {
    const nombreUsuario = $formulario.nombre.value;
    // $nombreUsuario = document.querySelector('[name=nombre]');
    // $nombreUsuario = document.querySelector('#nombre');

    const ciudadUsuario = $formulario.ciudad.value;
    const descripcionRegalo = $formulario['descripcion-regalo'].value;


    const errorNombre = validarNombre(nombreUsuario);
    const errorCiudad = validarCiudad(ciudadUsuario);
    const errorDescripcionRegalo = validarDescripcionRegalo(descripcionRegalo);

    const errores = {
        nombre: errorNombre,
        ciudad: errorCiudad,
        'descripcion-regalo': errorDescripcionRegalo
        // descripcionRegalo: value
    }

    const hayErrores = manejarErrores(errores) > 0;

    if (!hayErrores) {
        $formulario.className = 'oculto';

        document.querySelector('#exito').className = '';

        setTimeout(function () {
            window.location.href = 'wishlist.html';
        }, 5000);
    }


    event.preventDefault();
}



function manejarErrores(errores) {
    /* DYNAMIC */
    const keys = Object.keys(errores);

    let contadorErrores = 0;

    keys.forEach(function (key) {
        const error = errores[key];

        const elementoError = document.querySelector(`.${key}`);
        const errorExiste = Boolean(elementoError);

        if (error && !errorExiste) {
            $formulario[key].className = 'error';
            // Esto solo funciona si la "key" tiene el mismo nombre que el "name" del elemento en HTML.

            mostrarError(key, error);

            contadorErrores += 1;
        } else if (!error && errorExiste) {
            $formulario[key].className = '';

            elementoError.remove();
        } else if (error && errorExiste) {
            elementoError.textContent = error;

            contadorErrores += 1;
        }
    })

    return contadorErrores;


    /* HARD-CODED */
    // errorNombre = errores.nombre;
    // errorCiudad = errores.ciudad;
    // errorDescripcionRegalo = errores['descripcion-regalo'];


    // if (errorNombre) {
    //     $formulario.nombre.className = 'error';
    // } else {
    //     $formulario.nombre.className = '';
    // }

    // if (errorCiudad) {
    //     $formulario.ciudad.className = 'error';
    // } else {
    //     $formulario.ciudad.className = '';
    // }

    // if (errorDescripcionRegalo) {
    //     $formulario['descripcion-regalo'].className = 'error';
    // } else {
    //     $formulario['descripcion-regalo'].className = '';
    // }
}

function mostrarError(key, error) {
    const $error = document.createElement('li');
    $error.classList.add(key);
    $error.textContent = error;

    const $erroresContainer = document.querySelector('#errores');
    $erroresContainer.appendChild($error);
}


// function validarNombre(nombreUsuario) {
//     if (nombreUsuario.length === 0) {
//         return 'Este campo debe tener al menos 1 caracter';
//     } else if (nombreUsuario.length >= 50) {
//         return 'Este campo debe tener menos de 50 caracteres';
//     } else {
//         return '';
//     }
// }

function validarNombre(nombreUsuario) {
    if (nombreUsuario.length === 0) {
        return 'El campo de nombre debe tener al menos 1 caracter';
    }

    if (nombreUsuario.length >= 50) {
        return 'El campo de nombre debe tener menos de 50 caracteres';
    }

    if (!/^[a-z]+$/i.test(nombreUsuario)) {
        return 'El campo de nombre sólo acepta letras';
    }

    return '';
}

function validarCiudad(ciudadUsuario) {
    if (ciudadUsuario.length === 0) {
        return 'El campo de ciudad es obligatorio';
    }

    return '';
}

function validarDescripcionRegalo(descripcionRegalo) {
    if (descripcionRegalo.length === 0) {
        return 'El campo de descripción debe tener al menos 1 caracter';
    }

    if (descripcionRegalo.length >= 100) {
        return 'El campo de descripción debe tener menos de 100 caracteres';
    }

    // [a-z0-9,\._ ] // "." === any character
    if (!/^[a-z0-9]+$/i.test(descripcionRegalo)) {
        return 'El campo de descripción sólo acepta letras y números';
    }

    return '';
}



/* Event Bubbling */

// It happens when an element receives an event, and that event bubbles up
// (or you can say is transmitted or propagated) to its parent and ancestor elements in the DOM tree
// until it gets to the root element (html). This is the default beheavior of events on elements
// unless you stop the propagation (event.preventDefault()).


/* JSON - JavaScript Object Notation */

// const objeto = {
//     p1: 'Hola 1',
//     p2: function () { console.log('Hola 2'); },
//     p3: 123,
//     p4: { p5: 'Hola 5' },
//     p6: [{ p7: 'Hola 7' }]
// }

// objeto.p1 === 'Hola 1'

// objeto.p2 === f() { console.log('Hola 2'); }
// objeto.p2() === Hola 2

// objeto.p3 === 123

// objeto.p4 === { p5: 'Hola 5' }
// objeto.p4.p5 === 'Hola 5'

// objeto.p6 === [{...}]
// objeto.p6[0] === { p7: 'Hola 7' }
// objeto.p6[0].p7 === 'Hola 7'


// keys.forEach(function (
//     Even if empty, the client uses each element as argument. Doesn't matter what name you put in here.
//     ) {...})
// element.onclick = function (
//     Even if empty, the client uses the event as argument. Doesn't matter what name you put in here.
//     ) {...}
