// TAREA 3:
// Por cada clase de r/Argentina Programa existente, vamos a pedir horas, minutos y segundos de cada video.
// Ejemplo: Si un video dura 2 horas, 38 minutos y 20 segundos, vamos a rellenar 3 campos de texto con cada dato.
// Al apretar el botón "Calcular tiempo total", debe mostrar en un '<strong>' pre-creado el tiempo total de los videos.


const $formCantidad = document['form-cantidad'];

$formCantidad.onsubmit = function (event) {
    const $cantidadVideos = $formCantidad['cantidad-videos'].value;
    const cantidadVideos = Number($cantidadVideos);

    const errorCantidadVideos = validarCantidadVideos(cantidadVideos);

    const hayError = manejarErrorCantidad(errorCantidadVideos);

    if (!hayError) {
        eliminarInputsExistentes();

        crearConjuntoInputs(cantidadVideos);

        mostrarBotonCalcular();

        eliminarResultado();
    }


    event.preventDefault();
}


const $formDuracion = document['form-duracion'];

$formDuracion.onsubmit = function (event) {
    const $videos = document.querySelectorAll('fieldset');

    const errores = validarDuracionVideos($videos);

    const hayErrores = manejarErroresDuracion(errores) > 0;

    if (!hayErrores) {
        const duracionTotal = calcularDuracionTotal();

        mostrarResultado(duracionTotal);
    }


    event.preventDefault();
}


const $botonReiniciar = document.querySelector('#reiniciar');

$botonReiniciar.onclick = function () {
    const $input = $formCantidad['cantidad-videos'];
    const $elementError = document.querySelector('#error-cantidad');

    eliminarErrorCantidad($input, $elementError);

    eliminarInputsExistentes();

    ocultarBotonCalcular();

    eliminarResultado();
}



function validarCantidadVideos(cantidadVideos) {
    if (cantidadVideos === 0) {
        return 'La cantidad de videos debe ser mayor que 0';
    }

    if (cantidadVideos < 0) {
        return 'La cantidad de videos no puede ser menor que 0'
    }

    if (cantidadVideos >= 5000) {
        return 'La cantidad de videos debe ser menor que 5000'
    }

    if (!/^[0-9]+$/.test(cantidadVideos)) {
        return 'El campo cantidad de videos sólo acepta números';
    }

    return '';
}


function manejarErrorCantidad(error) {
    const $input = $formCantidad['cantidad-videos'];
    const $elementError = document.querySelector('#error-cantidad');

    let hayError;

    if (error) {
        mostrarErrorCantidad($input, $elementError, error);

        hayError = true;
    } else {
        eliminarErrorCantidad($input, $elementError);

        hayError = false;
    }

    return hayError;
}

function mostrarErrorCantidad(input, elementError, error) {
    input.classList.add('border-error');
    elementError.textContent = error;
}

function eliminarErrorCantidad(input, elementError) {
    input.classList.remove('border-error');
    elementError.textContent = '';
}



function crearConjuntoInputs(cantidadVideos) {
    for (let i = 0; i < cantidadVideos; i++) {
        const nuevoFieldset = document.createElement('fieldset');
        const nuevoLegend = document.createElement('legend');
        const nuevoTexto = document.createTextNode(`Video #${i + 1}`);
        const nuevoUl = document.createElement('ul');

        nuevoFieldset.className = `video-${i + 1}`;

        nuevoFieldset.appendChild(nuevoLegend);
        nuevoLegend.appendChild(nuevoTexto);

        crearInputs(nuevoFieldset);

        nuevoUl.className = 'errores-duracion';

        nuevoFieldset.appendChild(nuevoUl);


        const $botonCalcular = document.querySelector('#calcular');

        $formDuracion.insertBefore(nuevoFieldset, $botonCalcular);
    }
}

function crearInputs(fieldset) {
    const tipos = ['Horas', 'Minutos', 'Segundos'];

    for (let i = 0; i < tipos.length; i++) {
        const nuevoInput = document.createElement('input');

        const nombre = tipos[i];
        const clase = nombre.toLowerCase();

        nuevoInput.className = clase;
        nuevoInput.type = 'number';
        nuevoInput.placeholder = nombre;

        fieldset.appendChild(nuevoInput);
    }
}


function eliminarInputsExistentes() {
    const $inputs = document.querySelectorAll('fieldset');

    for (let i = 0; i < $inputs.length; i++) {
        $inputs[i].remove();
    }
}



function mostrarBotonCalcular() {
    const $botonCalcular = document.querySelector('#calcular');

    $botonCalcular.classList.remove('oculto');
}

function ocultarBotonCalcular() {
    const $botonCalcular = document.querySelector('#calcular');

    $botonCalcular.classList.add('oculto');
}



function validarDuracionVideos(videos) {
    const errores = {}

    videos.forEach(function (video) {
        const $horas = video.querySelector('.horas').value;
        const horas = Number($horas);

        const $minutos = video.querySelector('.minutos').value;
        const minutos = Number($minutos);

        const $segundos = video.querySelector('.segundos').value;
        const segundos = Number($segundos);


        const errorHoras = validarDuracion(horas, 'horas');
        const errorMinutos = validarDuracion(minutos, 'minutos');
        const errorSegundos = validarDuracion(segundos, 'segundos');

        const numeroVideo = video.className;

        errores[numeroVideo] = {
            horas: errorHoras,
            minutos: errorMinutos,
            segundos: errorSegundos
        }
    })

    return errores;
}

function validarDuracion(duracion, tipo) {
    if (duracion < 0) {
        return `El campo ${tipo} no puede ser menor que 0`;
    }

    if (duracion > 500) {
        return `El campo ${tipo} no puede ser mayor que 500`;
    }

    if (!/^[0-9]+$/.test(duracion)) {
        return `El campo ${tipo} sólo acepta números`;
    }

    return '';
}


function manejarErroresDuracion(errores) {
    const videos = Object.keys(errores);

    let contadorErrores = 0;

    videos.forEach(function (video) {
        const $errores = errores[video];

        const errorHoras = $errores.horas;
        const errorMinutos = $errores.minutos;
        const errorSegundos = $errores.segundos;

        const hayErrorHoras = verificarError(video, 'horas', errorHoras);

        if (hayErrorHoras) {
            contadorErrores += 1;
        }

        const hayErrorMinutos = verificarError(video, 'minutos', errorMinutos);

        if (hayErrorMinutos) {
            contadorErrores += 1;
        }

        const hayErrorSegundos = verificarError(video, 'segundos', errorSegundos);

        if (hayErrorSegundos) {
            contadorErrores += 1;
        }
    })

    return contadorErrores;
}

function verificarError(video, tipo, error) {
    const $input = document.querySelector(`.${video} .${tipo}`);

    const $listErrores = document.querySelector(`.${video} .errores-duracion`);

    const $elementError = $listErrores.querySelector(`.error-${tipo}`);
    const errorExiste = Boolean($elementError);

    let hayError = false;


    if (error && errorExiste) {
        reemplazarErrorActual($elementError, error);

        hayError = true;
    } else if (error) {
        aplicarBordeError($input);

        mostrarErrorDuracion($listErrores, tipo, error);

        hayError = true;
    } else if (!error && errorExiste) {
        eliminarErrorDuracion($input, $elementError);
    }

    return hayError;
}

function reemplazarErrorActual(elementError, nuevoError) {
    elementError.textContent = nuevoError;
}

function aplicarBordeError(input) {
    input.classList.add('border-error');
}

function mostrarErrorDuracion(listErrores, tipo, error) {
    const nuevoLi = document.createElement('li');

    nuevoLi.className = `error-${tipo} error`;
    nuevoLi.textContent = error;

    listErrores.appendChild(nuevoLi);
}

function eliminarErrorDuracion(input, elementError) {
    input.classList.remove('border-error');

    elementError.remove();
}



function calcularDuracionTotal() {
    const $horas = document.querySelectorAll('.horas');
    const $minutos = document.querySelectorAll('.minutos');
    const $segundos = document.querySelectorAll('.segundos');

    let totalHoras = sumar($horas);
    let totalMinutos = sumar($minutos);
    let totalSegundos = sumar($segundos);


    while (totalSegundos > 60) {
        totalMinutos += 1;

        totalSegundos -= 60;
    }

    while (totalMinutos > 60) {
        totalHoras += 1;

        totalMinutos -= 60;
    }

    const duracionTotal = {
        horas: totalHoras,
        minutos: totalMinutos,
        segundos: totalSegundos
    }

    return duracionTotal;
}

function sumar(duraciones) {
    let total = 0;

    duraciones.forEach(function (input) {
        const $duracion = input.value;
        const duracion = Number($duracion);

        if (duracion !== 0) {
            total += duracion;
        }
    })

    return total;
}



function mostrarResultado(duracionTotal) {
    const horas = duracionTotal.horas;
    const minutos = duracionTotal.minutos;
    const segundos = duracionTotal.segundos;

    const $output = document.querySelector('#tiempo-total');

    const mensaje = `La duración total de los videos es: ${horas} horas, ${minutos} minutos, ${segundos} segundos`;

    $output.textContent = mensaje;
}

function eliminarResultado() {
    const $output = document.querySelector('#tiempo-total');

    $output.textContent = '';
}
