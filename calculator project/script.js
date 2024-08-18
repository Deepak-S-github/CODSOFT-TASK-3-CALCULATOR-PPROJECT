const display = document.getElementById('display');
const equationDisplay = document.getElementById('equation');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = null;

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === '.') {
            handleNumber(value);
        } else {
            handleOperator(value);
        }
    });
});

function handleNumber(value) {
    if (currentInput.includes('.') && value === '.') return;
    currentInput += value;
    display.textContent = currentInput;
}

function handleOperator(value) {
    switch (value) {
        case 'C':
            currentInput = '';
            previousInput = '';
            operator = null;
            display.textContent = '0';
            equationDisplay.textContent = '';
            break;
        case '=':
            if (operator && currentInput) {
                currentInput = operate(operator, previousInput, currentInput);
                display.textContent = currentInput;
                equationDisplay.textContent = `${previousInput} ${operator} ${currentInput}`;
                previousInput = '';
                operator = null;
            }
            break;
        default:
            if (currentInput) {
                if (operator) {
                    currentInput = operate(operator, previousInput, currentInput);
                    display.textContent = currentInput;
                }
                previousInput = currentInput;
                currentInput = '';
                operator = value;
                equationDisplay.textContent = `${previousInput} ${operator}`;
            }
            break;
    }
}

function operate(operator, a, b) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (operator) {
        case '+':
            return (a + b).toString();
        case '-':
            return (a - b).toString();
        case '*':
            return (a * b).toString();
        case '/':
            return (a / b).toString();
        default:
            return '';
    }
}
