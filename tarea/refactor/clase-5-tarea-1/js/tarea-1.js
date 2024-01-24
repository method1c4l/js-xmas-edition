// TAREA 1:
// Crear un formulario donde el usuario pueda ingresar su salario anual.
// Cuando el usuario haga click en el botón "Calcular", mostrar el salario mensual en una caja de texto deshabilitada.
// <input id="salario-mensual" type="text" disabled/>


const $formulario = document.formulario;

$formulario.onsubmit = function (event) {
    const $salarioAnual = $formulario['salario-anual'].value;
    const salarioAnual = Number($salarioAnual);


    const errorSalarioAnual = validarSalarioAnual(salarioAnual);

    const hayError = manejarError(errorSalarioAnual);

    if (!hayError) {
        const resultadoSalarioMensual = calcularSalarioMensual(salarioAnual);

        mostrarResultado(resultadoSalarioMensual);
    }


    event.preventDefault();
}


const $botonReiniciar = document.querySelector('#reiniciar');

$botonReiniciar.onclick = function () {
    eliminarError();

    eliminarResultado();
}



function validarSalarioAnual(salarioAnual) {
    if (salarioAnual === 0) {
        return 'El campo de salario anual es obligatorio';
    }

    if (salarioAnual < 0) {
        return 'El salario no puede ser un número negativo';
    }

    if (salarioAnual > 999999999999999) {
        return 'El salario no puede ser superar los 15 dígitos';
    }

    if (Number.isNaN(salarioAnual)) {
        return 'El campo de salario anual sólo acepta números';
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
    const $salarioAnual = $formulario['salario-anual'];
    const $error = document.querySelector('#error');

    $salarioAnual.classList.add('border-error');
    $error.textContent = error;
}

function eliminarError() {
    const $salarioAnual = $formulario['salario-anual'];
    const $error = document.querySelector('#error');

    $salarioAnual.classList.remove('border-error');
    $error.textContent = '';
}


function calcularSalarioMensual(salarioAnual) {
    const MESES_EN_ANIO = 12;

    const salarioMensual = salarioAnual / MESES_EN_ANIO;

    return salarioMensual;
}


function mostrarResultado(resultadoSalarioMensual) {
    const $salarioMensual = document.querySelector('#salario-mensual');

    $salarioMensual.value = resultadoSalarioMensual.toFixed(2);
}

function eliminarResultado() {
    const $salarioMensual = document.querySelector('#salario-mensual');

    $salarioMensual.value = '';
}
