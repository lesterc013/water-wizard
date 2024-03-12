const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const cupsDrankElement = document.getElementById("cupsDrank");
const cupsLeftElement = document.getElementById("cupsLeft");
const idealCups = 8;

// default value of counter - declared gloablly to allow access
let counter = 0;

// persisting user data in local storage. also serves as logic on how to display default html
chrome.storage.local.get("counterKey", function (result) {
  // callback function essentially tells me if counter was logged already or not
  // if user has not logged in before:
  if (result["counterKey"] === undefined) {
    console.log("User first time");
    // set the counterKey to the default value of counter i.e. 0
    chrome.storage.local.set({ counterKey: counter }, function () {
      console.log("counterKey value set to " + counter);
    });
    // set default value for cupsDrank element
    cupsDrankElement.innerHTML = counter;
    // set default value for cupsLeft element
    cupsLeftElement.innerHTML = `Bibbity Boppity, you have ${idealCups} cups left to drinkity! Keepity Uppity!`;

    // add and subtract buttons functionalities
    addButton.onclick = addButtonClick;
    subtractButton.onclick = subtractButtonClick;
  }
  // user has some logs
  else {
    console.log("User has data stored");
    chrome.storage.local.get("counterKey", function (result) {
      console.log("Value is " + result.counterKey);
      // update the value of counter to what was stored
      counter = result.counterKey;
      // value for cupsDrank
      cupsDrankElement.innerHTML = counter;
      // value for cupsLeft
      displayCupsLeft();

      // add and subtract buttons functionalities
      addButton.onclick = addButtonClick;
      subtractButton.onclick = subtractButtonClick;
    });
  }
});

function addButtonClick() {
  // add 1 to the counter. then update cupsDrankElement
  counter += 1;
  cupsDrankElement.innerHTML = counter;
  // update the value of storage with current counter value
  chrome.storage.local.set({ counterKey: counter }, function () {
    console.log("counterKey value set to " + counter);
  });
  displayCupsLeft();
}

function subtractButtonClick() {
  // subtract 1 to the counter. then update cupsDrankElement. only allow subtraction if counter > 0 i.e. no negatives
  if (counter > 0) {
    counter -= 1;
    cupsDrankElement.innerHTML = counter;
    // update the value of storage with current counter value
    chrome.storage.local.set({ counterKey: counter }, function () {
      console.log("counterKey value set to " + counter);
    });
    displayCupsLeft();
  }
}

function displayCupsLeft() {
  // if user still hasnt reached idealCups i.e. 8, display this message
  if (counter < idealCups) {
    cupsLeftElement.innerHTML = `Bibbity Boppity, you have ${
      idealCups - counter
    } cups left to drinkity! Keepity Uppity!`;
  } else {
    cupsLeftElement.innerHTML = `Yippee Yahooity, you are sufficiently hydratedty! Well Doneity and Keepity Uppity!`;
  }
}
