// Este archivo contiene la lógica específica para manejar los datos de aires acondicionados.

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('aires-acondicionados-form');
    const tableBody = document.getElementById('aires-acondicionados-table-body');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const tiempoUso = document.getElementById('tiempo-uso').value;
        const observaciones = document.getElementById('observaciones').value;

        if (validateInputs(tiempoUso, observaciones)) {
            addRowToTable(tiempoUso, observaciones);
            form.reset();
        } else {
            alert('Por favor, complete todos los campos.');
        }
    });

    function validateInputs(tiempoUso, observaciones) {
        return tiempoUso !== '' && observaciones !== '';
    }

    function addRowToTable(tiempoUso, observaciones) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${tiempoUso}</td>
            <td>${observaciones}</td>
        `;
        tableBody.appendChild(newRow);
    }
});