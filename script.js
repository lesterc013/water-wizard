const addButton = document.getElementById("add");
const subtractButton = document.getElementById("subtract");
const cupsDrankElement = document.getElementById("cupsDrank");
const cupsLeftElement = document.getElementById("cupsLeft");
const cupImagesDiv = document.getElementById("cupImages");
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
    // set default value for cupsLeft element
    cupsLeftElement.innerHTML = `Bibbity Boppity, you have ${idealCups} cups left to drinkity! Keepity Uppity!`;
    // set default value for cupsDrank element
    cupsDrankElement.innerHTML = counter;
    displayCupImages();
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
      // value for cupsLeft
      displayCupsLeft();
      // value for cupsDrank
      cupsDrankElement.innerHTML = counter;
      // display initial cupImages
      displayCupImages();
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
  displayCupImages();
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
    displayCupImages();
  }
}

function displayCupsLeft() {
  // if user still hasnt reached idealCups i.e. 8, display this message
  if (counter < idealCups) {
    cupsLeftElement.innerHTML = `Bibbity Boppity, you have ${
      idealCups - counter
    } cups left to drinkity! Keepity Uppity!`;
  } else {
    cupsLeftElement.innerHTML = `Yippee Yahooity, you are hydratedty! Well Doneity and Keepity Uppity!`;
  }
}

function displayCupImages() {
  let images = "";
  // append the normal water wizard first
  for (let i = 0; i < counter && i <= 7; i++) {
    images += '<img src="images/icon-48.png" alt="water-wizard">';
  }
  // append the dead water wizard
  let numDead = idealCups - counter;
  for (let j = 0; j < numDead; j++) {
    images +=
      '<img src="images/dead-water-wizard-48.png" alt="dead water-wizard">';
  }
  cupImagesDiv.innerHTML = images;
}
