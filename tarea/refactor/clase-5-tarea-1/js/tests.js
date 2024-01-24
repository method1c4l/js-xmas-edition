function testValidarSalarioAnual() {
    console.assert(
        validarSalarioAnual(0) === 'El campo de salario anual es obligatorio',
        'validarSalarioAnual no pudo validar que el salario anual no sea vacío'
    )

    console.assert(
        validarSalarioAnual(-1) === 'El salario no puede ser un número negativo',
        'validarSalarioAnual no pudo validar que el salario no sea un número negativo'
    )

    console.assert(
        validarSalarioAnual(1111111111111111) === 'El salario no puede ser superar los 15 dígitos',
        'validarSalarioAnual no pudo validar que el salario no supere los 15 dígitos'
    )

    console.assert(
        validarSalarioAnual(NaN) === 'El campo de salario anual sólo acepta números',
        'validarSalarioAnual no pudo validar que el salario anual sólo tenga números'
    )

    console.assert(
        validarSalarioAnual(1000) === '',
        'validarSalarioAnual no funcionó con un salario válido'
    )
}

testValidarSalarioAnual();
