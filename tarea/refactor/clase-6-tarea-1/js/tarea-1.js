// TAREA 1:
// Empezar preguntando cuánta gente hay en el grupo familiar.
// Crear tantos 'inputs' + 'labels' como gente haya para completar la edad de cada integrante.
// Al hacer click en "Calcular", mostrar en un elemento pre-existente:
// La mayor edad, la menor edad y el promedio de edad del grupo familiar.

// BONUS: Crear un botón para "Empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados.
// Investigar cómo se hace en MDN.


const $formCantidad = document['form-cantidad'];

$formCantidad.onsubmit = function (event) {
    const $cantidadIntegrantes = $formCantidad['cantidad-integrantes'].value;
    const cantidadIntegrantes = Number($cantidadIntegrantes);


    const errorCantidad = validarCantidad(cantidadIntegrantes);

    const hayError = manejarErrorCantidad(errorCantidad);

    if (!hayError) {
        eliminarInputsExistentes();

        crearInputsEdad(cantidadIntegrantes);

        manejarVisibilidadBotonCalcular();

        eliminarResultados();
    }


    event.preventDefault();
}


const $botonReiniciar = document.querySelector('#reiniciar');

$botonReiniciar.onclick = function () {
    eliminarErrorCantidad();

    eliminarInputsExistentes();

    manejarVisibilidadBotonCalcular();

    eliminarResultados();
}


const $formEdades = document['form-edades'];

$formEdades.onsubmit = function (event) {
    const $integrantes = $formEdades.querySelectorAll('label');


    const errores = validarEdadesIntegrantes($integrantes);

    const hayErrores = manejarErroresEdades(errores) > 0;

    if (!hayErrores) {
        const $edades = document.querySelectorAll('.edad');

        const edades = convertirArray($edades);

        const resultados = realizarCalculos(edades);

        mostrarResultados(resultados);
    }


    event.preventDefault();
}



function validarCantidad(cantidadIntegrantes) {
    if (cantidadIntegrantes === 0) {
        return 'La cantidad de integrantes debe ser mayor que 0';
    }

    if (cantidadIntegrantes < 0) {
        return 'La cantidad de integrantes no puede ser menor que 0';
    }

    if (cantidadIntegrantes >= 100) {
        return 'La cantidad de integrantes debe ser menor que 100';
    }

    if (!/^[0-9]+$/.test(cantidadIntegrantes)) {
        return 'El campo cantidad de integrantes sólo acepta números';
    }

    return '';
}


function manejarErrorCantidad(error) {
    let hayError;

    if (error) {
        mostrarErrorCantidad(error);

        hayError = true;
    } else {
        eliminarErrorCantidad();

        hayError = false;
    }

    return hayError;
}

function mostrarErrorCantidad(error) {
    const $input = $formCantidad['cantidad-integrantes'];
    const $elementError = document.querySelector('#error-cantidad');

    $input.classList.add('border-error');
    $elementError.textContent = error;
}

function eliminarErrorCantidad() {
    const $input = $formCantidad['cantidad-integrantes'];
    const $elementError = document.querySelector('#error-cantidad');

    $input.classList.remove('border-error');
    $elementError.textContent = '';
}



function crearInputsEdad(cantidadIntegrantes) {
    for (let i = 0; i < cantidadIntegrantes; i++) {
        const nuevoLabel = document.createElement('label');
        const nuevoInput = document.createElement('input');
        const nuevoTexto = document.createTextNode(`Integrante #${i + 1}:`);
        const nuevoDiv = document.createElement('div');

        nuevoLabel.className = `integrante-${i + 1}`;
        nuevoInput.className = 'edad';
        nuevoInput.type = 'number';
        nuevoDiv.className = 'error-edad error';

        nuevoLabel.appendChild(nuevoTexto);
        nuevoLabel.appendChild(nuevoInput);
        nuevoLabel.appendChild(nuevoDiv);


        const $botonCalcular = document.querySelector('#calcular');

        $formEdades.insertBefore(nuevoLabel, $botonCalcular);
    }
}


function eliminarInputsExistentes() {
    const $integrantes = $formEdades.querySelectorAll('label');

    for (let i = 0; i < $integrantes.length; i++) {
        const integrante = $integrantes[i];

        integrante.remove();
    }
}


function manejarVisibilidadBotonCalcular() {
    const $botonCalcular = document.querySelector('#calcular');
    const $integrantes = $formEdades.querySelectorAll('label');

    const botonVisible = !$botonCalcular.classList.contains('oculto');
    const hayMinimoDosIntegrantes = $integrantes.length >= 2;

    if (!botonVisible && hayMinimoDosIntegrantes) {
        $botonCalcular.classList.remove('oculto');
    } else if (botonVisible && !hayMinimoDosIntegrantes) {
        $botonCalcular.classList.add('oculto');
    }
}



function validarEdadesIntegrantes(integrantes) {
    const errores = {}

    integrantes.forEach(function (integrante) {
        const $edad = integrante.querySelector('.edad').value;
        const edad = Number($edad);

        const errorEdad = validarEdad(edad);

        const numeroIntegrante = integrante.className;

        errores[numeroIntegrante] = {
            edad: errorEdad
        }
    })

    return errores;
}

function validarEdad(edad) {
    if (edad === 0) {
        return 'La edad debe ser mayor que 0';
    }

    if (edad < 0) {
        return 'La edad no puede ser menor que 0';
    }

    if (edad >= 130) {
        return 'La edad debe ser menor que 130';
    }

    if (!/^[0-9]+$/.test(edad)) {
        return 'El campo edad sólo acepta números';
    }

    return '';
}


function manejarErroresEdades(errores) {
    const integrantes = Object.keys(errores);

    let contadorErrores = 0;

    integrantes.forEach(function (integrante) {
        const error = errores[integrante];
        const errorEdad = error.edad;

        const $input = document.querySelector(`.${integrante} .edad`);
        const $elementError = document.querySelector(`.${integrante} .error-edad`);
        const errorExiste = $elementError.textContent !== '';


        if (errorEdad && errorExiste) {
            reemplazarErrorActual($elementError, errorEdad);

            contadorErrores += 1;
        } else if (errorEdad) {
            mostrarErrorEdad($input, $elementError, errorEdad);

            contadorErrores += 1;
        } else if (!errorEdad && errorExiste) {
            eliminarErrorEdad($input, $elementError);
        }
    })

    return contadorErrores;
}

function reemplazarErrorActual(elementError, nuevoError) {
    elementError.textContent = nuevoError;
}

function mostrarErrorEdad(input, elementError, error) {
    input.classList.add('border-error');
    elementError.textContent = error;
}

function eliminarErrorEdad(input, elementError) {
    input.classList.remove('border-error');
    elementError.textContent = '';
}



function convertirArray(edades) {
    const array = [];

    edades.forEach(function (edad) {
        const $edad = edad.value;
        const edadIntegrante = Number($edad);

        array.push(edadIntegrante);
    })

    return array;
}


function realizarCalculos(edades) {
    const edadMayor = Math.max(...edades);
    const edadMenor = Math.min(...edades);
    const edadPromedio = calcularPromedio(edades);

    const resultados = {
        'edad-mayor': edadMayor,
        'edad-menor': edadMenor,
        'edad-promedio': edadPromedio
    }

    return resultados;
}

function calcularPromedio(edades) {
    let totalEdades = 0;

    for (let i = 0; i < edades.length; i++) {
        totalEdades += edades[i];
    }

    const resultado = totalEdades / edades.length;

    return resultado;
}



function mostrarResultados(resultados) {
    const $resultados = Object.keys(resultados);

    $resultados.forEach(function (output) {
        let resultado = resultados[output];

        if (output === 'edad-promedio') {
            resultado = resultado.toFixed(2);
        }

        document.querySelector(`#${output} .resultado`).textContent = resultado;
    })


    const $resultadosContainer = document.querySelector('#resultados');

    $resultadosContainer.classList.remove('oculto');
}

function eliminarResultados() {
    const $resultados = document.querySelectorAll('.resultado');

    for (let i = 0; i < $resultados.length; i++) {
        const resultado = $resultados[i];

        resultado.textContent = '';
    }


    const $resultadosContainer = document.querySelector('#resultados');

    $resultadosContainer.classList.add('oculto');
}
