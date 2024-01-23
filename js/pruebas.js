function testValidarNombre() {
    console.assert(
        validarNombre('') === 'El campo de nombre debe tener al menos 1 caracter',
        'validarNombre no pudo validar que el nombre no sea vacío'
    )

    console.assert(
        validarNombre('llllllllllllllllllllllllllllllllllllllllllllllllll') === 'El campo de nombre debe tener menos de 50 caracteres',
        'validarNombre no pudo validar que el nombre no supere los 50 caracteres'
    )

    console.assert(
        validarNombre('12345') === 'El campo de nombre sólo acepta letras',
        'validarNombre no pudo validar que el nombre sólo tenga letras'
    )

    console.assert(
        validarNombre('Pablo') === '',
        'validarNombre no funcionó con un nombre válido'
    )
}

testValidarNombre();


function testValidarCiudad() {
    console.assert(
        validarCiudad('') === 'El campo de ciudad es obligatorio',
        'validarCiudad no pudo validar que la ciudad no sea vacía'
    )

    console.assert(
        validarCiudad('Buenos Aires') === '',
        'validarCiudad no funcionó con una ciudad válida'
    )
}

testValidarCiudad();


function testValidarDescripcionRegalo() {
    console.assert(
        validarDescripcionRegalo('') === 'El campo de descripción debe tener al menos 1 caracter',
        'validarDescripcionRegalo no pudo validar que la descripción del regalo no sea vacía'
    )

    console.assert(
        validarDescripcionRegalo(
            'llllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllllll'
        ) === 'El campo de descripción debe tener menos de 100 caracteres',
        'validarDescripcionRegalo no pudo validar que la descripción del regalo no supere los 100 caracteres'
    )

    console.assert(
        validarDescripcionRegalo('@&%#$') === 'El campo de descripción sólo acepta letras y números',
        'validarDescripcionRegalo no pudo validar que la descripción del regalo sólo tenga letras y números'
    )

    console.assert(
        validarDescripcionRegalo('Guitarra') === '',
        'validarDescripcionRegalo no funcionó con una descripción de regalo válida'
    )
}

testValidarDescripcionRegalo();
