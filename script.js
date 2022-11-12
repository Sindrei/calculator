let firstValue = "";
let secondValue = "";
let currentOperand = null;
let clearDisplay = false;

const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const display = document.querySelector(".number-display");
const allClear = document.querySelector("#clear-all");

// Event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentOperand != null) {
      equals();
      setOperation(button.textContent);
    } else setOperation(button.textContent);
  });
});

// Event listener for equal sign
equalsButton.addEventListener("click", equals);

// Event listener for all clear
allClear.addEventListener("click", () => {
  display.textContent = "0";
  firstValue = "";
  secondValue = "";
  clearDisplay = false;
});

function appendNumber(appendValue) {
  if (display.textContent === "0" || clearDisplay === true) {
    display.textContent = appendValue;
    clearDisplay = false;
  } else {
    display.textContent += appendValue;
  }
}

function setOperation(operator) {
  currentOperand = operator;
  firstValue = display.textContent;
  clearDisplay = true;
}

function equals() {
  secondValue = display.textContent;
  if (currentOperand === "÷" && secondValue === "0") {
    display.textContent = "0";
    alert("Please don't divide by Zero!");
    currentOperand = null;
    clearDisplay = true;
  } else {
    display.textContent = operate(currentOperand, firstValue, secondValue);
    currentOperand = null;
    clearDisplay = true;
  }
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
