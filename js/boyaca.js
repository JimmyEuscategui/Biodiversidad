// Coordenadas aproximadas del centro de Boyacá, Colombia
var boyacaCoordinates = [8.4545, -75.3620];
var zoomLevel = 8.5;

// Crear el mapa
var map = L.map('map', {
    center: boyacaCoordinates,
    zoom: zoomLevel,
    maxBounds: [[4.0, -75.0], [7.0, -71.0]],
    maxBoundsViscosity: 1.0,
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false
});

// Agregar la capa de mapa base de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var geojson;

// Función de estilo para los municipios
function getColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}

function style(feature) {
    return {
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7,
        fillColor: getColor(feature.properties.density) // Color inicial del polígono
    };
}

// Función para resaltar el municipio al pasar el cursor
function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7,
        fillColor: '#ffcc00' // Color de resaltado
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);
}

// Función para restablecer el resaltado del municipio
function resetHighlight(e) {
    geojson.resetStyle(e.target);
    info.update();
}

// Función para definir eventos en cada feature
function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: onClick
    });
}

// Cargar los límites municipales desde el archivo GeoJSON
fetch('../../json/Boyaca.geo.json')
    .then(response => response.json())
    .then(data => {
        geojson = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    });

var info = L.control();



info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); 
    this.update();
    return this._div;
};

info.update = function (props) {
    this._div.innerHTML = '<h4>Municipio</h4>' + (props ?
        '<b>' + props.NOMBRE_MPI + '</b><br />' 
        : 'Pase el cursor sobre un municipio');
};

info.addTo(map);

// Obtener el elemento 'info' por su clase
var infoDiv = document.querySelector('.info');

// Escuchar el evento de desplazamiento en la ventana
window.addEventListener('scroll', function() {
    // Obtener la posición actual de desplazamiento vertical
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Calcular la nueva posición del div
    var newTop = scrollTop + 20; // Por ejemplo, 20px por encima del borde superior de la ventana

    // Establecer la nueva posición del div
    infoDiv.style.top = newTop + 'px';
});

// Función para mostrar información al hacer clic en un municipio
function onClick(e) {
    var properties = e.target.feature.properties;
    info.update(properties);
}

