function testValidarCantidadVideos() {
    console.assert(
        validarCantidadVideos(0) === 'La cantidad de videos debe ser mayor que 0',
        'validarCantidadVideos no pudo validar que la cantidad de videos sea mayor que 0'
    )

    console.assert(
        validarCantidadVideos(-1) === 'La cantidad de videos no puede ser menor que 0',
        'validarCantidadVideos no pudo validar que la cantidad de videos no sea menor que 0'
    )

    console.assert(
        validarCantidadVideos(5000) === 'La cantidad de videos debe ser menor que 5000',
        'validarCantidadVideos no pudo validar que la cantidad de videos no sea mayor que 5000'
    )

    console.assert(
        validarCantidadVideos('i') === 'El campo cantidad de videos sólo acepta números',
        'validarCantidadVideos no pudo validar que la cantidad de videos sólo tenga números'
    )

    console.assert(
        validarCantidadVideos(10) === '',
        'validarCantidadVideos no funcionó con una cantidad de videos válida'
    )
}

testValidarCantidadVideos();


function testValidarDuracion() {
    console.assert(
        validarDuracion(-1, 'horas') === 'El campo horas no puede ser menor que 0',
        'validarDuracion no pudo validar que el campo de horas/minutos/segundos no sea menor que 0'
    )

    console.assert(
        validarDuracion(501, 'minutos') === 'El campo minutos no puede ser mayor que 500',
        'validarDuracion no pudo validar que el campo de horas/minutos/segundos no sea mayor que 500'
    )

    console.assert(
        validarDuracion('i', 'segundos') === 'El campo segundos sólo acepta números',
        'validarDuracion no pudo validar que el campo de horas/minutos/segundos sólo tenga números'
    )

    console.assert(
        validarDuracion(1, 'horas') === '',
        'validarDuracion no funcionó con una duracion (horas/minutos/segundos) válida'
    )
}

testValidarDuracion();
