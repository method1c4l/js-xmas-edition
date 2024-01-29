// TAREA 4:
// Crear una lista de '<ol>' y '<li>' que contengan sólo números.
// Convertir esos números a un array y:
// 1. Calcular el promedio y mostrarlo en un '<em>' pre-creado con el texto "El promedio es...".
// 2. Obtener el número más pequeño, y mostrarlo en un '<em>' pre-creado con el texto "El número más pequeño es...".
// 3. Obtener el número más grande, y mostrarlo en un '<em>' pre-creado con el texto "El número más grande es...".
// 4. Obtener el número que más se repite, y mostrarlo en un '<em>' pre-creado con el texto "El número más frecuente es...".


const $botonAgregar = document.querySelector('#agregar');

$botonAgregar.onclick = function (event) {
    const $numero = document.querySelector('#numero').value;
    const numero = Number($numero);


    const errorNumero = validarNumero(numero);

    const hayError = manejarError(errorNumero);

    if (!hayError) {
        agregarNumeroLista(numero);

        manejarVisibilidadBotonCalcular($botonCalcular);
    }


    event.preventDefault();
}


const $botonRemover = document.querySelector('#remover');

$botonRemover.onclick = function (event) {
    removerNumeroLista();

    manejarVisibilidadBotonCalcular($botonCalcular);


    event.preventDefault();
}


const $botonReiniciar = document.querySelector('#reiniciar');

$botonReiniciar.onclick = function () {
    eliminarError();

    reiniciarListaCompleta();

    manejarVisibilidadBotonCalcular($botonCalcular);

    eliminarResultados();
}


const $botonCalcular = document.querySelector('#calcular');

$botonCalcular.onclick = function (event) {
    const $numeros = document.querySelectorAll('#lista-numeros .ocupado');

    const numeros = convertirArray($numeros);

    const resultados = realizarCalculos(numeros);

    mostrarResultados(resultados);


    event.preventDefault();
}



function validarNumero(numero) {
    if (numero === 0) {
        return 'El número debe ser mayor que 0';
    }

    if (!/^[-0-9\.]+$/.test(numero)) {
        return 'El campo número sólo acepta números';
    }

    return '';
}


function manejarError(error) {
    let hayError;

    if (error) {
        mostrarError(error);

        hayError = true;
    } else {
        eliminarError();

        hayError = false;
    }

    return hayError;
}

function mostrarError(error) {
    const $input = document.querySelector('#numero');
    const $elementError = document.querySelector('#error-numero');

    $input.classList.add('border-error');
    $elementError.textContent = error;
}

function eliminarError() {
    const $input = document.querySelector('#numero');
    const $elementError = document.querySelector('#error-numero');

    $input.classList.remove('border-error');
    $elementError.textContent = '';
}



function agregarNumeroLista(numero) {
    const $espaciosVacios = document.querySelectorAll('#lista-numeros .vacio');
    const hayEspacio = $espaciosVacios.length > 0;

    if (hayEspacio) {
        const espacioVacio = $espaciosVacios[0];

        espacioVacio.textContent = numero;
        espacioVacio.className = 'ocupado';
    }
}

function removerNumeroLista() {
    const $numeros = document.querySelectorAll('#lista-numeros .ocupado');

    const cantidadNumeros = $numeros.length;
    const existeNumero = cantidadNumeros > 0;

    if (existeNumero) {
        const ultimoNumero = $numeros[cantidadNumeros - 1];

        ultimoNumero.textContent = '-';
        ultimoNumero.className = 'vacio';
    }
}

function reiniciarListaCompleta() {
    const $numeros = document.querySelectorAll('#lista-numeros .ocupado');

    for (let i = 0; i < $numeros.length; i++) {
        const numero = $numeros[i];

        numero.textContent = '-';
        numero.className = 'vacio';
    }
}



function manejarVisibilidadBotonCalcular(boton) {
    const $numeros = document.querySelectorAll('#lista-numeros .ocupado');

    const botonVisible = !boton.classList.contains('oculto');
    const hayMinimoDosNumeros = $numeros.length >= 2;

    if (!botonVisible && hayMinimoDosNumeros) {
        boton.classList.remove('oculto');
    } else if (botonVisible && !hayMinimoDosNumeros) {
        boton.classList.add('oculto');
    }
}



function convertirArray(numeros) {
    let array = [];

    for (let i = 0; i < numeros.length; i++) {
        const $numero = numeros[i].textContent;
        const numero = Number($numero);

        array.push(numero);
    }

    return array;
}


function realizarCalculos(numeros) {
    const numeroPromedio = calcularPromedio(numeros);
    const numeroMenor = Math.min(...numeros);
    const numeroMayor = Math.max(...numeros);
    const numeroRepetido = extraerNumeroRepetido(numeros);

    const resultados = {
        'numero-promedio': numeroPromedio,
        'numero-menor': numeroMenor,
        'numero-mayor': numeroMayor,
        'numero-repetido': numeroRepetido
    }

    return resultados;
}

function calcularPromedio(numeros) {
    let totalNumeros = 0;

    for (let i = 0; i < numeros.length; i++) {
        totalNumeros += numeros[i];
    }

    const resultado = totalNumeros / numeros.length;

    return resultado;
}

function extraerNumeroRepetido(numeros) {
    const frecuencias = {}

    let numeroRepetido;
    let maxRepeticiones = 1;

    for (let i = 0; i < numeros.length; i++) {
        const numero = numeros[i];

        if (frecuencias[numero]) {
            frecuencias[numero] += 1;
        } else {
            frecuencias[numero] = 1;
        }

        if (frecuencias[numero] >= maxRepeticiones) {
            numeroRepetido = numero;
            maxRepeticiones = frecuencias[numero];
        }
    }

    if (maxRepeticiones === 1) {
        return 'No se repite ningún número';
    } else {
        return numeroRepetido;
    }
}



function mostrarResultados(resultados) {
    const $resultados = Object.keys(resultados);

    $resultados.forEach(function (output) {
        let resultado = resultados[output];

        if (output === 'numero-promedio') {
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
