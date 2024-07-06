import requests
import json
import os

# endpoint de la API de GBIF
url = 'https://api.gbif.org/v1/occurrence/search'

# parámetros de búsqueda
params = {
    'country': 'CO',  # Código del país a buscar
    'limit': '1000'   # Número de registros a obtener
}

# hacer una solicitud get a la API
response = requests.get(url, params=params)

# Verificar que la solicitud fue exitosa
if response.status_code == 200:
    data = response.json()
    listado = []
    for record in data['results']:
        if 'Cundinamarca' in record.get('verbatimLocality'):
            dic = {
                'nombre': record.get('species'),
                'tipo': record.get('kingdom'),
                'imagen': record.get('media')[0]['identifier'] if record.get('media') else None,
                'ubicacion': record.get('verbatimLocality')
            }
            listado.append(dic)
    
    # Guardar los datos en un archivo JSON
    if not os.path.exists('static/data'):
        os.makedirs('static/data')
    
    with open('static/data/cundinamarca_especies.json', 'w') as json_file:
        json.dump(listado, json_file, ensure_ascii=False, indent=4)
    
    print("Datos escritos correctamente en static/data/cundinamarca_especies.json")
else:
    print(f"Error al acceder a la API GBIF: {response.status_code}")
