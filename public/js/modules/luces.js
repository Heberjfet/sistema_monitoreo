// Este archivo contiene la lógica específica para manejar los datos de luces.

// Módulo para gestión de datos de luces

class LucesManager {
    constructor() {
        this.datos = [];
        this.zonasConfig = {
            'sala-servidores-1': { min: 200, max: 500, nombre: 'Sala de Servidores 1' },
            'sala-servidores-2': { min: 200, max: 500, nombre: 'Sala de Servidores 2' },
            'pasillo-principal': { min: 100, max: 300, nombre: 'Pasillo Principal' },
            'area-ups': { min: 200, max: 400, nombre: 'Área UPS' },
            'sala-control': { min: 300, max: 750, nombre: 'Sala de Control' },
            'entrada': { min: 150, max: 400, nombre: 'Entrada' }
        };
        this.init();
    }

    init() {
        this.cargarDatos();
        this.setupEventListeners();
        this.actualizarEstadisticas();
        this.actualizarTabla();
        this.actualizarTiempo();
        this.verificarAlertas();

        // Actualizar tiempo cada minuto
        setInterval(() => this.actualizarTiempo(), 60000);
    }

    setupEventListeners() {
        const form = document.getElementById('luces-form');
        if (form) {
            form.addEventListener('submit', (e) => this.guardarRegistro(e));
        }

        // Validación en tiempo real
        const luxInput = document.getElementById('lux');
        if (luxInput) {
            luxInput.addEventListener('input', () => this.validarLux());
        }

        const zonaSelect = document.getElementById('zona');
        if (zonaSelect) {
            zonaSelect.addEventListener('change', () => this.mostrarRecomendacionZona());
        }
    }

    cargarDatos() {
        const datosGuardados = localStorage.getItem('luces_datos');
        if (datosGuardados) {
            this.datos = JSON.parse(datosGuardados);
        }
    }

    guardarDatos() {
        localStorage.setItem('luces_datos', JSON.stringify(this.datos));
    }

    guardarRegistro(evento) {
        evento.preventDefault();

        const formData = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            zona: document.getElementById('zona').value,
            lux: parseFloat(document.getElementById('lux').value),
            observaciones: document.getElementById('observaciones').value,
            operador: document.getElementById('operador').value
        };

        // Validaciones
        if (!this.validarDatos(formData)) {
            return;
        }

        // Agregar datos
        this.datos.push(formData);
        this.guardarDatos();

        // Actualizar interfaz
        this.actualizarTabla();
        this.actualizarEstadisticas();
        this.verificarAlertas();

        // Limpiar formulario
        document.getElementById('luces-form').reset();

        // Mostrar notificación
        this.mostrarNotificacion('Registro guardado exitosamente', 'success');

        // Agregar animación a la nueva fila
        setTimeout(() => {
            const filas = document.querySelectorAll('#luces-table-body tr');
            if (filas.length > 0) {
                filas[0].classList.add('fade-in');
            }
        }, 100);
    }

    validarDatos(datos) {
        const errores = [];

        if (!datos.zona) errores.push('Debe seleccionar una zona');
        if (!datos.lux || datos.lux < 0) errores.push('El valor de lux debe ser mayor a 0');
        if (!datos.operador.trim()) errores.push('Debe ingresar el nombre del operador');

        if (errores.length > 0) {
            this.mostrarNotificacion(errores.join('<br>'), 'error');
            return false;
        }

        return true;
    }

    validarLux() {
        const luxInput = document.getElementById('lux');
        const zonaSelect = document.getElementById('zona');

        if (!luxInput.value || !zonaSelect.value) return;

        const lux = parseFloat(luxInput.value);
        const zona = zonaSelect.value;
        const config = this.zonasConfig[zona];

        if (!config) return;

        let mensaje = '';
        let clase = '';

        if (lux < config.min) {
            mensaje = `⚠️ Nivel bajo para ${config.nombre} (mínimo: ${config.min} lux)`;
            clase = 'text-warning';
        } else if (lux > config.max) {
            mensaje = `⚠️ Nivel alto para ${config.nombre} (máximo: ${config.max} lux)`;
            clase = 'text-warning';
        } else {
            mensaje = `✅ Nivel óptimo para ${config.nombre}`;
            clase = 'text-success';
        }

        // Mostrar mensaje debajo del input
        let alertDiv = document.getElementById('lux-validation');
        if (!alertDiv) {
            alertDiv = document.createElement('div');
            alertDiv.id = 'lux-validation';
            alertDiv.className = 'mt-1';
            luxInput.parentNode.appendChild(alertDiv);
        }

        alertDiv.innerHTML = `<small class="${clase}">${mensaje}</small>`;
    }

    mostrarRecomendacionZona() {
        const zonaSelect = document.getElementById('zona');
        const zona = zonaSelect.value;

        if (!zona) return;

        const config = this.zonasConfig[zona];
        const luxInput = document.getElementById('lux');

        luxInput.placeholder = `Rango recomendado: ${config.min}-${config.max} lux`;
    }

    actualizarTabla() {
        const tbody = document.getElementById('luces-table-body');
        const noDataDiv = document.getElementById('no-data');

        if (!tbody) return;

        if (this.datos.length === 0) {
            tbody.innerHTML = '';
            if (noDataDiv) noDataDiv.style.display = 'block';
            return;
        }

        if (noDataDiv) noDataDiv.style.display = 'none';

        // Ordenar por fecha descendente
        const datosOrdenados = [...this.datos].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

        tbody.innerHTML = datosOrdenados.map(registro => {
            const fecha = new Date(registro.timestamp);
            const fechaFormateada = fecha.toLocaleString('es-ES');
            const estadoLux = this.getEstadoLux(registro.zona, registro.lux);
            const zonaNombre = this.zonasConfig[registro.zona]?.nombre || registro.zona;

            return `
                <tr>
                    <td><span class="badge bg-secondary">#${registro.id}</span></td>
                    <td><i class="fas fa-clock me-1"></i>${fechaFormateada}</td>
                    <td><span class="zona-${estadoLux.zona}">${zonaNombre}</span></td>
                    <td><span class="lux-${estadoLux.estado}">${registro.lux} lux</span></td>
                    <td><i class="fas fa-user me-1"></i>${registro.operador}</td>
                    <td>${registro.observaciones || '<em class="text-muted">Sin observaciones</em>'}</td>
                    <td>
                        <button class="btn btn-outline-info btn-sm btn-action" onclick="lucesManager.verDetalle(${registro.id})" title="Ver detalle">
                            <i class="fas fa-eye"></i>
                        </button>
                        <button class="btn btn-outline-danger btn-sm btn-action" onclick="lucesManager.eliminarRegistro(${registro.id})" title="Eliminar">
                            <i class="fas fa-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    getEstadoLux(zona, lux) {
        const config = this.zonasConfig[zona];
        if (!config) return { estado: 'normal', zona: 'normal' };

        if (lux < config.min * 0.5) {
            return { estado: 'critico', zona: 'critica' };
        } else if (lux < config.min) {
            return { estado: 'bajo', zona: 'alerta' };
        } else if (lux > config.max * 1.5) {
            return { estado: 'critico', zona: 'critica' };
        } else if (lux > config.max) {
            return { estado: 'alto', zona: 'alerta' };
        } else {
            return { estado: 'normal', zona: 'normal' };
        }
    }

    actualizarEstadisticas() {
        const totalElement = document.getElementById('total-registros');
        const promedioElement = document.getElementById('promedio-lux');
        const maximoElement = document.getElementById('maximo-lux');
        const minimoElement = document.getElementById('minimo-lux');
        const ultimoElement = document.getElementById('ultimo-registro');

        if (!totalElement) return;

        if (this.datos.length === 0) {
            totalElement.textContent = '0';
            promedioElement.textContent = '0';
            maximoElement.textContent = '0';
            minimoElement.textContent = '0';
            ultimoElement.textContent = 'Sin registros previos';
            return;
        }

        const luxValues = this.datos.map(d => d.lux);
        const promedio = luxValues.reduce((a, b) => a + b, 0) / luxValues.length;
        const maximo = Math.max(...luxValues);
        const minimo = Math.min(...luxValues);
        const ultimo = this.datos[this.datos.length - 1];

        totalElement.textContent = this.datos.length;
        promedioElement.textContent = `${promedio.toFixed(1)}`;
        maximoElement.textContent = `${maximo}`;
        minimoElement.textContent = `${minimo}`;

        if (ultimo) {
            const fecha = new Date(ultimo.timestamp);
            const zonaNombre = this.zonasConfig[ultimo.zona]?.nombre || ultimo.zona;
            ultimoElement.innerHTML = `
                <strong>${zonaNombre}</strong><br>
                ${ultimo.lux} lux - ${fecha.toLocaleString('es-ES')}
            `;
        }
    }

    verificarAlertas() {
        const alertasContainer = document.getElementById('alertas-container');
        if (!alertasContainer) return;

        const alertas = [];

        // Verificar últimos registros para alertas
        const registrosRecientes = this.datos.slice(-5); // Últimos 5 registros

        registrosRecientes.forEach(registro => {
            const estadoLux = this.getEstadoLux(registro.zona, registro.lux);
            const zonaNombre = this.zonasConfig[registro.zona]?.nombre || registro.zona;

            if (estadoLux.estado === 'critico') {
                alertas.push({
                    tipo: 'danger',
                    mensaje: `Nivel crítico en ${zonaNombre}: ${registro.lux} lux`,
                    icono: 'fas fa-exclamation-triangle'
                });
            } else if (estadoLux.estado === 'bajo' || estadoLux.estado === 'alto') {
                alertas.push({
                    tipo: 'warning',
                    mensaje: `Nivel ${estadoLux.estado} en ${zonaNombre}: ${registro.lux} lux`,
                    icono: 'fas fa-exclamation-circle'
                });
            }
        });

        if (alertas.length === 0) {
            alertasContainer.innerHTML = `
                <div class="alert alert-success border-left-success" role="alert">
                    <i class="fas fa-check-circle me-2"></i>
                    Todos los niveles de iluminación están dentro de los parámetros normales
                </div>
            `;
        } else {
            alertasContainer.innerHTML = alertas.map(alerta => `
                <div class="alert alert-${alerta.tipo} border-left-${alerta.tipo}" role="alert">
                    <i class="${alerta.icono} me-2"></i>${alerta.mensaje}
                </div>
            `).join('');
        }
    }

    actualizarTiempo() {
        const timeElement = document.getElementById('current-time');
        if (timeElement) {
            const now = new Date();
            timeElement.textContent = now.toLocaleString('es-ES');
        }
    }

    verDetalle(id) {
        const registro = this.datos.find(d => d.id === id);
        if (!registro) return;

        const zonaNombre = this.zonasConfig[registro.zona]?.nombre || registro.zona;
        const fecha = new Date(registro.timestamp);
        const estadoLux = this.getEstadoLux(registro.zona, registro.lux);

        alert(`
Detalle del Registro #${registro.id}

Fecha/Hora: ${fecha.toLocaleString('es-ES')}
Zona: ${zonaNombre}
Nivel de Lux: ${registro.lux} lux (${estadoLux.estado})
Operador: ${registro.operador}
Observaciones: ${registro.observaciones || 'Sin observaciones'}
        `);
    }

    eliminarRegistro(id) {
        const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
        document.getElementById('modal-message').textContent = '¿Está seguro de eliminar este registro? Esta acción no se puede deshacer.';

        document.getElementById('confirm-action').onclick = () => {
            this.datos = this.datos.filter(d => d.id !== id);
            this.guardarDatos();
            this.actualizarTabla();
            this.actualizarEstadisticas();
            this.verificarAlertas();
            modal.hide();
            this.mostrarNotificacion('Registro eliminado', 'success');
        };

        modal.show();
    }

    mostrarNotificacion(mensaje, tipo) {
        // Crear notificación toast
        const toast = document.createElement('div');
        toast.className = `alert alert-${tipo === 'error' ? 'danger' : tipo} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
        toast.innerHTML = `
            ${mensaje}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;

        document.body.appendChild(toast);

        // Auto-eliminar después de 5 segundos
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 5000);
    }
}

// Funciones globales para uso en HTML
function exportarDatos() {
    if (lucesManager.datos.length === 0) {
        lucesManager.mostrarNotificacion('No hay datos para exportar', 'warning');
        return;
    }

    const csv = lucesManager.convertirACSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `luces_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);

    lucesManager.mostrarNotificacion('Datos exportados exitosamente', 'success');
}

function limpiarDatos() {
    const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
    document.getElementById('modal-message').textContent = '¿Está seguro de eliminar TODOS los registros? Esta acción no se puede deshacer.';

    document.getElementById('confirm-action').onclick = () => {
        lucesManager.datos = [];
        lucesManager.guardarDatos();
        lucesManager.actualizarTabla();
        lucesManager.actualizarEstadisticas();
        lucesManager.verificarAlertas();
        modal.hide();
        lucesManager.mostrarNotificación('Todos los registros han sido eliminados', 'success');
    };

    modal.show();
}

// Extender LucesManager con método de exportación
LucesManager.prototype.convertirACSV = function() {
    const headers = ['ID', 'Fecha/Hora', 'Zona', 'Lux', 'Operador', 'Observaciones'];
    const rows = this.datos.map(d => [
        d.id,
        new Date(d.timestamp).toLocaleString('es-ES'),
        this.zonasConfig[d.zona]?.nombre || d.zona,
        d.lux,
        d.operador,
        d.observaciones || ''
    ]);

    return [headers, ...rows].map(row =>
        row.map(field => `"${field}"`).join(',')
    ).join('\n');
};

// Inicializar cuando el DOM esté listo
let lucesManager;
document.addEventListener('DOMContentLoaded', function() {
    lucesManager = new LucesManager();
});
