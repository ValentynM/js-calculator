const display = document.querySelector('.display');

document.querySelectorAll('.digits button, .operations button').forEach(button =>
    button.addEventListener('click', digitOrOperationClicked));

function digitOrOperationClicked(event) {
    display.value += event.target.innerText;
}

document.querySelector('.equal').addEventListener('click', equalPressed);
document.querySelector('.clear').addEventListener('click', clearDisplay);

function clearDisplay() {
    display.value = '';
}

function equalPressed() {
    try {
        const result = eval(display.value);
        logCalculation(display.value, result);
        console.log(previousCalculations);
        display.value = result;
    }
    catch (SyntaxError) {
        clearDisplay();
        alert('Syntax Error! Try again!');
        return;
    }
}

const calcHistory = document.querySelector('.history');
let previousCalculations = [];

function logCalculation(expr, result) {
    previousCalculations.unshift(`${expr} = ${result}`);
    previousCalculations.length > 10 ? previousCalculations.pop() : null;
}
