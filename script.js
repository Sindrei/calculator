let displayValue = "";
const buttons = document.querySelectorAll(".numbers");
const display = document.querySelector(".number-display");

// Event listeners for number buttons
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    displayValue += button["value"];
    display.textContent = displayValue;
  });
});

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
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      break;
  }
}
