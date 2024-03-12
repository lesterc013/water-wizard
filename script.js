const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const counterElement = document.getElementById("counter");

let counter = 0;
// set default value for counter element
counterElement.innerHTML = counter;

// add 1 to the counter element
addButton.onclick = function () {
  counter += 1;
  counterElement.innerHTML = counter;
};

// subtract 1 to the counter element
subtractButton.onclick = function () {
  if (counter > 0) {
    counter -= 1;
    counterElement.innerHTML = counter;
  }
};
