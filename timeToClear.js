// on chrome startup, create an alarm
chrome.runtime.onStartup.addListener(function () {
  const timeToClear = setTimeToClear();
  // create alarm
  createAlarm(timeToClear);
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
  console.log("Storage cleared at 0000");
}
