// Sistema de carga de componentes modulares con rutas absolutas
class ComponentLoader {
    constructor() {
        this.components = {};
        this.baseURL = window.location.origin;
        this.basePath = window.location.pathname.replace(/\/[^\/]*$/, '');
    }

    // Cargar un componente
    async loadComponent(componentName, targetElement) {
        try {
            let componentPath;
            
            switch(componentName) {
                case 'navbar':
                    componentPath = '/components/navbar.html';
                    break;
                case 'footer':
                    componentPath = '/components/footer.html';
                    break;
                default:
                    componentPath = `/components/${componentName}.html`;
            }
            
            const fullPath = this.baseURL + componentPath;
            console.log('Cargando componente desde:', fullPath);
            
            const response = await fetch(fullPath);
            if (!response.ok) throw new Error(`Componente no encontrado: ${fullPath}`);
            
            const html = await response.text();
            this.components[componentName] = html;
            
            if (targetElement) {
                targetElement.innerHTML = html;
                
                // Cargar CSS después de insertar el componente
                if (componentName === 'navbar') {
                    this.loadCSS('/css/navbar.css');
                }
            }
            
            return html;
        } catch (error) {
            console.error(`Error cargando componente ${componentName}:`, error);
            return this.createFallback(componentName, targetElement);
        }
    }

    // Cargar CSS
    loadCSS(cssPath) {
        const fullPath = this.baseURL + cssPath;
        
        // Verificar si el CSS ya está cargado
        if (!document.querySelector(`link[href="${fullPath}"]`)) {
            const link = document.createElement('link');
            link.rel = 'stylesheet';
            link.href = fullPath;
            document.head.appendChild(link);
            console.log('CSS cargado:', fullPath);
        }
    }

    // Crear componente de fallback
    createFallback(componentName, targetElement) {
        let fallbackHtml = '';
        
        switch(componentName) {
            case 'navbar':
                fallbackHtml = this.createNavbarFallback();
                break;
            case 'footer':
                fallbackHtml = this.createFooterFallback();
                break;
            default:
                fallbackHtml = `<div class="alert alert-warning">Componente ${componentName} no disponible</div>`;
        }
        
        if (targetElement) {
            targetElement.innerHTML = fallbackHtml;
        }
        
        return fallbackHtml;
    }

    // Navbar de fallback
    createNavbarFallback() {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                <div class="container">
                    <a class="navbar-brand" href="/index.html">
                        <i class="fas fa-server me-2"></i>Monitoreo Centro de Datos
                    </a>
                    <div class="navbar-nav ms-auto">
                        <a class="nav-link" href="/index.html">Dashboard</a>
                        <a class="nav-link" href="/pages/luces.html">Luces</a>
                        <a class="nav-link" href="/pages/inrows.html">Inrows</a>
                        <a class="nav-link" href="/pages/lamparas-emergencia.html">Lámparas</a>
                        <a class="nav-link" href="/pages/aires-acondicionados.html">Aires</a>
                    </div>
                </div>
            </nav>
        `;
    }

    // Footer de fallback
    createFooterFallback() {
        return `
            <footer class="bg-dark text-white text-center py-3 mt-5">
                <div class="container">
                    <p class="mb-0">&copy; 2025 Sistema de Monitoreo Centro de Datos</p>
                </div>
            </footer>
        `;
    }

    // Resaltar la página actual en el navbar
    highlightCurrentPage() {
        const currentPage = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (linkHref && currentPage.includes(linkHref.replace('/', ''))) {
                link.classList.add('active');
            } else if (currentPage === '/' && linkHref === '/index.html') {
                link.classList.add('active');
            }
        });
    }
}

// Instancia global del cargador de componentes
window.appComponents = new ComponentLoader();

// Función para inicializar componentes
async function initComponents() {
    console.log('Inicializando componentes...');
    
    // Cargar navbar si existe el contenedor
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        console.log('Cargando navbar...');
        await appComponents.loadComponent('navbar', navbarContainer);
        // Pequeño retraso para asegurar que el DOM se actualice
        setTimeout(() => appComponents.highlightCurrentPage(), 100);
    } else {
        console.error('No se encontró el contenedor del navbar');
    }

    // Cargar footer si existe el contenedor
    const footerContainer = document.getElementById('footer-container');
    if (footerContainer) {
        console.log('Cargando footer...');
        await appComponents.loadComponent('footer', footerContainer);
    }
}

// Inicializar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initComponents);