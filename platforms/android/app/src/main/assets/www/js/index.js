import { ZeroDivisionError } from './Exceptions/ZeroDivisionError.js';

document.body.style.overflow = "hidden";
const outputField = document.querySelector('.input');
const numberButtons = document.querySelectorAll('.button');
const specialButtons = document.querySelectorAll('.special-button');
const operatorButtons = document.querySelectorAll('.operations-button');

let lastContent = null;

addOnClick(numberButtons, showNumber);
addOnClick(specialButtons, showSpecialText);
addOnClick(operatorButtons, showOperator);

document.addEventListener('touchmove', doNotMove, { passive: false });

function doNotMove(event) {
    event.preventDefault();
}

function addOnClick(elements, callback) {
    elements.forEach((element) => {
        element.addEventListener('click', () => {
            callback(element);
        });
    });
}

function showNumber(button) {
    appendValueToOutputField(button.value);
    lastContent = button;
}

function showOperator(button) {
    const isOperatorButton = lastContent.classList.contains('operations-button');

    if (button.value !== lastContent?.value && !isOperatorButton) {
        appendValueToOutputField(button.value);
        lastContent = button;
    }
}

function showSpecialText(button) {
    const isSolveButton = button.classList.contains('solve');

    if (isSolveButton) {
        executeOperation();
    } else if (button.value === "C") {
        clearEntry();
    } else if (button.value !== lastContent?.value) {
        appendValueToOutputField(button.value);
        lastContent = button;
    }
}

function appendValueToOutputField(value) {
    outputField.value += value;
}

function clearEntry() {
    outputField.value = '';
}

function executeOperation() {
    try {
        const result = eval(outputField.value);
        console.log(result);
        if (result === Infinity) {
            console.log("es esto", result);
            throw new ZeroDivisionError();
        } else if (result !== undefined) {
            outputField.value = result;
        }
    } catch (error) {
        handleExecutionError(error);
    }
}

function handleExecutionError(error) {
    if (error instanceof ZeroDivisionError) {
        outputField.value = error.message;
    } else {
        console.log("Error al realizar la operación:", error.message);
        outputField.value = "Error";
    }
}
