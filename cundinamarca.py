import requests
#endpoint de la API de GBIF

url='https://api.gbif.org/v1/occurrence/search'

#parametros de busqueda

params = {
    'country':'CO', #Codigo del páis a buscar
    'limit':'1000' #numero de registros a obtener
}

#hacer una solicitud get a la api 
response = requests.get(url, params=params)

#Verificar que la solicitud fue exitosa
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
    print(listado)
else:
    print(f"Error al acceder a la API GBIF: {response.status_code}")