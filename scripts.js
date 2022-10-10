// Initialize array of values that will be shown on the screen
let displayArray = [];

function add(num1, num2) {
    value = num1 + num2;
    return calcDisplay(value);
};  


function subtract(num1, num2) {
    value = num1 - num2;
    return calcDisplay(value);
};


function multiply(num1, num2) {
    value = num1 * num2;
    return calcDisplay(value);
};


function divide(num1, num2) {
    value = num1 / num2;
    return calcDisplay(value);
};


function operate(array) {
    console.log(array);
    for(let i = 0; i < array.length; i++) {
        // If i is +,-,*, or /, set num1 & num2 to the values left and right of the operator
        if (isNaN(array[i])) {
            const num1 = parseInt(array[i - 1]);
            const num2 = parseInt(array[i + 1]);

            // Depending on the operator, send numbers to correct function
        if(array[i] == "+") return add(num1, num2);
        if(array[i] == "-") return subtract(num1, num2);
        if(array[i] == "*") return multiply(num1, num2);
        if(array[i] == "/") return divide(num1, num2);
        };
    };
};

// Function that takes a value as input and displays it on the calculator screen 
function calcDisplay(value) {
    // Append the value to the display array
    displayArray.push(value);

    // Get calc-screen input
    let display = document.getElementById('display');
    display.value = `current: ${value}, all: ${displayArray.join(' ')}`;
    console.log(displayArray);
}

// Get all of the buttons into a variable
let buttons = document.querySelectorAll('button');
// For each button add click event listener that sends button value to calcDisplay function
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        // Get value of the clicked button
        let value = e.target.innerHTML;
        // Handle divide and multiply symbols
        if (value == "x") value = '*';
        if (value == "÷") value = '/';
        
        // If the value is AC, send to a clear function

        // If the value is = send it to the operate function
        if (value == "=") return operate(displayArray);
        calcDisplay(value);
    })
})