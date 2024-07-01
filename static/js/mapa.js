var map = L.map('map').setView([4.5709, -74.2973], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    attribution: '© OpenStreetMap'
}).addTo(map);

var geojson;
var highlightedDepartment = null; // Variable global para almacenar el nombre del departamento resaltado
var alertShown = false; // Variable global para controlar la aparición de la alerta

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
        fillColor: getColor(feature.properties.density)
    };
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });

    if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
    }

    info.update(layer.feature.properties);

    // Guardar el nombre del departamento resaltado en una variable
    highlightedDepartment = layer.feature.properties.NOMBRE_DPT;
}

function resetHighlight(e) {
    geojson.resetStyle(e.target);
    highlightedDepartment = null; // Resetear la variable cuando el departamento no está resaltado
    alertShown = false; // Resetear la variable cuando el departamento no está resaltado
}

function onEachFeature(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: function(e) {
            if (highlightedDepartment) {
                var url = '/departamentos/' + highlightedDepartment.toLowerCase();
                fetch(url)
                    .then(response => {
                        if (response.ok) {
                            window.location.href = url;
                        } else {
                            alert('No hay una vista disponible para este departamento.');
                        }
                    })
                    .catch(() => {
                        alert('No hay una vista disponible para este departamento.');
                    });
            }
        }
    });
}




fetch('../static/json/Colombia.geo.json')
    .then(response => response.json())
    .then(data => {
        geojson = L.geoJson(data, {
            style: style,
            onEachFeature: onEachFeature
        }).addTo(map);
    });

var info = L.control();

info.onAdd = function (map) {
    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
    this.update();
    return this._div;
};

// method that we will use to update the control based on feature properties passed
info.update = function (props) {
    this._div.innerHTML = '<h4>Departamento</h4>' + (props ?
        '<b>' + props.NOMBRE_DPT + '</b><br />' + 'Capital: ' + props.CAPITAL
        + '</b><br />' + 'Población: ' + props.POBLACION +
        '<br /><br />'
        : 'Pase el cursor sobre un departamento');
};

info.addTo(map);
