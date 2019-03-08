const display = document.querySelector('.display');

document.querySelectorAll('.digits button, .operations button').forEach(button =>
    button.addEventListener('click', digitOrOperationClicked));

function digitOrOperationClicked(event) {
    display.value = getNewExpression(display.value, event.target.innerText);
}

document.querySelector('.equal').addEventListener('click', equalPressed);
document.querySelector('.clear').addEventListener('click', clearDisplay);
document.querySelector('.history button').addEventListener('click', clearHistory);

function clearDisplay() {
    display.value = '';
}

function clearHistory() {
    notes.textContent = '';
}

function equalPressed() {
    // на випадок якщо чогось не врахував
    try {
        const result = eval(display.value.split('^').join('**'));
        logCalculation(display.value, result);
        display.value = result;
    }
    catch (SyntaxError) {
        clearDisplay();
        alert('Syntax Error! Try again!');
        return;
    }
}

const historyBlock = document.querySelector('.history');
const notes = document.createElement('p');
let previousCalculations = [];

function logCalculation(expr, result) {
    previousCalculations.unshift(`${expr}=${result}`);
    previousCalculations.length > 10 ? previousCalculations.pop() : null;
    notes.textContent = previousCalculations.join("\r\n");
    historyBlock.appendChild(notes);
}

function getNewExpression(expression, newCharacter) {
    const digits = new Set(['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']);
    const operations = new Set(['+', '-', '*', '/', '^']);

    if (expression == '' && ['+', '*', '/', '^'].includes(newCharacter)) {
        return expression;
    }

    if (expression.slice(-1) == '.' && ['+', '-', '*', '/', '^'].includes(newCharacter)) {
        return expression;
    }

    if ((operations.has(newCharacter)) && (operations.has(expression.slice(-1)))) {
        if (expression.slice(0, -1)) {
            return expression.slice(0, -1) + newCharacter;
        }
        else {
            return 0;
        }
    }
    return expression + newCharacter;
}
