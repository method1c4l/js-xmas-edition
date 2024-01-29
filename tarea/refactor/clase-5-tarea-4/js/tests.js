function testValidarNumero() {
    console.assert(
        validarNumero(0) === 'El número debe ser mayor que 0',
        'validarNumero no pudo validar que el número sea mayor que 0'
    )

    console.assert(
        validarNumero('i') === 'El campo número sólo acepta números',
        'validarNumero no pudo validar que el campo de número solo tenga números'
    )

    console.assert(
        validarNumero(-23.5) === '',
        'validarNumero no funcionó con un número válido'
    )
}

testValidarNumero();
