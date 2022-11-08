let displayValue = "";
let firstValue = "";
let secondValue = "";
let operand = null;

const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const display = document.querySelector(".number-display");

// Event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    setOperation(button.textContent);
  });
});

// Event listener for equal sign
equalsButton.addEventListener("click", () => {
  equals();
});

function appendNumber(appendValue) {
  display.textContent += appendValue;
  displayValue = display.textContent;
}

function setOperation(operator) {
  if (operand === null) {
    operand = operator;
    firstValue = displayValue;
    display.textContent = "";
  } else if (operand != null) {
    equals();
  }
}

function equals() {
  if (operand != null) {
    secondValue = display.textContent;
    display.textContent = operate(operand, firstValue, secondValue);
    displayValue = display.textContent;
    firstValue = display.textContent;
    operand = null;
  } else return;
}

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
  a = Number(a);
  b = Number(b);
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "×":
      return multiply(a, b);
    case "÷":
      return divide(a, b);
  }
}
