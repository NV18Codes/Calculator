let isScientific = false; // Initial mode is basic calculator
let history = [];

window.onload = function () {
    loadBasicCalculator(); // Load the basic calculator by default
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
        appendToExpression(key); // Append number
    } else if (['+', '-', '*', '/'].includes(key)) {
        appendToExpression(key); // Append operator
    } else if (key === 'Enter' || key === '=') {
        event.preventDefault(); // Prevent form submission on 'Enter'
        calculateResult(); // Perform calculation
    } else if (key === 'Backspace') {
        DeleteExpression(); // Delete the last character
    } else if (key === 'Escape') {
        clearExpression(); // Clear input on 'Escape'
    } else if (key === '.') {
        appendToExpression('.'); // Append decimal point
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

function appendToExpression(value) {
    const result = document.getElementById('result');
    result.value += value;
}

function clearExpression() {
    const result = document.getElementById('result');
    result.value = '';
}

function DeleteExpression() {
    const result = document.getElementById('result');
    result.value = result.value.slice(0, -1);
}

function calculateResult() {
    const result = document.getElementById('result');
    try {
        const calculation = eval(result.value);
        if (!isNaN(calculation)) {
            history.push(`${result.value} = ${calculation}`);
            localStorage.setItem('calcHistory', JSON.stringify(history));
            result.value = calculation;
            updateHistory();
        }
    } catch {
        result.value = 'Error';
    }
}

function appendToScientificExpression(value) {
    const result = document.getElementById('result');
    result.value += value;
}

function clearScientificExpression() {
    const result = document.getElementById('result');
    result.value = '';
}

// History management functions remain the same...
