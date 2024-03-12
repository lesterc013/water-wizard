const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const cupsDrankElement = document.getElementById("cupsDrank");
const cupsLeftElement = document.getElementById("cupsLeft");
const idealCups = 8;

let counter = 0;
// set default value for cupsDrank element
cupsDrankElement.innerHTML = counter;
// set default value for cupsLeft element
cupsLeftElement.innerHTML = `You have ${idealCups} cups left to go!`;

addButton.onclick = function () {
  // add 1 to the counter. then update cupsDrankElement
  counter += 1;
  cupsDrankElement.innerHTML = counter;
  // if user still hasnt reached idealCups i.e. 8, display this message
  if (counter < idealCups) {
    cupsLeftElement.innerHTML = `You have ${
      idealCups - counter
    } cups left to go!`;
  } else {
    cupsLeftElement.innerHTML = `You have finished your hydration regime!`;
  }
};

subtractButton.onclick = function () {
  // subtract 1 to the counter. then update cupsDrankElement. only allow subtraction if counter > 0 i.e. no negatives
  if (counter > 0) {
    counter -= 1;
    cupsDrankElement.innerHTML = counter;
    if (counter < idealCups) {
      cupsLeftElement.innerHTML = `You have ${
        idealCups - counter
      } cups left to go!`;
    } else {
      cupsLeftElement.innerHTML = `You have finished your hydration regime!`;
    }
  }
};
