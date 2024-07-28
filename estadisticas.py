import requests
import json
import os

def fetch_gbif_data(state_province):
    # Endpoint de la API de GBIF
    url = 'https://api.gbif.org/v1/occurrence/search'

    # Parámetros de búsqueda
    params = {
        'country': 'CO',  # Código del país a buscar
        'limit': '1000',  # Número de registros a obtener
        'stateProvince': state_province  # Para buscar solo por el departamento
    }

    # Hacer una solicitud GET a la API
    response = requests.get(url, params=params)

    if response.status_code == 200:
        data = response.json()
        species_list = []
        type_count = {}
        image_count = 0
        unique_species = set()
        
        for record in data['results']:
            dic = {
                'nombre': record.get('species'),
                'tipo': record.get('kingdom'),
                'imagen': record.get('media')[0]['identifier'] if record.get('media') else None,
                'ubicacion': record.get('stateProvince'),
                'ciudad': record.get('verbatimLocality')
            }
            species_list.append(dic)
            
            # Contar tipos
            tipo = record.get('kingdom')
            if tipo in type_count:
                type_count[tipo] += 1
            else:
                type_count[tipo] = 1

            # Contar imágenes
            if record.get('media'):
                image_count += 1

            # Especies únicas
            unique_species.add(record.get('species'))

        return {
            'species': species_list,
            'type_count': type_count,
            'image_count': image_count,
            'unique_species_count': len(unique_species)
        }
    else:
        print(f"Error al acceder a la API GBIF: {response.status_code}")
        return {
            'species': [],
            'type_count': {},
            'image_count': 0,
            'unique_species_count': 0
        }

# Obtener datos y estadísticas para Boyacá
boyaca_data = fetch_gbif_data('Boyacá')

# Obtener datos y estadísticas para Cundinamarca
cundinamarca_data = fetch_gbif_data('Cundinamarca')

# Crear un diccionario con todos los datos
all_data = {
    'Boyaca': boyaca_data,
    'Cundinamarca': cundinamarca_data
}

# Guardar todos los datos en un archivo JSON
if not os.path.exists('static/data'):
    os.makedirs('static/data')

json_path = 'static/data/estadisticas_comparacion.json'
with open(json_path, 'w') as json_file:
    json.dump(all_data, json_file, ensure_ascii=False, indent=4)

print(f"Datos escritos correctamente en {json_path}")
