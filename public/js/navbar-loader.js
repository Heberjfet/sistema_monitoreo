// Función para cargar el navbar en todas las páginas
function loadNavbar() {
    fetch('../components/navbar.html')
        .then(response => response.text())
        .then(data => {
            // Insertar el navbar al inicio del body
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Aplicar la clase activa al enlace actual
            highlightCurrentPage();
            
            // Cargar el CSS del navbar
            loadNavbarCSS();
        })
        .catch(error => {
            console.error('Error loading navbar:', error);
            // Crear un navbar básico como fallback
            createFallbackNavbar();
        });
}

// Función para cargar el CSS del navbar
function loadNavbarCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '../css/navbar.css';
    document.head.appendChild(link);
}

// Función para resaltar la página actual en el navbar
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage && linkPage.includes(currentPage)) {
            link.classList.add('active');
        }
        
        // Para las páginas hijas del dropdown
        if (currentPage === 'index.html' || currentPage === '') {
            const dashboardLink = document.querySelector('a[href="../index.html"]');
            if (dashboardLink) {
                dashboardLink.classList.add('active');
            }
        }
    });
}

// Función de fallback si no se puede cargar el navbar
function createFallbackNavbar() {
    const fallbackNavbar = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="../index.html">
                    <i class="fas fa-server me-2"></i>Monitoreo Centro de Datos
                </a>
                <div class="navbar-nav ms-auto">
                    <a class="nav-link" href="../index.html">Dashboard</a>
                    <a class="nav-link" href="../pages/luces.html">Luces</a>
                    <a class="nav-link" href="../pages/inrows.html">Inrows</a>
                    <a class="nav-link" href="../pages/lamparas-emergencia.html">Lámparas</a>
                    <a class="nav-link" href="../pages/aires-acondicionados.html">Aires</a>
                </div>
            </div>
        </nav>
    `;
    document.body.insertAdjacentHTML('afterbegin', fallbackNavbar);
}

// Cargar el navbar cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadNavbar);