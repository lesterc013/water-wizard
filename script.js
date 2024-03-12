const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const cupsDrunkElement = document.getElementById("cupsDrunk");

let cupsDrunk = 0;
// set default value for cupsDrunk element
cupsDrunkElement.innerHTML = cupsDrunk;

// add 1 to the cupsDrunk element
addButton.onclick = function () {
  cupsDrunk += 1;
  cupsDrunkElement.innerHTML = cupsDrunk;
};

// subtract 1 to the cupsDrunk element
subtractButton.onclick = function () {
  if (cupsDrunk > 0) {
    cupsDrunk -= 1;
    cupsDrunkElement.innerHTML = cupsDrunk;
  }
};
