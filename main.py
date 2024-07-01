from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pathlib import Path

app = FastAPI()

# Montar la carpeta 'static'
app.mount("/static", StaticFiles(directory="static"), name="static")

templates = Jinja2Templates(directory="templates")

@app.get('/', response_class=HTMLResponse)
async def home(request: Request):
    return templates.TemplateResponse("inicio.html", {"request": request})

@app.get("/departamentos/{department_name}", response_class=HTMLResponse)
async def get_department(request: Request, department_name: str):
    template_path = Path(f"templates/departamentos/{department_name}.html")
    if template_path.exists():
        return templates.TemplateResponse(f"departamentos/{department_name}.html", {"request": request})
    else:
        return HTMLResponse(content="No hay una vista disponible para este departamento.", status_code=404)

@app.get("/especies", response_class=HTMLResponse)
async def especies(request: Request):
    return templates.TemplateResponse("especies.html", {"request": request})

@app.get("/contacto", response_class=HTMLResponse)
async def contacto(request: Request):
    return templates.TemplateResponse("contacto.html", {"request": request})

@app.get("/ecosistema", response_class=HTMLResponse)
async def ecosistemas(request: Request):
    return templates.TemplateResponse("ecosistema.html", {"request":request})