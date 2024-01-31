function testsValidarSalarioAnual() {
    console.assert(
        validarSalarioAnual(0) === 'El salario debe ser mayor que 0',
        'validarSalarioAnual no pudo validar que el salario anual sea mayor que 0'
    )

    console.assert(
        validarSalarioAnual(-1) === 'El salario no puede ser menor que 0',
        'validarSalarioAnual no pudo validar que el salario anual no sea menor que 0'
    )

    console.assert(
        validarSalarioAnual(1111111111111111) === 'El salario no puede superar los 15 dígitos',
        'validarSalarioAnual no pudo validar que el salario anual no supere los 15 dígitos'
    )

    console.assert(
        validarSalarioAnual('i') === 'El campo salario anual sólo acepta números',
        'validarSalarioAnual no pudo validar que el salario anual sólo tenga números'
    )

    console.assert(
        validarSalarioAnual(1000) === '',
        'validarSalarioAnual no funcionó con un salario anual válido'
    )
}

testsValidarSalarioAnual();
