function testValidarNombre() {
    console.assert(
        validarNombre('') === 'Este campo debe tener al menos 1 caracter',
        'validarNombre no pudo validar que el nombre no sea vacío'
    )

    console.assert(
        validarNombre('11111111111111111111111111111111111111111111111111') === 'Este campo debe tener menos de 50 caracteres',
        'validarNombre no pudo validar que el nombre no supere los 50 caracteres'
    )

    console.assert(
        validarNombre('Pablo') === '',
        'validarNombre no funcionó con un nombre válido'
    )
}

testValidarNombre();


function testValidarCiudad() {
    console.assert(
        validarCiudad('') === 'Este campo es obligatorio',
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
        validarDescripcionRegalo('') === 'Este campo debe tener al menos 1 caracter',
        'validarDescripcionRegalo no pudo validar que la descripción del regalo no sea vacía'
    )

    console.assert(
        validarDescripcionRegalo(
            '1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111'
        ) === 'Este campo debe tener menos de 100 caracteres',
        'validarDescripcionRegalo no pudo validar que la descripción del regalo no supere los 100 caracteres'
    )

    console.assert(
        validarDescripcionRegalo('Guitarra') === '',
        'validarDescripcionRegalo no funcionó con una descripción de regalo válida'
    )
}

testValidarDescripcionRegalo();
