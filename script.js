console.log(
  "This is v1.2 - removed service worker usage and put all clearing logic in main script"
);
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
    setCounterAndTimestamp();
    cupsLeftElement.innerHTML = `Bibbity Boppity, drink ${idealCups} more cups of water to save the wizards! Keepity Uppity!`;
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
      console.log(
        "Value is " +
          result.counterKey.counter +
          " timestamp is " +
          result.counterKey.timestamp
      );
      counter = result.counterKey.counter;
      timestamp = result.counterKey.timestamp;
      if (checkIfStoredDataFromPreviousDay(timestamp)) {
        clearStorage();
        // reset counter value to be 0
        counter = 0;
        setCounterAndTimestamp();
      }
      // else if data was from today, dont need to do anything
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
  setCounterAndTimestamp();
  displayCupsLeft();
  displayCupImages();
}

function subtractButtonClick() {
  // subtract 1 to the counter. then update cupsDrankElement. only allow subtraction if counter > 0 i.e. no negatives
  if (counter > 0) {
    counter -= 1;
    cupsDrankElement.innerHTML = counter;
    setCounterAndTimestamp();
    displayCupsLeft();
    displayCupImages();
  }
}

function displayCupsLeft() {
  // if user still hasnt reached idealCups i.e. 8, display this message
  if (counter < idealCups) {
    cupsLeftElement.innerHTML = `Bibbity Boppity, drink ${
      idealCups - counter
    } more cups of water to save the wizards! Keepity Uppity!`;
  } else {
    cupsLeftElement.innerHTML = `Yippee Yahooity, all wizards saved and you are hydratedty! Well Doneity!`;
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

function setCounterAndTimestamp() {
  // counter is global
  // timestamp need to make
  const timestamp = Date.now();
  chrome.storage.local.set({ counterKey: { counter, timestamp } }, function () {
    console.log(
      "counterKey value set to " + counter + " timestamp value at " + timestamp
    );
  });
}

// check if the time of the inputs are less than the 0000 of today
function checkIfStoredDataFromPreviousDay(currentTimestamp) {
  // - get a variable that contains the 0000 of today
  const now = new Date();
  const midnightOfToday = now.setHours(0, 0, 0, 0);
  console.log("midnight of today is " + midnightOfToday);
  let lessThanMidnightOfToday = false;
  if (currentTimestamp < midnightOfToday) {
    lessThanMidnightOfToday = true;
  }
  console.log(
    "Data stored before midnight of today?" + lessThanMidnightOfToday
  );
  return lessThanMidnightOfToday;
}

// function to clear the storage
function clearStorage() {
  chrome.storage.local.clear(function () {});
  console.log("Storage cleared");
}
