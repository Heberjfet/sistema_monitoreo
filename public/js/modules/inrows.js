// Este archivo contiene la lógica específica para manejar los datos de inrows.
document.addEventListener('DOMContentLoaded', function() {
    const inrowsForm = document.getElementById('inrows-form');
    const inrowsTable = document.getElementById('inrows-table-body');

    // Cargar datos existentes al iniciar
    cargarDatosInrows();

    inrowsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const fpm = document.getElementById('fpm').value;
        const temperatura = document.getElementById('temperatura').value;
        const observaciones = document.getElementById('observaciones').value;

        if (validateInputs(fpm, temperatura)) {
            // Crear objeto de registro
            const registro = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                fpm: fpm,
                temperatura: temperatura,
                observaciones: observaciones
            };
            
            // Guardar en localStorage
            guardarRegistro(registro);
            
            // Actualizar tabla
            agregarFilaTabla(registro);
            
            // Limpiar formulario
            inrowsForm.reset();
            
            // Mostrar notificación
            mostrarNotificacion('Registro de Inrow guardado exitosamente', 'success');
        } else {
            mostrarNotificacion('Por favor, ingrese valores válidos para FPM y Temperatura', 'danger');
        }
    });

    function validateInputs(fpm, temperatura) {
        return fpm !== '' && !isNaN(fpm) && temperatura !== '' && !isNaN(temperatura);
    }

    function guardarRegistro(registro) {
        // Obtener registros existentes
        let registros = JSON.parse(localStorage.getItem('inrows_records')) || [];
        
        // Agregar nuevo registro
        registros.push(registro);
        
        // Guardar en localStorage
        localStorage.setItem('inrows_records', JSON.stringify(registros));
    }

    function cargarDatosInrows() {
        // Obtener registros existentes
        const registros = JSON.parse(localStorage.getItem('inrows_records')) || [];
        
        // Limpiar tabla
        inrowsTable.innerHTML = '';
        
        // Agregar cada registro a la tabla
        registros.forEach(registro => {
            agregarFilaTabla(registro);
        });
        
        // Mostrar mensaje si no hay datos
        if (registros.length === 0) {
            inrowsTable.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center text-muted py-4">
                        <i class="fas fa-inbox fa-2x mb-2"></i>
                        <p>No hay registros de Inrows</p>
                    </td>
                </tr>
            `;
        }
    }

    function agregarFilaTabla(registro) {
        const newRow = document.createElement('tr');
        
        // Formatear fecha
        const fecha = new Date(registro.timestamp);
        const fechaFormateada = fecha.toLocaleString('es-ES');
        
        newRow.innerHTML = `
            <td>${fechaFormateada}</td>
            <td>${registro.fpm}</td>
            <td>${registro.temperatura} °C</td>
            <td>${registro.observaciones || '-'}</td>
        `;
        
        inrowsTable.appendChild(newRow);
    }

    function mostrarNotificacion(mensaje, tipo = 'success') {
        // Crear elemento de notificación
        const notificacion = document.createElement('div');
        notificacion.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
        notificacion.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        notificacion.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        // Agregar al documento
        document.body.appendChild(notificacion);
        
        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 5000);
    }
});