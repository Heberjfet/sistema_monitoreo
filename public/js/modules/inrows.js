// Este archivo contiene la lógica específica para manejar los datos de inrows.

document.addEventListener('DOMContentLoaded', function() {
    const inrowsForm = document.getElementById('inrows-form');
    const inrowsTable = document.getElementById('inrows-table-body');

    inrowsForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const fpm = document.getElementById('fpm').value;
        const temperatura = document.getElementById('temperatura').value;
        const observaciones = document.getElementById('observaciones').value;

        if (validateInputs(fpm, temperatura)) {
            addRowToTable(fpm, temperatura, observaciones);
            inrowsForm.reset();
        } else {
            alert('Por favor, ingrese valores válidos.');
        }
    });

    function validateInputs(fpm, temperatura) {
        return fpm !== '' && !isNaN(fpm) && temperatura !== '' && !isNaN(temperatura);
    }

    function addRowToTable(fpm, temperatura, observaciones) {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td>${fpm}</td>
            <td>${temperatura}</td>
            <td>${observaciones}</td>
        `;
        inrowsTable.appendChild(newRow);
    }
});