const display = document.querySelector(".cal-display");
const calButtons = document.querySelector(".cal-buttons");

const add = (a, b) => a + b;
const sub = (a, b) => a - b;
const mul = (a, b) => a * b;
const div = (a, b) => (b !== 0 ? a / b : "Error"); // Prevent division by zero
const negate = (a) => -a;

const numbers = ['0','1','2','3','4','5','6','7','8','9'];
const operators = ["+", "-", "*", "/", "%"];
const functional = ["AC", "CE"];

let operand1 = "";
let operand2 = "";
let operator = "";

calButtons.addEventListener("click", (e) => {
    if (e.target.tagName == 'BUTTON'){
        const curr_char = e.target.value;
        if (numbers.includes(curr_char)){
            if (!operator){
                operand1 += curr_char;
                display.innerHTML = operand1;
            }

            else{
                operand2 += curr_char;
                display.innerHTML = operand2;
            }
        }
        if (operators.includes(curr_char)){
            operator = curr_char;
            display.innerHTML = '';
        }

        if(functional.includes(curr_char)){
            if(curr_char == 'AC'){
                display.innerHTML = '';
                operand1 = '';
                operand2 = '';
                operator = '';
            }

            if(curr_char == 'CE'){
                display.innerHTML = display.innerHTML.slice(0,-1);
                if(!operator){
                    operand1 = operand1.slice(0,-1);
                }
                else if (operator){
                    operand2 = operand2.slice(0,-1);
                }
            }
        }

        if ((curr_char === '=' && operand1 && operand2 && operator)
            || (operators.includes(curr_char) && operand1 && operand2)){
            display.innerHTML = '';
            const result = operate(parseFloat(operand1), parseFloat(operand2), operator);
            display.innerHTML = result;
            operand1 = parseFloat(result);
            operator = '';
            operand2 = '';
        }
        console.log(curr_char);
    }
    console.log("opd1: ",operand1, "op: ",operator, "op2: ",operand2);
})


function operate(opd1,opd2,op){
    switch(op){
        case '+':
            return add(opd1, opd2);
        case '-':
            return sub(opd1. opd2);
        case '*':
            return mul(opd1, opd2);
        case '/':
            if (opd2 === 0){
                return "infinity";
            }
            else{
                return div(opd1, opd2);
            }
    }
}