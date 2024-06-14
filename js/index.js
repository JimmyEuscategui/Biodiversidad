$(document).ready(function(){
    // Asegurarse de que el div esté oculto al cargar la página
    $('#container-mapa').hide();

    $('.button-map').click(function(){
        $('#container-mapa').toggle();

        // Cambiar el texto del botón basado en la visibilidad del div
        if ($('#container-mapa').is(':visible')) {
            $('.button-map').document('.button-map');
        } else {
            $('.button-map').document('.button-map');
            
        }
    });

});