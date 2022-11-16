let firstValue = "";
let secondValue = "";
let currentOperand = null;
let clearDisplay = false;

const numberButtons = document.querySelectorAll(".numbers");
const operatorButtons = document.querySelectorAll(".operator");
const equalsButton = document.querySelector("#equals");
const display = document.querySelector(".number-display");
const operationsDisplay = document.querySelector(".operation-display");
const allClearButton = document.querySelector("#clear-all");
const dotButton = document.querySelector("#dot");
const backButton = document.querySelector("#clear-last");
const plusMinusButton = document.querySelector("#plusMinus");
const keys = document.querySelectorAll(".buttons");

// Event listeners for number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    appendNumber(button["value"]);
  });
});

// Event listeners for operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    operatorSelected(button["value"]);
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

// Event listener for plusMinus button
plusMinusButton.addEventListener("click", plusMinus);

// Keyboard event listener
window.addEventListener(
  "keydown",
  (e) => {
    KeyboardInput(e.key);
    e.preventDefault();
  },
  false
);

// takes input from keyboard
function KeyboardInput(key) {
  if (key >= 0 || key <= 9) {
    appendNumber(key);
    keyPress(key);
  }
  if (key === "Backspace") {
    backSpace();
    keyPress("c");
  }
  if (key === "Delete" || key === "Escape") {
    allClear();
    keyPress("ac");
  }
  if (key === ".") {
    appendDot();
    keyPress(".");
  }
  if (key === "Enter" || key === "=") {
    equals();
    keyPress("=");
  }
  if (key === "+") {
    operatorSelected("+");
    keyPress("+");
  }
  if (key === "-") {
    operatorSelected("-");
    keyPress("-");
  }
  if (key === "/") {
    operatorSelected("÷");
    keyPress("÷");
  }
  if (key === "*") {
    operatorSelected("×");
    keyPress("×");
  }
  if (key === "p") {
    operatorSelected("^");
    keyPress("^");
  }
  if (key === "o") {
    plusMinus();
    keyPress("o");
  }
}

keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
});

function removeTransition(e) {
  if (e.propertyName != "transform") return; // skip if not a transform
  this.classList.remove("buttonPress");
  this.classList.remove("clear-all-key");
  this.classList.remove("clear-last-key");
}

// adds effects to the onscreen buttons when the appropriate key is pressed
function keyPress(key) {
  if (key === "ac") {
    const keyPressed = document.querySelector(`.buttons[value="${key}"]`);
    keyPressed.classList.add("clear-all-key");
  }
  if (key === "c") {
    const keyPressed = document.querySelector(`.buttons[value="${key}"]`);
    keyPressed.classList.add("clear-last-key");
  }
  if (key === "p") {
    const keyPressed = document.querySelector(`.buttons[value="${key}"]`);
    keyPressed.classList.add("clear-last-key");
  } else {
    const keyPressed = document.querySelector(`.buttons[value="${key}"]`);
    keyPressed.classList.add("buttonPress");
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
  operationsDisplay.textContent = "";
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
  operationsDisplay.textContent = `${firstValue} ${currentOperand}`;
  clearDisplay = true;
}

// takes the two values and sends them to operate to calculate the new value
function equals() {
  secondValue = display.textContent;
  if (currentOperand === null || operationsDisplay.textContent.includes("=")) {
    return; // stops function
  } else if (currentOperand === "÷" && secondValue === "0") {
    display.textContent = "0";
    alert("Please don't divide by Zero!");
    currentOperand = null;
    clearDisplay = true;
  } else {
    display.textContent = operate(currentOperand, firstValue, secondValue);
    operationsDisplay.textContent = `${firstValue} ${currentOperand} ${secondValue} =`;
    currentOperand = null;
    clearDisplay = true;
  }
}

// changes display value to a negative or positive number
function plusMinus() {
  let displayNumber = Number(display.textContent);
  if (displayNumber > 0) display.textContent = `${displayNumber * -1}`;
  else display.textContent = `${displayNumber * -1}`;
}

// removes the latest entry on the display
function backSpace() {
  if (display.textContent === "0") return; // stops function
  else if (display.textContent.length === 1) {
    display.textContent = "0";
  } else if (operationsDisplay.textContent.includes("=")) {
    display.textContent = "0";
  } else display.textContent = display.textContent.slice(0, -1);
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

function power(a, b) {
  return Math.pow(a, b);
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
    case "^":
      return power(a, b);
  }
}
