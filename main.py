from fastapi import FastAPI, Request, HTTPException
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import json
from pathlib import Path

app = FastAPI()

# Montar la carpeta 'static'
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("inicio.html", {"request": request})

@app.get("/departamentos/{department_name}", response_class=HTMLResponse)
async def get_department(request: Request, department_name: str, filter: str = "all"):
    template_path = Path(f"templates/departamentos/{department_name}.html")
    if template_path.exists():
        especies = []
        json_path = ''
        if department_name.lower() == "boyaca":
            json_path = 'static/data/boyaca_especies.json'
        elif department_name.lower() == "cundinamarca":
            json_path = 'static/data/cundinamarca_especies.json'
        
        if json_path and Path(json_path).exists() and Path(json_path).stat().st_size > 0:
            with open(json_path, 'r') as json_file:
                try:
                    especies = json.load(json_file)
                    if filter == "plantas":
                        especies = [especie for especie in especies if especie["tipo"] == "Plantae"]
                    elif filter == "animales":
                        especies = [especie for especie in especies if especie["tipo"] == "Animalia"]
                except json.JSONDecodeError:
                    pass

        return templates.TemplateResponse(f"departamentos/{department_name}.html", {"request": request, "especies": especies, "filter": filter})
    else:
        return HTMLResponse(content="No hay una vista disponible para este departamento.", status_code=404)



@app.get("/especies", response_class=HTMLResponse)
async def especies(request: Request):
    cundinamarca_json_path = 'static/data/cundinamarca_especies.json'
    boyaca_json_path = 'static/data/boyaca_especies.json'
    
    especies_cundinamarca = []
    especies_boyaca = []
    
    if Path(cundinamarca_json_path).exists() and Path(cundinamarca_json_path).stat().st_size > 0:
        with open(cundinamarca_json_path, 'r') as json_file:
            try:
                especies_cundinamarca = json.load(json_file)
                print("Datos de Cundinamarca cargados correctamente:", especies_cundinamarca)  # Depuración
            except json.JSONDecodeError:
                print("Error al decodificar el archivo JSON de Cundinamarca.")
    
    if Path(boyaca_json_path).exists() and Path(boyaca_json_path).stat().st_size > 0:
        with open(boyaca_json_path, 'r') as json_file:
            try:
                especies_boyaca = json.load(json_file)
                print("Datos de Boyacá cargados correctamente:", especies_boyaca)  # Depuración
            except json.JSONDecodeError:
                print("Error al decodificar el archivo JSON de Boyacá.")
    
    return templates.TemplateResponse("especies.html", {"request": request, "especies_cundinamarca": especies_cundinamarca, "especies_boyaca": especies_boyaca})

@app.get("/contacto", response_class=HTMLResponse)
async def contacto(request: Request):
    return templates.TemplateResponse("contacto.html", {"request": request})

@app.get("/ecosistema", response_class=HTMLResponse)
async def ecosistemas(request: Request):
    return templates.TemplateResponse("ecosistema.html", {"request":request})