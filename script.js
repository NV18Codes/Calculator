let isScientific = false; // Initial mode is basic calculator
let history = [];

// Ensure the basic calculator loads when the webpage opens
window.onload = function () {
    loadBasicCalculator(); // Load the basic calculator by default
    const storedHistory = localStorage.getItem('calcHistory');
    if (storedHistory) {
        history = JSON.parse(storedHistory);
    }
    updateHistory(); // Load saved history from localStorage

    // Add event listener for keyboard input
    window.addEventListener('keydown', handleKeyboardInput);
};

function toggleCalculator() {
    isScientific = !isScientific; // Toggle the mode
    if (isScientific) {
        loadScientificCalculator(); // Load scientific calculator
        document.getElementById('swap-calculator').textContent = 'Switch to Basic'; // Update button text
    } else {
        loadBasicCalculator(); // Load basic calculator
        document.getElementById('swap-calculator').textContent = 'Switch to Scientific'; // Update button text
    }
}

function handleKeyboardInput(event) {
    const key = event.key;

    // Handle numbers, operators, and special keys
    if (/\d/.test(key)) {
        appendToExpression(key);
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToExpression(` ${key} `);
    } else if (key === 'Enter') {
        calculateResult();
    } else if (key === 'Backspace') {
        DeleteExpression();
    } else if (key === 'Escape') {
        clearExpression();
    }
}

function loadBasicCalculator() {
    const buttonContainer = document.getElementById('buttons');
    buttonContainer.innerHTML = `
        <button onclick="appendToExpression('7')">7</button>
        <button onclick="appendToExpression('8')">8</button>
        <button onclick="appendToExpression('9')">9</button>
        <button onclick="appendToExpression('/')">÷</button>
        <button onclick="appendToExpression('4')">4</button>
        <button onclick="appendToExpression('5')">5</button>
        <button onclick="appendToExpression('6')">6</button>
        <button onclick="appendToExpression('*')">×</button>
        <button onclick="appendToExpression('1')">1</button>
        <button onclick="appendToExpression('2')">2</button>
        <button onclick="appendToExpression('3')">3</button>
        <button onclick="appendToExpression('-')">−</button>
        <button onclick="appendToExpression('0')">0</button>
        <button onclick="appendToExpression('.')">.</button>
        <button onclick="calculateResult()">=</button>
        <button onclick="appendToExpression('+')">+</button>
        <button onclick="clearExpression()">C</button>
        <button onclick="DeleteExpression()">Del</button>
    `;
}

function loadScientificCalculator() {
    const buttonContainer = document.getElementById('buttons');
    buttonContainer.innerHTML = `
        <button onclick="appendToScientificExpression('sin(')">sin</button>
        <button onclick="appendToScientificExpression('cos(')">cos</button>
        <button onclick="appendToScientificExpression('tan(')">tan</button>
        <button onclick="appendToScientificExpression('log(')">log</button>
        <button onclick="appendToExpression('7')">7</button>
        <button onclick="appendToExpression('8')">8</button>
        <button onclick="appendToExpression('9')">9</button>
        <button onclick="appendToExpression('/')">÷</button>
        <button onclick="appendToExpression('4')">4</button>
        <button onclick="appendToExpression('5')">5</button>
        <button onclick="appendToExpression('6')">6</button>
        <button onclick="appendToExpression('*')">×</button>
        <button onclick="appendToExpression('1')">1</button>
        <button onclick="appendToExpression('2')">2</button>
        <button onclick="appendToExpression('3')">3</button>
        <button onclick="appendToExpression('-')">−</button>
        <button onclick="appendToExpression('0')">0</button>
        <button onclick="appendToExpression('.')">.</button>
        <button onclick="calculateResult()">=</button>
        <button onclick="appendToExpression('+')">+</button>
        <button onclick="clearExpression()">C</button>
        <button onclick="DeleteExpression()">Del</button>
    `;
}

function appendToScientificExpression(value) {
    const result = document.getElementById('result');
    result.value += value;
}

function calculateResult() {
    const result = document.getElementById('result');
    let expression = result.value;

    // Fix input for scientific functions by replacing function names with Math functions
    expression = expression
        .replace(/sin\(/g, 'Math.sin(')
        .replace(/cos\(/g, 'Math.cos(')
        .replace(/tan\(/g, 'Math.tan(')
        .replace(/log\(/g, 'Math.log(')
        .replace(/√/g, 'Math.sqrt('); // For square root

    try {
        // Safely evaluate the expression
        const calculation = eval(expression);

        // Check if calculation is a valid number
        if (!isNaN(calculation)) {
            // Store the valid calculation in history
            history.push(`${result.value} = ${calculation}`);
            localStorage.setItem('calcHistory', JSON.stringify(history));

            // Update result display
            result.value = calculation;
            updateHistory();
        } else {
            // Handle NaN or undefined outputs
            result.value = 'Error';
        }
    } catch (e) {
        // Handle any errors in expression evaluation
        result.value = 'Error';
    }
}

function appendToExpression(value) {
    const result = document.getElementById('result');
    result.value += value; // Concatenate the input value to the existing expression
}

function clearExpression() {
    const result = document.getElementById('result');
    result.value = ''; // Clear the input
}

function DeleteExpression() {
    const result = document.getElementById('result');
    result.value = result.value.slice(0, -1); // Remove the last character
}

function toggleHistory() {
    const historySection = document.getElementById('history-section');
    historySection.style.display = historySection.style.display === 'none' ? 'block' : 'none';
}

function closeHistory() {
    document.getElementById('history-section').style.display = 'none';
}

function updateHistory() {
    const historyList = document.getElementById('history');
    historyList.innerHTML = ''; // Clear current history

    if (history.length === 0) {
        document.getElementById('no-history-message').style.display = 'block';
    } else {
        document.getElementById('no-history-message').style.display = 'none';
        history.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            historyList.appendChild(li);
        });
    }
}

function clearHistory() {
    history = []; // Clear history array
    localStorage.removeItem('calcHistory'); // Clear from localStorage
    updateHistory(); // Update the UI
}
