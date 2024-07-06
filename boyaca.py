import requests
import json
import os

#endpoint de la API de GBIF
url='https://api.gbif.org/v1/occurrence/search'

#parametros de busqueda
params = {
    'country':'CO', #Codigo del páis a buscar
    'limit':'1000', #numero de registros a obtener
    'stateProvince':'Boyacá' #para buscar solo por el departamento
}

#hacer una solicitud get a la api 
response = requests.get(url, params=params)

#Verificar que la solicitud fue exitosa
if response.status_code == 200:
    data = response.json()
    listado = []
    for record in data['results']:
        if 'Boyacá' in record.get('stateProvince'):
            dic = {
                'nombre': record.get('species'),
                'tipo': record.get('kingdom'),
                'imagen': record.get('media')[0]['identifier'] if record.get('media') else None,
                'ubicacion': record.get('stateProvince')
            }
            listado.append(dic)
    # Guardar los datos en un archivo JSON
    if not os.path.exists('static/data'):
        os.makedirs('static/data')
    
    with open('static/data/boyaca_especies.json', 'w') as json_file:
        json.dump(listado, json_file, ensure_ascii=False, indent=4)
    
    print("Datos escritos correctamente en static/data/boyaca_especies.json")
else:
    print(f"Error al acceder a la API GBIF: {response.status_code}")
