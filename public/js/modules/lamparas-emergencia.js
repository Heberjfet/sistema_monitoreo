// Este archivo contiene la lógica específica para manejar los datos de lámparas de emergencia.
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lamparas-emergencia-form');
    const tableBody = document.getElementById('lamparas-table-body');

    // Cargar datos existentes al iniciar
    cargarDatosLamparas();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const funcionamiento = document.getElementById('funcionamiento').value;
        const lux = document.getElementById('lux').value;
        const observaciones = document.getElementById('observaciones').value;

        if (validateInputs(funcionamiento, lux)) {
            // Crear objeto de registro
            const registro = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                funcionamiento: funcionamiento,
                lux: lux,
                observaciones: observaciones
            };
            
            // Guardar en localStorage
            guardarRegistro(registro);
            
            // Actualizar tabla
            agregarFilaTabla(registro);
            
            // Limpiar formulario
            form.reset();
            
            // Mostrar notificación
            mostrarNotificacion('Registro de lámpara guardado exitosamente', 'success');
        } else {
            mostrarNotificacion('Por favor, complete todos los campos requeridos', 'danger');
        }
    });

    function validateInputs(funcionamiento, lux) {
        return funcionamiento !== '' && lux !== '' && !isNaN(lux);
    }

    function guardarRegistro(registro) {
        // Obtener registros existentes
        let registros = JSON.parse(localStorage.getItem('lamparas_emergencia_records')) || [];
        
        // Agregar nuevo registro
        registros.push(registro);
        
        // Guardar en localStorage
        localStorage.setItem('lamparas_emergencia_records', JSON.stringify(registros));
    }

    function cargarDatosLamparas() {
        // Obtener registros existentes
        const registros = JSON.parse(localStorage.getItem('lamparas_emergencia_records')) || [];
        
        // Limpiar tabla
        tableBody.innerHTML = '';
        
        // Agregar cada registro a la tabla
        registros.forEach(registro => {
            agregarFilaTabla(registro);
        });
    }

    function agregarFilaTabla(registro) {
        const newRow = document.createElement('tr');
        
        // Formatear fecha
        const fecha = new Date(registro.timestamp);
        const fechaFormateada = fecha.toLocaleString('es-ES');
        
        newRow.innerHTML = `
            <td>${fechaFormateada}</td>
            <td>${registro.funcionamiento}</td>
            <td>${registro.lux}</td>
            <td>${registro.observaciones || '-'}</td>
        `;
        
        tableBody.appendChild(newRow);
    }

    function mostrarNotificacion(mensaje, tipo = 'success') {
        const notificacion = document.createElement('div');
        notificacion.className = `alert alert-${tipo} alert-dismissible fade show position-fixed`;
        notificacion.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        notificacion.innerHTML = `
            <i class="fas fa-${tipo === 'success' ? 'check-circle' : 'exclamation-triangle'} me-2"></i>${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(notificacion);
        
        setTimeout(() => {
            if (notificacion.parentNode) {
                notificacion.parentNode.removeChild(notificacion);
            }
        }, 5000);
    }
});