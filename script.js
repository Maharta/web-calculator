import { Calculator } from "./calculator.js";

const calculator = new Calculator();

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  const operation = {
    "+": add,
    "-": subtract,
    x: multiply,
    "/": divide,
  };

  return operation[operator](a, b);
}
const display = document.querySelector(".display-value");

function appendNumber(e) {
  if (e.target.textContent === ".") {
    if (display.textContent.includes(".")) return;
  }

  if (calculator.operator && calculator.nextOperand === null) {
    display.textContent = e.target.dataset.value;
  } else if (display.textContent !== "0") {
    display.textContent += e.target.dataset.value;
  } else {
    display.textContent = e.target.dataset.value;
  }

  if (calculator.operator === null) {
    calculator.setCurrentOperand(parseFloat(display.textContent));
  } else {
    calculator.setNextOperand(parseFloat(display.textContent));
  }
  console.log(calculator);
}

function setOperator(e) {
  if (calculator.isReadyToCount()) {
    calculate(e);
  } else {
    calculator.setOperator(e.target.dataset.operator);
  }
  console.log(calculator);
}

function calculate(e) {
  if (calculator.isReadyToCount()) {
    const result = operate(
      calculator.operator,
      calculator.currentOperand,
      calculator.nextOperand
    );
    calculator.setCurrentOperand(result);
    calculator.setNextOperand(null);
    if (e.target.textContent === "=") {
      calculator.setOperator(null);
    } else {
      calculator.setOperator(e.target.textContent);
    }
    display.textContent = result;
  }
  console.log(calculator);
}

function delNumber() {
  if (calculator.operator === null) {
    const currentOperandAsString = calculator.currentOperand.toString();
    let currentOperand =
      currentOperandAsString.length > 1
        ? currentOperandAsString.substring(0, currentOperandAsString.length - 1)
        : "0";
    calculator.currentOperand = parseFloat(currentOperand);
    display.textContent = calculator.currentOperand;
  } else {
    let currentNextAsString;
    if (calculator.nextOperand === null) {
      currentNextAsString = "0";
    } else {
      currentNextAsString = calculator.nextOperand.toString();
    }
    let nextOperand =
      currentNextAsString.length > 1
        ? currentNextAsString.substring(0, currentNextAsString.length - 1)
        : "0";
    calculator.nextOperand = parseFloat(nextOperand);
    display.textContent = calculator.nextOperand;
  }
  console.log(calculator);
}

function clear() {
  calculator.clear();
  display.textContent = "0";
  console.log(calculator);
}

const numberButtons = document.querySelectorAll("button[data-value]");
numberButtons.forEach((button) => {
  button.addEventListener("click", appendNumber);
});

const operatorButtons = document.querySelectorAll("button[data-operator]");
operatorButtons.forEach((button) => {
  button.addEventListener("click", setOperator);
});

const equalButton = document.querySelector("button[data-result]");
equalButton.addEventListener("click", calculate);

const delButton = document.querySelector(".delButton");
delButton.addEventListener("click", delNumber);

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", clear);
