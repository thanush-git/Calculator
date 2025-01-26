const display = document.querySelector(".cal-display");
const calButtons = document.querySelector(".cal-buttons");

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => (b !== 0 ? a / b : "infinity");
const negate = (a) => -a;
const percent = (a, b = null) => (b !== null ? (a * b) / 100 : a / 100);

const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ["+", "-", "*", "/", "%"];
const functional = ["AC", "CE"];

let operand1 = "";
let operand2 = "";
let operator = "";

calButtons.addEventListener("click", (e) => {
    if (e.target.tagName == 'BUTTON') {
        const curr_char = e.target.value;

        // Handle numbers
        if (numbers.includes(curr_char)) {
            if (!operator) {
                if (operand1.length < 12) { // Limiting input to 12 characters
                    operand1 += curr_char;
                    display.innerHTML = operand1;
                }
            } else {
                if (operand2.length < 12) { 
                    operand2 += curr_char;
                    display.innerHTML = operand2;
                }
            }
        }

        if (operators.includes(curr_char)) {
            if (curr_char === "%" && !operand2) {
                operand1 = formatResult(percent(parseFloat(operand1))).toString();
                display.innerHTML = operand1;
                operator = ""; 
            } else {
                operator = curr_char;
                display.innerHTML = '';
            }
        }

        if (functional.includes(curr_char)) {
            if (curr_char === 'AC') {
                display.innerHTML = '';
                operand1 = '';
                operand2 = '';
                operator = '';
            }

            if (curr_char === 'CE') {
                display.innerHTML = display.innerHTML.slice(0, -1);
                if (!operator) {
                    operand1 = operand1.slice(0, -1);
                } else {
                    operand2 = operand2.slice(0, -1);
                }
            }
        }

        if (
            (curr_char === '=' && operand1 && operand2 && operator) ||
            (operators.includes(curr_char) && operand1 && operand2)
        ) {
            display.innerHTML = '';
            const result = formatResult(operate(parseFloat(operand1), parseFloat(operand2), operator));
            display.innerHTML = result;
            operand1 = result.toString();
            operator = '';
            operand2 = '';
            if (operators.includes(curr_char)) {
                operator = curr_char;
            }
        }
        console.log(curr_char);
    }
    console.log("opd1: ", operand1, "op: ", operator, "op2: ", operand2);
});

// Function to handle operations
function operate(opd1, opd2, op) {
    switch (op) {
        case '+':
            return add(opd1, opd2);
        case '-':
            return sub(opd1, opd2);
        case '*':
            return mul(opd1, opd2);
        case '/':
            if (opd2 === 0) {
                return "infinity";
            } else {
                return div(opd1, opd2);
            }
        case '%':
            return percent(opd1, opd2);
    }
}

function formatResult(value) {
    if (typeof value === "number") {
        // Limit to 4 decimal places
        value = parseFloat(value.toFixed(4));

        // Convert to scientific notation if exceeding 12 characters
        if (value.toString().length > 12) {
            return value.toExponential(4); // Format as scientific notation
        }
    }
    return value;
}
