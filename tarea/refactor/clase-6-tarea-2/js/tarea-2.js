// TAREA 2:
// Crear una interfaz que permita agregar ó quitar (botones 'Agregar' y 'Remover') 'inputs' + 'labels'
// para completar el salario anual de cada integrante de la familia que trabaje.
// Al hacer click en "Calcular", mostrar en un elemento pre-existente:
// El mayor salario anual, el menor salario anual, el salario anual promedio y el salario mensual promedio.

// BONUS: Si hay inputs vacíos, ignorarlos en el cálculo (NO contarlos como 0).


const $botonAgregar = document.querySelector('#agregar');

$botonAgregar.onclick = function (event) {
    crearInputSalarioAnual();

    manejarVisibilidadBotonCalcular($botonCalcular);


    event.preventDefault();
}


const $botonRemover = document.querySelector('#remover');

$botonRemover.onclick = function (event) {
    eliminarInputSalarioAnual();

    manejarVisibilidadBotonCalcular($botonCalcular);


    event.preventDefault();
}


const $botonReiniciar = document.querySelector('#reiniciar');

$botonReiniciar.onclick = function () {
    eliminarInputsExistentes();

    manejarVisibilidadBotonCalcular($botonCalcular);

    eliminarResultados();
}


const $botonCalcular = document.querySelector('#calcular');

$botonCalcular.onclick = function (event) {
    const $integrantes = document.querySelectorAll('#inputs-salario label');


    const errores = validarSalariosIntegrantes($integrantes);

    const hayErrores = manejarErroresSalarios(errores) > 0;

    if (!hayErrores) {
        const $salarios = document.querySelectorAll('.salario-anual');

        const salariosAnuales = convertirArray($salarios);

        const resultados = realizarCalculos(salariosAnuales);

        mostrarResultados(resultados);
    }


    event.preventDefault();
}



function crearInputSalarioAnual() {
    const nuevoLabel = document.createElement('label');
    const nuevoInput = document.createElement('input');
    const nuevoTexto = document.createTextNode(`Salario anual integrante #${contarNumeroIntegrante()}:`);
    const nuevoDiv = document.createElement('div');

    nuevoLabel.className = `integrante-${contarNumeroIntegrante()}`;
    nuevoInput.className = 'salario-anual';
    nuevoInput.type = 'number';
    nuevoDiv.className = 'error-salario error';

    nuevoLabel.appendChild(nuevoTexto);
    nuevoLabel.appendChild(nuevoInput);
    nuevoLabel.appendChild(nuevoDiv);


    const $salariosContainer = document.querySelector('#inputs-salario');

    $salariosContainer.appendChild(nuevoLabel);
}

function eliminarInputSalarioAnual() {
    const $salariosContainer = document.querySelector('#inputs-salario');

    if ($salariosContainer.hasChildNodes()) {
        $salariosContainer.removeChild($salariosContainer.lastElementChild);
    }
}


function eliminarInputsExistentes() {
    const $salariosContainer = document.querySelector('#inputs-salario');

    while ($salariosContainer.hasChildNodes()) {
        $salariosContainer.removeChild($salariosContainer.lastElementChild);
    }
}


function contarNumeroIntegrante() {
    const $integrantes = document.querySelectorAll('#inputs-salario label');

    const numeroActual = $integrantes.length;
    const numeroSiguiente = numeroActual + 1;

    return numeroSiguiente;
}



function manejarVisibilidadBotonCalcular(boton) {
    const $integrantes = document.querySelectorAll('#inputs-salario label');

    const botonVisible = !boton.classList.contains('oculto');
    const hayMinimoDosIntegrantes = $integrantes.length >= 2;

    if (!botonVisible && hayMinimoDosIntegrantes) {
        boton.classList.remove('oculto');
    } else if (botonVisible && !hayMinimoDosIntegrantes) {
        boton.classList.add('oculto');
    }
}



function validarSalariosIntegrantes(integrantes) {
    const errores = {}

    integrantes.forEach(function (integrante) {
        const $salarioAnual = integrante.querySelector('.salario-anual').value;
        const salarioAnual = Number($salarioAnual);

        const errorSalarioAnual = validarSalarioAnual(salarioAnual);

        const numeroIntegrante = integrante.className;

        errores[numeroIntegrante] = {
            'salario-anual': errorSalarioAnual
        }
    })

    return errores;
}

function validarSalarioAnual(salarioAnual) {
    if (salarioAnual === 0) {
        return 'El salario debe ser mayor que 0';
    }

    if (salarioAnual < 0) {
        return 'El salario no puede ser menor que 0';
    }

    if (salarioAnual > 999999999999999) {
        return 'El salario no puede superar los 15 dígitos';
    }

    if (!/^[0-9]+$/.test(salarioAnual)) {
        return 'El campo salario anual sólo acepta números';
    }

    return '';
}


function manejarErroresSalarios(errores) {
    const integrantes = Object.keys(errores);

    let contadorErrores = 0;

    integrantes.forEach(function (integrante) {
        const error = errores[integrante];
        const errorSalarioAnual = error['salario-anual'];

        const $input = document.querySelector(`.${integrante} .salario-anual`);
        const $elementError = document.querySelector(`.${integrante} .error-salario`);
        const errorExiste = $elementError.textContent !== '';


        if (errorSalarioAnual && errorExiste) {
            reemplazarErrorActual($elementError, errorSalarioAnual);

            contadorErrores += 1;
        } else if (errorSalarioAnual) {
            mostrarErrorSalario($input, $elementError, errorSalarioAnual);

            contadorErrores += 1;
        } else if (!errorSalarioAnual && errorExiste) {
            eliminarErrorSalario($input, $elementError);
        }
    })

    return contadorErrores;
}

function reemplazarErrorActual(elementError, nuevoError) {
    elementError.textContent = nuevoError;
}

function mostrarErrorSalario(input, elementError, error) {
    input.classList.add('border-error');
    elementError.textContent = error;
}

function eliminarErrorSalario(input, elementError) {
    input.classList.remove('border-error');
    elementError.textContent = '';
}



function convertirArray(salarios) {
    let array = [];

    salarios.forEach(function (salario) {
        const $salario = salario.value;
        const salarioAnual = Number($salario);

        array.push(salarioAnual);
    })

    return array;
}


function realizarCalculos(salariosAnuales) {
    const salarioAnualMayor = Math.max(...salariosAnuales);
    const salarioAnualMenor = Math.min(...salariosAnuales);
    const salarioAnualPromedio = calcularPromedio(salariosAnuales);

    const salariosMensuales = calcularSalariosMensuales(salariosAnuales);
    const salarioMensualPromedio = calcularPromedio(salariosMensuales);


    const resultados = {
        'salario-anual-mayor': salarioAnualMayor,
        'salario-anual-menor': salarioAnualMenor,
        'salario-anual-promedio': salarioAnualPromedio,
        'salario-mensual-promedio': salarioMensualPromedio
    }

    return resultados;
}

function calcularPromedio(salarios) {
    totalSalarios = 0;

    for (let i = 0; i < salarios.length; i++) {
        totalSalarios += salarios[i];
    }

    const resultado = totalSalarios / salarios.length;

    return resultado;
}

function calcularSalariosMensuales(salariosAnuales) {
    let salariosMensuales = [];

    const MESES_EN_ANIO = 12;

    for (let i = 0; i < salariosAnuales.length; i++) {
        const salarioAnual = salariosAnuales[i];

        const salarioMensual = salarioAnual / MESES_EN_ANIO;

        salariosMensuales.push(salarioMensual);
    }

    return salariosMensuales;
}



function mostrarResultados(resultados) {
    const $resultados = Object.keys(resultados);

    $resultados.forEach(function (output) {
        let resultado = resultados[output];

        if (output.includes('promedio')) {
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
