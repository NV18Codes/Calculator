// Initialize variables
let history = [];
const resultDisplay = document.getElementById('result');
const historyToggle = document.getElementById('history-toggle');
const historySection = document.getElementById('history-section');
const closeHistoryButton = document.getElementById('close-history');
const noHistoryMessage = document.getElementById('no-history-message');
const historyList = document.getElementById('history');
const swapButton = document.getElementById('swap-calculator');

// Event listener for DOMContentLoaded to initialize the calculator
document.addEventListener('DOMContentLoaded', () => {
    createBasicCalculator();
    updateHistory(); // Ensure history is updated on load

    // Toggle between basic and scientific calculators
    swapButton.addEventListener('click', () => {
        isScientific = !isScientific;
        swapButton.textContent = isScientific ? 'Switch to Basic' : 'Switch to Scientific';
        isScientific ? createScientificCalculator() : createBasicCalculator();
    });

    // Show history section
    historyToggle.addEventListener('click', () => {
        historySection.classList.remove('hidden');
    });

    // Close history section
    closeHistoryButton.addEventListener('click', () => {
        historySection.classList.add('hidden');
    });

    // Clear history functionality
    document.getElementById('clear-history').addEventListener('click', () => {
        history = []; // Clear the history array
        updateHistory(); // Update the displayed history
    });
});

// Function to create and display the basic calculator buttons
function createBasicCalculator() {
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.innerHTML = '';

    const basicButtons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ];

    basicButtons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.innerText = button;
        buttonElement.classList.add('bg-white', 'bg-opacity-80', 'text-black', 'px-5', 'py-3', 'rounded-lg', 'cursor-pointer');
        buttonElement.addEventListener('click', () => handleButtonClick(button));
        buttonsContainer.appendChild(buttonElement);
    });
}

// Function to create and display the scientific calculator buttons
function createScientificCalculator() {
    const buttonsContainer = document.getElementById('buttons');
    buttonsContainer.innerHTML = '';

    const scientificButtons = [
        'sin', 'cos', 'tan', 'log',
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ];

    scientificButtons.forEach(button => {
        const buttonElement = document.createElement('button');
        buttonElement.innerText = button;
        buttonElement.classList.add('bg-white', 'bg-opacity-80', 'text-black', 'px-5', 'py-3', 'rounded-lg', 'cursor-pointer');
        buttonElement.addEventListener('click', () => handleButtonClick(button));
        buttonsContainer.appendChild(buttonElement);
    });
}

// Handle button click events
function handleButtonClick(buttonValue) {
    if (buttonValue === 'C') {
        resultDisplay.value = ''; // Clear the result display
    } else if (buttonValue === '=') {
        try {
            const equation = resultDisplay.value;
            const result = eval(equation);
            resultDisplay.value = result;

            // Save the full equation along with the result to history
            history.push(`${equation} = ${result}`);
            updateHistory();
        } catch (error) {
            resultDisplay.value = 'Error';
        }
    } else {
        resultDisplay.value += buttonValue; // Append button value to result display
    }
}

// Update history display
function updateHistory() {
    historyList.innerHTML = ''; // Clear current history
    if (history.length === 0) {
        noHistoryMessage.classList.remove('hidden');
    } else {
        noHistoryMessage.classList.add('hidden');
        history.forEach(entry => {
            const historyItem = document.createElement('li');
            historyItem.textContent = entry;
            historyList.appendChild(historyItem);
        });
    }
}
