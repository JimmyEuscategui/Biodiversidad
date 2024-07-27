document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos del JSON
    fetch('../../static/data/estadisticas_departamentos.json')
        .then(response => response.json())
        .then(data => {
            // Crear gráfico de total de especies por reino
            const ctxReino = document.getElementById('reinoChart').getContext('2d');
            new Chart(ctxReino, {
                type: 'pie',
                data: {
                    labels: Object.keys(data['Cundinamarca']['especies_por_reino']),
                    datasets: [{
                        data: Object.values(data['Cundinamarca']['especies_por_reino']),
                        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            position: 'top',
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.label + ': ' + context.raw;
                                }
                            }
                        }
                    }
                }
            });

            // Crear gráfico de registros por mes
            const ctxMes = document.getElementById('mesChart').getContext('2d');
            new Chart(ctxMes, {
                type: 'bar',
                data: {
                    labels: Object.keys(data['Cundinamarca']['registros_por_mes']),
                    datasets: [{
                        label: 'Registros por Mes',
                        data: Object.values(data['Cundinamarca']['registros_por_mes']),
                        backgroundColor: '#36A2EB'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.label + ': ' + context.raw;
                                }
                            }
                        }
                    }
                }
            });

            // Procesar y agrupar los datos por ciudad
            const registrosPorCiudad = data['Cundinamarca']['registros_por_ciudad'];
            const registrosAgrupados = {};

            Object.keys(registrosPorCiudad).forEach(ciudad => {
                if (registrosAgrupados[ciudad]) {
                    registrosAgrupados[ciudad] += registrosPorCiudad[ciudad];
                } else {
                    registrosAgrupados[ciudad] = registrosPorCiudad[ciudad];
                }
            });

            // Crear gráfico de registros por ciudad
            const ctxCiudad = document.getElementById('ciudadChart').getContext('2d');
            new Chart(ctxCiudad, {
                type: 'bar',
                data: {
                    labels: Object.keys(registrosAgrupados),
                    datasets: [{
                        label: 'Registros por Ciudad',
                        data: Object.values(registrosAgrupados),
                        backgroundColor: '#66BB6A'
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            display: false,
                        },
                        tooltip: {
                            callbacks: {
                                label: function (context) {
                                    return context.label + ': ' + context.raw;
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                display: false // Oculta las etiquetas del eje X
                            },
                            grid: {
                                display: false // Opcional: Oculta la cuadrícula del eje X
                            }
                        },
                        y: {
                            grid: {
                                color: 'rgba(0, 0, 0, 0.1)' // Opcional: Cambia el color de la cuadrícula del eje Y
                            }
                        }
                    }
                }
            });
        })
        .catch(error => console.error('Error cargando los datos:', error));
});
