document.addEventListener('DOMContentLoaded', function() {
    // Cargar datos desde un archivo JSON (cambiar la ruta si es necesario)
    fetch('/static/data/estadisticas_comparacion.json')
        .then(response => response.json())
        .then(data => {
            const boyacaData = data.Boyaca;
            const cundinamarcaData = data.Cundinamarca;

            // Preparar datos para gráficos
            const boyacaCounts = boyacaData.species.reduce((acc, e) => {
                acc[e.tipo] = (acc[e.tipo] || 0) + 1;
                return acc;
            }, {});

            const cundinamarcaCounts = cundinamarcaData.species.reduce((acc, e) => {
                acc[e.tipo] = (acc[e.tipo] || 0) + 1;
                return acc;
            }, {});

            // Crear gráfico de barras para Boyacá
            const ctxBoyaca = document.getElementById('chartBoyaca').getContext('2d');
            new Chart(ctxBoyaca, {
                type: 'bar',
                data: {
                    labels: Object.keys(boyacaCounts),
                    datasets: [{
                        label: 'Número de Especies en Boyacá',
                        data: Object.values(boyacaCounts),
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución de Especies en Boyacá',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Crear gráfico de barras para Cundinamarca
            const ctxCundinamarca = document.getElementById('chartCundinamarca').getContext('2d');
            new Chart(ctxCundinamarca, {
                type: 'bar',
                data: {
                    labels: Object.keys(cundinamarcaCounts),
                    datasets: [{
                        label: 'Número de Especies en Cundinamarca',
                        data: Object.values(cundinamarcaCounts),
                        backgroundColor: 'rgba(153, 102, 255, 0.2)',
                        borderColor: 'rgba(153, 102, 255, 1)',
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución de Especies en Cundinamarca',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });

            // Crear gráfico de pastel para Boyacá
            const ctxPastelBoyaca = document.getElementById('chartPastelBoyaca').getContext('2d');
            new Chart(ctxPastelBoyaca, {
                type: 'pie',
                data: {
                    labels: Object.keys(boyacaCounts),
                    datasets: [{
                        label: 'Distribución de Especies en Boyacá',
                        data: Object.values(boyacaCounts),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            // Añade más colores si es necesario
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            // Añade más colores si es necesario
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución de Especies en Boyacá (Pastel)',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    }
                }
            });

            // Crear gráfico de pastel para Cundinamarca
            const ctxPastelCundinamarca = document.getElementById('chartPastelCundinamarca').getContext('2d');
            new Chart(ctxPastelCundinamarca, {
                type: 'pie',
                data: {
                    labels: Object.keys(cundinamarcaCounts),
                    datasets: [{
                        label: 'Distribución de Especies en Cundinamarca',
                        data: Object.values(cundinamarcaCounts),
                        backgroundColor: [
                            'rgba(75, 192, 192, 0.2)',
                            'rgba(153, 102, 255, 0.2)',
                            'rgba(255, 159, 64, 0.2)',
                            // Añade más colores si es necesario
                        ],
                        borderColor: [
                            'rgba(75, 192, 192, 1)',
                            'rgba(153, 102, 255, 1)',
                            'rgba(255, 159, 64, 1)',
                            // Añade más colores si es necesario
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución de Especies en Cundinamarca (Pastel)',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    }
                }
            });

            // Crear gráfico de líneas
            const ctxLineas = document.getElementById('chartLineas').getContext('2d');
            new Chart(ctxLineas, {
                type: 'line',
                data: {
                    labels: ['Enero', 'Febrero', 'Marzo'], // Ajusta las etiquetas según tu temporalidad
                    datasets: [
                        {
                            label: 'Especies en Boyacá',
                            data: [10, 20, 30], // Datos de ejemplo
                            borderColor: 'rgba(75, 192, 192, 1)',
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            fill: true
                        },
                        {
                            label: 'Especies en Cundinamarca',
                            data: [15, 25, 35], // Datos de ejemplo
                            borderColor: 'rgba(153, 102, 255, 1)',
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            fill: true
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Tendencia de Especies (Gráfico de Líneas)',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    }
                }
            });

            // Crear gráfico de área
            const ctxArea = document.getElementById('chartArea').getContext('2d');
            new Chart(ctxArea, {
                type: 'radar',
                data: {
                    labels: ['Plantas', 'Animales', 'Otros'], // Ajusta según tus categorías
                    datasets: [
                        {
                            label: 'Boyacá',
                            data: [20, 30, 10], // Datos de ejemplo
                            backgroundColor: 'rgba(75, 192, 192, 0.2)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1
                        },
                        {
                            label: 'Cundinamarca',
                            data: [25, 35, 15], // Datos de ejemplo
                            backgroundColor: 'rgba(153, 102, 255, 0.2)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            borderWidth: 1
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Comparación de Categorías (Radar)',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    }
                }
            });

            // Crear gráfico de dispersión
            const ctxDispersión = document.getElementById('chartDispersión').getContext('2d');
            new Chart(ctxDispersión, {
                type: 'scatter',
                data: {
                    datasets: [
                        {
                            label: 'Boyacá',
                            data: [{x: 1, y: 10}, {x: 2, y: 20}, {x: 3, y: 30}], // Datos de ejemplo
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                            borderColor: 'rgba(75, 192, 192, 1)',
                            showLine: true
                        },
                        {
                            label: 'Cundinamarca',
                            data: [{x: 1, y: 15}, {x: 2, y: 25}, {x: 3, y: 35}], // Datos de ejemplo
                            backgroundColor: 'rgba(153, 102, 255, 0.5)',
                            borderColor: 'rgba(153, 102, 255, 1)',
                            showLine: true
                        }
                    ]
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Distribución de Especies (Dispersión)',
                            align: 'center',
                            font: {
                                size: 18
                            }
                        }
                    },
                    layout: {
                        padding: {
                            top: 20
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Eje X'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Eje Y'
                            },
                            beginAtZero: true
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error al cargar los datos:', error));
});
