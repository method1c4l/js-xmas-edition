function testValidarCantidad() {
    console.assert(
        validarCantidad(0) === 'La cantidad de integrantes debe ser mayor que 0',
        'validarCantidad no pudo validar que la cantidad de integrantes sea mayor que 0'
    )
    console.assert(
        validarCantidad(-1) === 'La cantidad de integrantes no puede ser menor que 0',
        'validarCantidad no pudo validar que la cantidad de integrantes no sea menor que 0'
    )
    console.assert(
        validarCantidad(100) === 'La cantidad de integrantes debe ser menor que 100',
        'validarCantidad no pudo validar que la cantidad de integrantes sea menor que 100'
    )
    console.assert(
        validarCantidad('i') === 'El campo cantidad de integrantes sólo acepta números',
        'validarCantidad no pudo validar que la cantidad de integrantes sólo tenga números'
    )
    console.assert(
        validarCantidad(5) === '',
        'validarCantidad no funcionó con una cantidad de integrantes válida'
    )
}

testValidarCantidad();


function testValidarEdad() {
    console.assert(
        validarEdad(0) === 'La edad debe ser mayor que 0',
        'validarEdad no pudo validar que la edad sea mayor que 0'
    )
    console.assert(
        validarEdad(-1) === 'La edad no puede ser menor que 0',
        'validarEdad no pudo validar que la edad no sea menor que 0'
    )
    console.assert(
        validarEdad(130) === 'La edad debe ser menor que 130',
        'validarEdad no pudo validar que la edad sea menor que 130'
    )
    console.assert(
        validarEdad('i') === 'El campo edad sólo acepta números',
        'validarEdad no pudo validar que la edad sólo tenga números'
    )
    console.assert(
        validarEdad(27) === '',
        'validarEdad no funcionó con una edad válida'
    )
}

testValidarEdad();
