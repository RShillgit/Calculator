// Buttons
const numberButtons = document.querySelectorAll('.number');
const operatorButtons = document.querySelectorAll('.operator');
const equalsButton = document.querySelector('.equals');
const clearButton = document.querySelector('.clear');
const deleteButton = document.querySelector('.delete');
const signButton = document.querySelector('.sign');
const percentButton = document.querySelector('.percent');

// Elements
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
    if(operator == "-") answer =  num1 - num2;
    if(operator == "+") answer =  num1 + num2;
    if(operator == "/") {
        if (num2 == 0) return alert("Cannot divide by zero!")
        else {
            answer = num1 / num2;
            //let unroundedAnswer = num1 / num2;
            // answer = unroundedAnswer.toFixed(4);
        }
    }

    if (nextOperator.length > 0) {
        // Change existing displays
        historyDisplay.innerHTML = `${answer} ${nextOperator}`;
        currentDisplay.innerHTML = "";
        nextOperator = "";
    }
    else {
        historyDisplay.innerHTML = "";
        // Temporarily convert answer to string 
        let answerString = answer.toString();
        if (answerString.length >= 8) {
            // Convert long answer to scientific notation so it will fit in the screen
            let scientificAnswer = answer.toExponential();
            // If the length of the scientfic notation is too long as well then round it
            if (scientificAnswer.length >= 8) {
                let intScientificAnswer = Number(scientificAnswer).toPrecision(2);
                return currentDisplay.innerHTML = intScientificAnswer;
            }
            return currentDisplay.innerHTML = scientificAnswer;
        }      
        return currentDisplay.innerHTML = answer;
    };
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
};

// Function that displays current value
function displayCurrent(current) {
    // Dont let length go over 9 digits
    if (currentDisplay.innerHTML.length >= 9) {
        return 
    } 
    // Only allow one decimal point
    if (current == "." && currentDisplay.innerHTML.includes(".")) return;
    currentDisplay.innerHTML += current;
};

// Event listener for number buttons and decimal button
numberButtons.forEach(numerButton => {
    numerButton.addEventListener('click', function(e) {
        let current = e.target.innerHTML;
        // Stop user from entering only zeros unless followed by a decimal point
        if (current !== "." && currentDisplay.innerHTML.includes("0") && currentDisplay.innerHTML.length == 1) return
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
equalsButton.addEventListener('click', () => {
    // If there is nothing in the history display and the user clicks "=" do nothing
    if (historyDisplay.innerHTML.length < 1) return;
    else operate(historyDisplay.innerHTML, currentDisplay.innerHTML);
});

// Event listener for clear button
clearButton.addEventListener('click', () => {
    operator = "";
    nextOperator = "";
    num1 = "";
    num2 = "";
    answer = "";
    historyDisplay.innerHTML = "";
    currentDisplay.innerHTML = "";
});

// Event listener for delete button
deleteButton.addEventListener('click', () => {
    if (currentDisplay.innerHTML.length < 1) return
    else currentDisplay.innerHTML = currentDisplay.innerHTML.slice(0, -1);
});

// Event listener for sign button
signButton.addEventListener('click', () => {
    // If currentDisplay is empty, do nothing
    if (currentDisplay.innerHTML.length < 1) return;
    // If value is already negative, make it postive
    else if (currentDisplay.innerHTML.includes("-")) currentDisplay.innerHTML = currentDisplay.innerHTML.replace("-", "");
    // Else make it negative
    else currentDisplay.innerHTML = "-" + currentDisplay.innerHTML;
});

// Event listener for percent button
percentButton.addEventListener('click', () => {
    if (currentDisplay.innerHTML.length < 1) return;
    else currentDisplay.innerHTML = currentDisplay.innerHTML / 100;
});
