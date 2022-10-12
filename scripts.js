// Elements
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const historyDisplay = document.getElementById('historyDisplay');
const currentDisplay = document.getElementById('currentDisplay');

// Clear everything initially
let operator = "";
let nextOperator = "";
let num1 = "";
let num2 = "";
let answer = "";
historyDisplay.innerHTML = "";
currentDisplay.innerHTML = "";

// Calculates equation
function operate(historyDisplayText, currentDisplayText) {
    // Split historyDisplayText to separate the number and operator
    historyDisplayText_split = historyDisplayText.split(" ");

    num1 = Number(historyDisplayText_split[0]);
    operator = historyDisplayText_split[1];
    num2 = Number(currentDisplayText);

    // Perform correct calculation
    if(operator == "*") answer = num1 * num2;
    if(operator == "/") answer =  num1 / num2;
    if(operator == "+") answer =  num1 + num2;
    if(operator == "-") {
        if (num2 == 0) return alert("Cannot divide by zero!")
        else answer = num1 - num2;
    }

    if (nextOperator.length > 0) {
        // Change existing displays
        historyDisplay.innerHTML = `${answer} ${nextOperator}`;
        currentDisplay.innerHTML = "";
        nextOperator = "";
    }
    else {
        historyDisplay.innerHTML = "";
        currentDisplay.innerHTML = answer;
    }
};

// Function that displays previous inputs
function displayHistory(operator) {
    // If there is already an equation in historyDisplay send it to operate function
    if (historyDisplay.innerHTML.length > 1) {
        nextOperator = operator;
        return operate(historyDisplay.innerHTML, currentDisplay.innerHTML);
    }
    else {
        // Make history display the current display, then clear current display
        historyDisplay.innerHTML = currentDisplay.innerHTML + " " + operator;
        currentDisplay.innerHTML = "";
    }
}

// Function that displays current value
function displayCurrent(current) {
    // Only allow one decimal point
    if (current == "." && currentDisplay.innerHTML.includes(".")) return;
    currentDisplay.innerHTML += current;
};


// Event listener for number buttons and decimal button
numberButtons.forEach(numerButton => {
    numerButton.addEventListener('click', function(e) {
        let current = e.target.innerHTML;
        displayCurrent(current);
    })
});
// Event listener for operator buttons
operatorButtons.forEach(operatorButton => {
    operatorButton.addEventListener('click', function(e) {
        // Do nothing if operator is clicked before any numbers
        if (currentDisplay.innerHTML.length < 1) return

        operator = e.target.innerHTML;
        if (operator == "x") operator = "*";
        if (operator == "÷") operator = "/";
        displayHistory(operator);
    })
});
// Event listener for equals button
equalsButton.addEventListener('click', () => operate(historyDisplay.innerHTML, currentDisplay.innerHTML));
// Event listener for clear button