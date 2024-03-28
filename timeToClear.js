// on chrome startup, create an alarm
chrome.runtime.onStartup.addListener(function () {
  if (checkPastMidnight()) {
    console.log("Past midnight");
    checkIfStoredDataFromPreviousDay(function (lessThanMidnightOfToday) {
      if (lessThanMidnightOfToday) {
        console.log("Past midnight and data was from previous day");
        clearStorage();
        const timeToClear = setTimeToClear();
        createAlarm(timeToClear);
      } else {
        console.log("Past midnight but data from current day");
        const timeToClear = setTimeToClear();
        createAlarm(timeToClear);
      }
    });
  } else {
    console.log("Not past midnight");
    const timeToClear = setTimeToClear();
    createAlarm(timeToClear);
  }
});

// create alarm listener
chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("Alarm fired", alarm);
  if (alarm.name === "clearStorageAlarm") {
    // clear storage
    clearStorage();
    // set another alarm
    const timeToClear = setTimeToClear();
    createAlarm(timeToClear);
  }
});

function setTimeToClear() {
  const now = new Date();
  const clearDate = new Date(now);
  // set clearDate to be one day after now
  clearDate.setDate(now.getDate() + 1);
  // set clearDate time to be 0000
  clearDate.setHours(0, 0, 0, 0);
  // milliseconds from now to clearDate
  const timeToClear = clearDate - now;
  return timeToClear;
}

function createAlarm(timeToClear) {
  // clear all other alarms first
  chrome.alarms.clearAll();
  // create the alarm
  alarmInfo = {
    when: Date.now() + timeToClear,
  };
  chrome.alarms.create("clearStorageAlarm", alarmInfo);
  console.log("Alarm created");
  console.log("Time to clear ", timeToClear);
}

// function to clear the storage
function clearStorage() {
  chrome.storage.local.clear(function () {});
  console.log("Storage cleared");
}

// function to checkIfPastMidnight
function checkPastMidnight() {
  const now = new Date();
  console.log("now hours " + now.getHours());
  console.log("now minutes " + now.getMinutes());
  if (now.getHours() == 0 && now.getMinutes() == 0) {
    return true;
  } else return false;
}

// check if the time of the inputs are less than the 0000 of today
function checkIfStoredDataFromPreviousDay(callback) {
  // - get a variable that contains the 0000 of today
  const now = new Date();
  const midnightOfToday = Date.now(now.setHours(0, 0, 0, 0));
  console.log("midnight of today is " + midnightOfToday);
  let lessThanMidnightOfToday = false;
  // - get the timestamps of all the inputs in the storage
  chrome.storage.local.get("counterKey", function (result) {
    // get timestamp of the counterValue
    const timestamp = result.counterKey.timestamp;
    console.log("timestamp for data is " + timestamp);
    if (timestamp < midnightOfToday) {
      lessThanMidnightOfToday = true;
    }
    console.log(lessThanMidnightOfToday);
    callback(lessThanMidnightOfToday);
  });
}
