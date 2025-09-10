// Este archivo contiene la lógica específica para manejar los datos de aires acondicionados.
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aires-acondicionados-form');
    const tableBody = document.getElementById('aires-table-body');
    const noDataDiv = document.getElementById('no-data-aires');
    const ultimoRegistro = document.getElementById('ultimo-registro');

    // Cargar datos existentes al iniciar
    cargarDatosAires();

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const equipo = document.getElementById('equipo').value;
        const tiempoUso = document.getElementById('tiempo-uso').value;
        const temperatura = document.getElementById('temperatura').value;
        const observaciones = document.getElementById('observaciones').value;

        if (validateInputs(equipo, tiempoUso, temperatura)) {
            // Crear objeto de registro
            const registro = {
                id: Date.now(),
                timestamp: new Date().toISOString(),
                equipo: equipo,
                tiempoUso: tiempoUso,
                temperatura: temperatura,
                observaciones: observaciones
            };
            
            // Guardar en localStorage
            guardarRegistro(registro);
            
            // Actualizar tabla
            agregarFilaTabla(registro);
            
            // Actualizar último registro
            actualizarUltimoRegistro(registro);
            
            // Limpiar formulario
            form.reset();
            
            // Mostrar notificación
            mostrarNotificacion('Registro de aire acondicionado guardado exitosamente', 'success');
        } else {
            mostrarNotificacion('Por favor, complete todos los campos requeridos', 'danger');
        }
    });

    function validateInputs(equipo, tiempoUso, temperatura) {
        return equipo !== '' && tiempoUso !== '' && !isNaN(tiempoUso) && 
               temperatura !== '' && !isNaN(temperatura);
    }

    function guardarRegistro(registro) {
        // Obtener registros existentes
        let registros = JSON.parse(localStorage.getItem('aires_acondicionados_records')) || [];
        
        // Agregar nuevo registro
        registros.push(registro);
        
        // Guardar en localStorage
        localStorage.setItem('aires_acondicionados_records', JSON.stringify(registros));
    }

    function cargarDatosAires() {
        // Obtener registros existentes
        const registros = JSON.parse(localStorage.getItem('aires_acondicionados_records')) || [];
        
        // Limpiar tabla
        tableBody.innerHTML = '';
        
        // Agregar cada registro a la tabla
        registros.forEach(registro => {
            agregarFilaTabla(registro);
        });
        
        // Actualizar último registro
        if (registros.length > 0) {
            const ultimo = registros[registros.length - 1];
            actualizarUltimoRegistro(ultimo);
        }
        
        // Mostrar/ocultar mensaje de no datos
        if (registros.length === 0) {
            noDataDiv.style.display = 'block';
        } else {
            noDataDiv.style.display = 'none';
        }
    }

    function agregarFilaTabla(registro) {
        const newRow = document.createElement('tr');
        
        // Formatear fecha
        const fecha = new Date(registro.timestamp);
        const fechaFormateada = fecha.toLocaleString('es-ES');
        
        // Formatear nombre del equipo
        let equipoNombre = '';
        switch(registro.equipo) {
            case 'inrow-1': equipoNombre = 'InRow 1'; break;
            case 'inrow-2': equipoNombre = 'InRow 2'; break;
            case 'inrow-3': equipoNombre = 'InRow 3'; break;
            case 'ventilador-1': equipoNombre = 'Ventilador 1'; break;
            case 'ventilador-2': equipoNombre = 'Ventilador 2'; break;
            case 'ventilador-3': equipoNombre = 'Ventilador 3'; break;
            default: equipoNombre = registro.equipo;
        }
        
        // Determinar clase según temperatura
        let tempClass = '';
        const temp = parseFloat(registro.temperatura);
        if (temp < 18) tempClass = 'text-info';
        else if (temp > 27) tempClass = 'text-danger';
        else tempClass = 'text-success';
        
        newRow.innerHTML = `
            <td>${fechaFormateada}</td>
            <td>${equipoNombre}</td>
            <td>${registro.tiempoUso} horas</td>
            <td><span class="${tempClass} fw-bold">${registro.temperatura} °C</span></td>
            <td>${registro.observaciones || '-'}</td>
        `;
        
        tableBody.appendChild(newRow);
        noDataDiv.style.display = 'none';
    }

    function actualizarUltimoRegistro(registro) {
        const fecha = new Date(registro.timestamp);
        const fechaFormateada = fecha.toLocaleString('es-ES');
        
        let equipoNombre = '';
        switch(registro.equipo) {
            case 'inrow-1': equipoNombre = 'InRow 1'; break;
            case 'inrow-2': equipoNombre = 'InRow 2'; break;
            case 'inrow-3': equipoNombre = 'InRow 3'; break;
            case 'ventilador-1': equipoNombre = 'Ventilador 1'; break;
            case 'ventilador-2': equipoNombre = 'Ventilador 2'; break;
            case 'ventilador-3': equipoNombre = 'Ventilador 3'; break;
            default: equipoNombre = registro.equipo;
        }
        
        ultimoRegistro.innerHTML = `
            <strong>${equipoNombre}</strong><br>
            ${registro.tiempoUso} horas - ${registro.temperatura}°C - ${fechaFormateada}
        `;
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