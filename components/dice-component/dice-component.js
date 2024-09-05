let lastSides = null; // Para almacenar el último tipo de dado
let lastTiradas = null; // Para almacenar el último número de tiradas
let history = []; // Almacenar el historial de tiradas

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

        // Crear un nuevo dado (cuadrado) para cada tirada
        const dice = document.createElement('div');
        dice.classList.add('dice');
        dice.textContent = result; // Mostrar el resultado dentro del dado

        // Añadir el dado al contenedor principal
        diceContainer.appendChild(dice);
    }

    // Ordenar los resultados en orden descendente
    const sortedResults = results.sort((a, b) => b - a);

    // Tomar los tres resultados más altos
    const topThreeResults = sortedResults.slice(0, 3);

    // Calcular el total sumando los tres resultados más altos
    const total = topThreeResults.reduce((acc, curr) => acc + curr, 0);

    // Mostrar el total
    const totalP = document.createElement('p');
    totalP.className = "fs-4";
    totalP.innerHTML = `Total de los 3 más altos: <span id="total">${total}</span>`;
    totalContainer.appendChild(totalP);

    // Almacenar los últimos valores para repetir tirada
    lastSides = sides;
    lastTiradas = numTiradas;

    // Habilitar el botón de "Repetir tirada"
    document.getElementById('repeat-button').disabled = false;

    // Añadir la tirada al historial
    addRollToHistory(results, total);
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
