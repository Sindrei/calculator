let firstValue = "";
let secondValue = "";
let currentOperand = null;
let clearDisplay = false;

const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const display = document.querySelector(".number-display");
const allClearButton = document.querySelector("#clear-all");
const dotButton = document.querySelector("#dot");
const backButton = document.querySelector("#clear-last");

// Event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button.textContent);
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operatorSelected(button.textContent);
  });
});

// Event listener for equal sign
equalsButton.addEventListener("click", equals);

// Event listener for all clear
allClearButton.addEventListener("click", allClear);

// Event listener for dot button
dotButton.addEventListener("click", appendDot);

// Event listener for backspace button
backButton.addEventListener("click", backSpace);

// Keyboard event listener
window.addEventListener("keydown", (e) => {
  KeyboardInput(e.key);
});

// takes input from keyboard
function KeyboardInput(key) {
  if (key >= 0 || key <= 9) {
    appendNumber(key);
  }
  if (key === "Backspace") {
    backSpace();
  }
  if (key === "Delete") {
    allClear();
  }
  if (key === ".") {
    appendDot();
  }
  if (key === "Enter" || key === "=") {
    equals();
  }
  if (key === "+") {
    operatorSelected("+");
  }
  if (key === "-") {
    operatorSelected("-");
  }
  if (key === "/") {
    operatorSelected("÷");
  }
  if (key === "*") {
    operatorSelected("×");
  }
}

// Operator button press
function operatorSelected(operator) {
  if (currentOperand != null) {
    equals();
    setOperation(operator);
  } else setOperation(operator);
}

// Clears all information from the calculator
function allClear() {
  display.textContent = "0";
  firstValue = "";
  secondValue = "";
  clearDisplay = false;
}

// adds a point for decimal numbers
function appendDot() {
  if (display.textContent.includes(".") === false) {
    display.textContent += ".";
  }
  if (clearDisplay === true) {
    display.textContent = "0.";
    clearDisplay = false;
  }
}

// Appends numbers to the calculator display
function appendNumber(appendValue) {
  if (display.textContent === "0" || clearDisplay === true) {
    display.textContent = appendValue;
    clearDisplay = false;
  } else {
    display.textContent += appendValue;
  }
}

// Sets the current operation when an operator (+, -, ÷, ×) is pressed
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

// removes the latest entry on the display
function backSpace() {
  display.textContent = display.textContent.slice(
    0,
    display.textContent.length - 1
  );
}

// Rounds decimal numbers so they do not overflow the screen
function round(value, decimals = 8) {
  return Number(Math.round(value + "e" + decimals) + "e-" + decimals);
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
  return round(a / b);
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
