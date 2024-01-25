function testValidarNombre() {
    console.assert(
        validarNombre('') === 'El nombre debe tener al menos 1 caracter',
        'validarNombre no pudo validar que el nombre no sea vacío'
    )

    console.assert(
        validarNombre('llllllllllllllllllllllllllllllllllllllllllllllllll') === 'El nombre debe tener menos de 50 caracteres',
        'validarNombre no pudo validar que el nombre no supere los 50 caracteres'
    )

    console.assert(
        validarNombre('12345') === 'El campo nombre sólo acepta letras',
        'validarNombre no pudo validar que el nombre sólo tenga letras'
    )

    console.assert(
        validarNombre('Pablo David') === '',
        'validarNombre no funcionó con un nombre válido'
    )
}

testValidarNombre();


function testValidarApellido() {
    console.assert(
        validarApellido('') === 'El apellido debe tener al menos 1 caracter',
        'validarApellido no pudo validar que el apellido no sea vacío'
    )

    console.assert(
        validarApellido('llllllllllllllllllllllllllllllllllllllllllllllllll') === 'El apellido debe tener menos de 50 caracteres',
        'validarApellido no pudo validar que el apellido no supere los 50 caracteres'
    )

    console.assert(
        validarApellido('12345') === 'El campo apellido sólo acepta letras',
        'validarApellido no pudo validar que el apellido sólo tenga letras'
    )

    console.assert(
        validarApellido('Álvarez') === '',
        'validarApellido no funcionó con un apellido válido'
    )
}

testValidarApellido();


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
        'validarEdad no pudo validar que la edad no sea mayor que 130'
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
