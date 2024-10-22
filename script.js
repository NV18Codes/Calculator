document.addEventListener("DOMContentLoaded", function () {
    const resultDisplay = document.getElementById("result");
    const buttonsContainer = document.getElementById("buttons");
    const swapCalculatorButton = document.getElementById("swap-calculator");
    const historyToggleButton = document.getElementById("history-toggle");
    const historySection = document.getElementById("history-section");
    const closeHistoryButton = document.getElementById("close-history");
    const clearHistoryButton = document.getElementById("clear-history");
    const historyList = document.getElementById("history");
    const noHistoryMessage = document.getElementById("no-history-message");
    
    let isScientific = false;
    let currentInput = '';
    let history = [];

    const basicButtons = [
        '7', '8', '9', '/', 
        '4', '5', '6', '*', 
        '1', '2', '3', '-', 
        '0', '.', '=', '+', 
        'C'
    ];

    const scientificButtons = [
        'sin', 'cos', 'tan', 'log', 
        'sqrt', 'exp', '(', ')',
        'pi', 'e', '^', '%'
    ];

    function appendToResult(value) {
        currentInput += value;
        resultDisplay.value = currentInput;
    }

    function evaluateExpression() {
        try {
            const result = eval(currentInput);
            addToHistory(`${currentInput} = ${result}`);
            currentInput = result.toString();
            resultDisplay.value = result;
        } catch (error) {
            resultDisplay.value = 'Error';
            currentInput = '';
        }
    }

    function clearResult() {
        currentInput = '';
        resultDisplay.value = '';
    }

    function addToHistory(entry) {
        history.push(entry);
        const li = document.createElement('li');
        li.textContent = entry;
        historyList.appendChild(li);
        noHistoryMessage.style.display = 'none';
    }

    function clearHistory() {
        history = [];
        historyList.innerHTML = '';
        noHistoryMessage.style.display = 'block';
    }

    function addButtons(buttonArray) {
        buttonsContainer.innerHTML = ''; // Clear the buttons first
        buttonArray.forEach(btn => {
            const button = document.createElement('button');
            button.textContent = btn;
            button.className = 'bg-white bg-opacity-70 text-black rounded-lg p-2 cursor-pointer';
            button.onclick = () => handleButtonClick(btn);
            buttonsContainer.appendChild(button);
        });
    }

    function handleButtonClick(btn) {
        if (btn === '=') {
            evaluateExpression();
        } else if (btn === 'C') {
            clearResult();
        } else if (btn === 'sin') {
            appendToResult('Math.sin(');
        } else if (btn === 'cos') {
            appendToResult('Math.cos(');
        } else if (btn === 'tan') {
            appendToResult('Math.tan(');
        } else if (btn === 'log') {
            appendToResult('Math.log(');
        } else if (btn === 'sqrt') {
            appendToResult('Math.sqrt(');
        } else if (btn === 'exp') {
            appendToResult('Math.exp(');
        } else if (btn === 'pi') {
            appendToResult('Math.PI');
        } else if (btn === 'e') {
            appendToResult('Math.E');
        } else if (btn === '^') {
            appendToResult('**');
        } else if (btn === '%') {
            appendToResult('/100');
        } else {
            appendToResult(btn);
        }
    }

    function toggleScientific() {
        isScientific = !isScientific;
        const buttons = isScientific ? basicButtons.concat(scientificButtons) : basicButtons;
        swapCalculatorButton.textContent = isScientific ? 'Switch to Basic' : 'Switch to Scientific';
        addButtons(buttons);
    }

    function toggleHistory() {
        historySection.classList.toggle('hidden');
    }

    addButtons(basicButtons); // Initialize with basic buttons

    swapCalculatorButton.addEventListener("click", toggleScientific);
    historyToggleButton.addEventListener("click", toggleHistory);
    closeHistoryButton.addEventListener("click", toggleHistory);
    clearHistoryButton.addEventListener("click", clearHistory);
});
