const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const cupsDrankElement = document.getElementById("cupsDrank");

let counter = 0;
// set default value for counter element
cupsDrankElement.innerHTML = counter;

// add 1 to the counter element
addButton.onclick = function () {
  counter += 1;
  cupsDrankElement.innerHTML = counter;
};

// subtract 1 to the counter element
subtractButton.onclick = function () {
  if (counter > 0) {
    counter -= 1;
    cupsDrankElement.innerHTML = counter;
  }
};
