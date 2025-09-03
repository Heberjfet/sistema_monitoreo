// Main JavaScript file for Data Center Monitoring System

// Configuración global
const CONFIG = {
    API_BASE_URL: 'http://localhost:3000/api', // Cambiar cuando tengamos el backend
    REFRESH_INTERVAL: 30000, // 30 segundos
    DATE_FORMAT: 'es-ES'
};

// Estado global de la aplicación
const AppState = {
    lastUpdate: null,
    systemStatus: {
        luces: 'operativo',
        inrows: 'alerta',
        lamparasEmergencia: 'operativo',
        airesAcondicionados: 'operativo'
    }
};

// Utilidades
const Utils = {
    // Formatear fecha
    formatDate: (date) => {
        return new Intl.DateTimeFormat(CONFIG.DATE_FORMAT, {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        }).format(date);
    },

    // Mostrar notificación
    showNotification: (message, type = 'info') => {
        // TODO: Implementar sistema de notificaciones
        console.log(`[${type.toUpperCase()}] ${message}`);
    },

    // Validar formularios
    validateForm: (formData) => {
        const errors = [];

        // Validaciones básicas
        Object.entries(formData).forEach(([key, value]) => {
            if (value === '' || value === null || value === undefined) {
                errors.push(`El campo ${key} es requerido`);
            }
        });

        return {
            isValid: errors.length === 0,
            errors
        };
    }
};

// Gestión de datos locales (simulación de API)
const DataManager = {
    // Guardar datos en localStorage
    save: (key, data) => {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.error('Error saving data:', error);
            return false;
        }
    },

    // Cargar datos de localStorage
    load: (key) => {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (error) {
            console.error('Error loading data:', error);
            return null;
        }
    },

    // Obtener todos los registros de un sistema
    getAllRecords: (system) => {
        return DataManager.load(`${system}_records`) || [];
    },

    // Agregar nuevo registro
    addRecord: (system, record) => {
        const records = DataManager.getAllRecords(system);
        record.id = Date.now(); // ID simple basado en timestamp
        record.timestamp = new Date().toISOString();
        records.push(record);
        return DataManager.save(`${system}_records`, records);
    }
};

// Inicialización de la aplicación
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de Monitoreo Centro de Datos iniciado');

    // Inicializar componentes
    initializeApp();

    // Configurar actualizaciones automáticas
    setInterval(updateDashboard, CONFIG.REFRESH_INTERVAL);
});

function initializeApp() {
    // Actualizar hora actual
    updateCurrentTime();

    // Cargar estado de sistemas
    loadSystemStatus();

    // Configurar event listeners
    setupEventListeners();
}

function updateCurrentTime() {
    const now = new Date();
    const timeElement = document.getElementById('lastUpdate');
    if (timeElement) {
        timeElement.textContent = Utils.formatDate(now);
    }
    AppState.lastUpdate = now;
}

function loadSystemStatus() {
    // Simular carga de estado de sistemas
    // En el futuro esto vendrá de la API
    console.log('Estado de sistemas cargado:', AppState.systemStatus);
}

function updateDashboard() {
    updateCurrentTime();
    // TODO: Actualizar estadísticas y alertas
    console.log('Dashboard actualizado');
}

function setupEventListeners() {
    // Manejar clics en cards de sistemas
    document.querySelectorAll('.hover-card').forEach(card => {
        card.addEventListener('click', function(e) {
            const link = this.closest('a');
            if (link) {
                window.location.href = link.href;
            }
        });
    });

    // Manejar navegación
    document.querySelectorAll('[data-nav]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-nav');
            navigateTo(target);
        });
    });
}

function navigateTo(page) {
    // Función para manejar navegación SPA (Single Page Application)
    // Por ahora redirige a la página correspondiente
    window.location.href = `pages/${page}.html`;
}

// Exportar funciones globales para uso en otras páginas
window.MonitoringSystem = {
    Utils,
    DataManager,
    AppState,
    CONFIG
};

// Función para manejar el envío de formularios
function handleFormSubmission(formId, callback) {
    const form = document.getElementById(formId);
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const formData = new FormData(form);
        callback(formData);
    });
}

// Ejemplo de uso para el formulario de luces
handleFormSubmission('lucesForm', function(data) {
    // Procesar datos de luces
    console.log('Datos de luces:', data);
});

// Agregar más manejadores de formularios según sea necesario
// handleFormSubmission('inrowsForm', function(data) { ... });
// handleFormSubmission('lamparasEmergenciaForm', function(data) { ... });
// handleFormSubmission('airesAcondicionadosForm', function(data) { ... });
