// Variables globales para almacenar el estado de la última tirada
let lastSides = null; // Almacenar el último tipo de dado (número de caras)
let lastTiradas = null; // Almacenar el último número de tiradas


// Función para lanzar los dados
function rollDice(sides) {
    const numTiradas = document.getElementById('num-tiradas').value || 4; // Número de tiradas, por defecto es 4
    const diceContainer = document.getElementById('dice-container');
    const totalContainer = document.getElementById('total-container');
    
    // Limpiar el contenido anterior
    diceContainer.innerHTML = '';
    totalContainer.innerHTML = '';

    const results = []; // Almacenar los resultados de las tiradas

    // Generar los resultados de los dados
    for (let i = 0; i < numTiradas; i++) {
        const result = Math.floor(Math.random() * sides) + 1; // Generar número aleatorio
        results.push(result);

        // Crear un nuevo dado (cuadrado) para cada tirada
        const dice = document.createElement('div');
        dice.classList.add('dice', 'animate'); // Añadir clase de animación

        // Añadir el dado al contenedor principal
        diceContainer.appendChild(dice);

        // Mostrar el número con un retraso (por ejemplo, 1 segundo)
        setTimeout(() => {
            dice.textContent = result; // Mostrar el resultado en el dado
        }, 1000); // Duración del retraso en ms (1s)

        // Eliminar la clase de animación después de 1 segundo
        setTimeout(() => {
            dice.classList.remove('animate');
        }, 1000); // Duración de la animación en ms (1s)
    }

    // Ordenar los resultados en orden descendente
    const sortedResults = results.sort((a, b) => b - a);

    // Tomar los tres resultados más altos
    const topThreeResults = sortedResults.slice(0, 3);

    // Calcular el total sumando los tres resultados más altos
    const total = topThreeResults.reduce((acc, curr) => acc + curr, 0);

    // Mostrar el total en el contenedor de total
    const totalP = document.createElement('p');
    totalP.className = "fs-4";
    totalP.innerHTML = `Total de los 3 más altos: <span id="total">${total}</span>`;
    totalContainer.appendChild(totalP);

    // Almacenar los últimos valores para repetir la tirada
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
        rollDice(lastSides); // Repetir la tirada con el mismo número de lados y tiradas
    }
}

// Función para reiniciar el juego
function resetGame() {
    const diceContainer = document.getElementById('dice-container');
    const totalContainer = document.getElementById('total-container');
    
    // Limpiar los resultados anteriores
    diceContainer.innerHTML = '';
    totalContainer.innerHTML = '';

    // Desactivar el botón de "Repetir tirada"
    document.getElementById('repeat-button').disabled = true;

    // Reiniciar los valores de las últimas tiradas
    lastSides = null;
    lastTiradas = null;
}
