const $formulario = document.formulario;

const nombreUsuario = $formulario.nombre.value;
// $nombreUsuario = document.querySelector('[name=nombre]');
// $nombreUsuario = document.querySelector('#nombre');

const ciudadUsuario = $formulario.ciudad.value;
const comportamientoUsuario = $formulario['comportamiento'].value;
const descripcionRegalo = $formulario['descripcion-regalo'].value;


function validarNombre(nombreUsuario) {
    if (nombreUsuario.length === 0) {
        return 'Este campo debe tener al menos 1 caracter';
    }

    if (nombreUsuario.length >= 50) {
        return 'Este campo debe tener menos de 50 caracteres';
    }

    return '';
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

function validarCiudad(ciudadUsuario) {
    if (ciudadUsuario.length === 0) {
        return 'Este campo es obligatorio';
    }

    return '';
}

function validarDescripcionRegalo(descripcionRegalo) {
    if (descripcionRegalo.length === 0) {
        return 'Este campo debe tener al menos 1 caracter';
    }

    if (descripcionRegalo.length >= 100) {
        return 'Este campo debe tener menos de 100 caracteres';
    }

    return '';
}
