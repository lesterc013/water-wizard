// on chrome startup, create an alarm
chrome.runtime.onStartup.addListener(function () {
  // const now = new Date();
  // const clearDate = new Date(now);
  // // set clearDate to be one day after now
  // clearDate.setDate(now.getDate() + 1);
  // // set clearDate time to be 0000
  // clearDate.setHours(0, 0, 0, 0);
  // // milliseconds from now to clearDate
  // const timeToClear = clearDate - now;

  // for testing sake, timeToClear will be 60000ms or 1min
  const timeToClear = 30000;

  // clear any previous alarms
  chrome.alarms.clearAll();

  alarmInfo = {
    when: Date.now() + timeToClear,
  };
  chrome.alarms.create("clearStorageAlarm", alarmInfo);
  console.log("Alarm created");
  console.log("Time to clear ", timeToClear);
});

// function to clear the storage
function clearStorage() {
  chrome.storage.local.clear(function () {});
  console.log("Storage cleared at 0000");
}

// create alarm listener
chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("Alarm fired", alarm);
  if (alarm.name === "clearStorageAlarm") {
    // clear storage
    clearStorage();
    // set another alarm
    // for testing sake, timeToClear will be 60000ms or 1min
    const timeToClear = 30000;

    // clear any previous alarms
    chrome.alarms.clearAll();

    alarmInfo = {
      when: Date.now() + timeToClear,
    };
    chrome.alarms.create("clearStorageAlarm", alarmInfo);
    console.log("Alarm created");
    console.log("Time to clear ", timeToClear);
  }
});
