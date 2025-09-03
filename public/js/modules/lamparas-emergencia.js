// Este archivo contiene la lógica específica para manejar los datos de lámparas de emergencia.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('lamparas-emergencia-form');
    const tableBody = document.getElementById('lamparas-emergencia-table-body');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const funcionamiento = document.getElementById('funcionamiento').value;
        const lux = document.getElementById('lux').value;
        const observaciones = document.getElementById('observaciones').value;

        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${funcionamiento}</td>
            <td>${lux}</td>
            <td>${observaciones}</td>
        `;
        tableBody.appendChild(newRow);

        form.reset();
    });
});