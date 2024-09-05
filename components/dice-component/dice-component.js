// dice-component.js

let lastSides = null; // Para almacenar el último tipo de dado
let lastTiradas = null; // Para almacenar el último número de tiradas

// Función para lanzar un dado
function rollDice(sides) {
    const numTiradas = document.getElementById('num-tiradas').value || 4; // Número de tiradas por defecto es 4
    const diceContainer = document.getElementById('dice-container');
    const totalContainer = document.getElementById('total-container');
    diceContainer.innerHTML = ''; // Limpiar los dados anteriores
    totalContainer.innerHTML = ''; // Limpiar el total anterior

    const results = []; // Almacenar los resultados de las tiradas

    // Generar los resultados de los dados
    for (let i = 0; i < numTiradas; i++) {
        const result = Math.floor(Math.random() * sides) + 1;
        results.push(result);

        const dice = document.createElement('div');
        dice.classList.add('dice');
        dice.textContent = result; // Mostrar el resultado dentro del dado
        diceContainer.appendChild(dice);
    }

    const sortedResults = results.sort((a, b) => b - a);
    const topThreeResults = sortedResults.slice(0, 3);
    const total = topThreeResults.reduce((acc, curr) => acc + curr, 0);

    const totalP = document.createElement('p');
    totalP.className = "fs-4";
    totalP.innerHTML = `Total de los 3 más altos: <span id="total">${total}</span>`;
    totalContainer.appendChild(totalP);

    // Almacenar los últimos valores para repetir tirada
    lastSides = sides;
    lastTiradas = numTiradas;

    // Habilitar el botón de "Repetir tirada"
    document.getElementById('repeat-button').disabled = false;

    // Llamar a la función para agregar la tirada al historial
    if (typeof addRollToHistory === 'function') {
        addRollToHistory(results, total);
    } else {
        console.error('addRollToHistory no está definida');
    }
}

// Función para repetir la última tirada
function repeatLastRoll() {
    if (lastSides !== null && lastTiradas !== null) {
        rollDice(lastSides);
    }
}

// Función para reiniciar el juego
function resetGame() {
    const diceContainer = document.getElementById('dice-container');
    const totalContainer = document.getElementById('total-container');
    diceContainer.innerHTML = ''; // Limpiar los resultados
    totalContainer.innerHTML = ''; // Limpiar el total

    // Desactivar el botón de "Repetir tirada"
    document.getElementById('repeat-button').disabled = true;

    // Reiniciar los valores de las últimas tiradas
    lastSides = null;
    lastTiradas = null;
}
