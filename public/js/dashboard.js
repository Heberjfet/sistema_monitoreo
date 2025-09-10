// Actualizar hora actual
function updateTime() {
    const now = new Date();
    const timeElement = document.getElementById('lastUpdate');
    if (timeElement) {
        timeElement.textContent = now.toLocaleString('es-ES');
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Solo ejecutar si estamos en el dashboard
    if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
        updateTime();
        setInterval(updateTime, 60000); // Actualizar cada minuto
    }
});

// Función para exportar todos los datos a Excel
function exportarTodoExcel() {
    try {
        // Obtener datos de todos los sistemas
        const datosInrows = JSON.parse(localStorage.getItem('inrows_records') || '[]');
        const datosLuces = JSON.parse(localStorage.getItem('luces_datos') || '[]');
        const datosLamparas = JSON.parse(localStorage.getItem('lamparas_emergencia_records') || '[]');
        const datosAires = JSON.parse(localStorage.getItem('aires_acondicionados_records') || '[]');
        
        // Verificar si hay datos para exportar
        if (datosInrows.length === 0 && datosLuces.length === 0 && 
            datosLamparas.length === 0 && datosAires.length === 0) {
            alert('No hay datos para exportar');
            return;
        }
        
        // Crear libro de Excel con múltiples hojas
        const workbook = XLSX.utils.book_new();
        
        // Hoja para Inrows (Capítulo 1)
        if (datosInrows.length > 0) {
            const wsInrows = XLSX.utils.json_to_sheet(datosInrows.map(item => ({
                'Fecha': new Date(item.timestamp || item.id).toLocaleString('es-ES'),
                'FPM': item.fpm,
                'Temperatura (°C)': item.temperatura,
                'Observaciones': item.observaciones || ''
            })));
            XLSX.utils.book_append_sheet(workbook, wsInrows, "Inrows");
        }
        
        // Hoja para Luces y demás (Capítulo 2)
        const allData = [...datosLuces, ...datosLamparas, ...datosAires];
        if (allData.length > 0) {
            const formattedData = allData.map(item => {
                let rowData = {
                    'Fecha': new Date(item.timestamp || item.id).toLocaleString('es-ES'),
                    'Sistema': '',
                    'Valor Principal': '',
                    'Valor Secundario': '',
                    'Observaciones': item.observaciones || ''
                };
                
                // Determinar el tipo de dato
                if (item.lux !== undefined && item.zona !== undefined) {
                    rowData.Sistema = 'Luces - ' + (item.zona || '');
                    rowData['Valor Principal'] = item.lux + ' lux';
                } else if (item.funcionamiento !== undefined) {
                    rowData.Sistema = 'Lámparas Emergencia';
                    rowData['Valor Principal'] = item.funcionamiento;
                    rowData['Valor Secundario'] = item.lux + ' lux';
                } else if (item.tiempoUso !== undefined) {
                    rowData.Sistema = 'Aires Acondicionados';
                    rowData['Valor Principal'] = item.tiempoUso + ' horas';
                }
                
                return rowData;
            });
            
            const wsGeneral = XLSX.utils.json_to_sheet(formattedData);
            XLSX.utils.book_append_sheet(workbook, wsGeneral, "Luces y Demás");
        }
        
        // Guardar el archivo
        const fecha = new Date().toISOString().split('T')[0];
        XLSX.writeFile(workbook, `Reporte_Monitoreo_${fecha}.xlsx`);
        
        alert('Datos exportados exitosamente a Excel');
    } catch (error) {
        console.error('Error al exportar a Excel:', error);
        alert('Error al exportar los datos: ' + error.message);
    }
}