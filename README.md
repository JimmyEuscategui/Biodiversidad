# Bienvenido al repositorio de Biodiversidad: Boyacá y Cundinamarca


Este proyecto es una aplicación web desarrollada con FastAPI que presenta estadísticas interactivas sobre la biodiversidad en los departamentos de Boyacá y Cundinamarca. Utilizando datos de la API de GBIF, la aplicación ofrece gráficos detallados y visualmente atractivos que permiten a los usuarios explorar y analizar la distribución y diversidad de especies en estas regiones.

## Instalación

Debes tener instalado lo siguiente:

- Python 3.8+
- FastAPI
- Uvicorn
- Requests
- Jinja2

------------

### Pasos de instalación

1. **Clona el repositorio:**
    ```sh
    git clone https://github.com/JimmyEuscategui/Biodiversidad.git
    cd Biodiversidad
    ```

2. **Crea un entorno virtual:**
    ```sh
    python -m venv env
    source env/bin/activate  # En Windows usa `env\Scripts\activate`
    ```

3. **Instala las dependencias:**
    ```sh
    pip install -r requirements.txt
    ```

4. **Ejecuta la aplicación:**
    ```sh
    uvicorn main:app --reload
    ```

### Configuración adicional

- Asegúrate de tener acceso a la API de GBIF y configurar las variables de entorno necesarias.
- Si deseas modificar el estilo de la aplicación, edita los archivos CSS y JavaScript ubicados en las carpetas `static/css` y `static/js`.

## Uso

La aplicación te permitirá:
- Ver estadísticas interactivas de la biodiversidad en Boyacá y Cundinamarca.
- Cambiar entre vistas detalladas de cada departamento.
- Utilizar filtros para ajustar los datos mostrados en los gráficos y las imagenes.


