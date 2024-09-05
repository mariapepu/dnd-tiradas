// history-component.js

let history = []; // Almacenar el historial de tiradas

// Función para añadir la tirada al historial
function addRollToHistory(results, total) {
    const historyContainer = document.getElementById('history-container');

    // Crear una nueva fila para la tabla
    const row = document.createElement('tr');

    // Crear la celda con los dados (cuadrados que contienen los números)
    const diceCell = document.createElement('td');
    results.forEach(result => {
        const diceSquare = document.createElement('div');
        diceSquare.classList.add('dice', 'history-dice');
        diceSquare.textContent = result; // Mostrar el número de la tirada dentro del dado
        diceCell.appendChild(diceSquare);
    });

    // Crear la celda con el total de los 3 más altos
    const totalCell = document.createElement('td');
    totalCell.textContent = total;

    // Añadir las celdas a la fila
    row.appendChild(diceCell);
    row.appendChild(totalCell);

    // Añadir la fila al historial (tabla)
    historyContainer.appendChild(row);

    // Almacenar la tirada en el array del historial
    history.push({ results, total });
}

// Función para limpiar el historial
function clearHistory() {
    const historyContainer = document.getElementById('history-container');
    historyContainer.innerHTML = ''; // Limpiar el historial de la tabla
    history = []; // Limpiar el array del historial
}
