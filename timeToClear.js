// change setTimeout to alarms so that alarms can clear the storage even when browser is closed + not be affected by service worker terminating
// create the alarm
const now = new Date();
const clearDate = new Date(now);
// set clearDate to be one day after now
clearDate.setDate(now.getDate() + 1);
// set clearDate time to be 0000
clearDate.setHours(0, 0, 0, 0);
// milliseconds from now to clearDate
const timeToClear = clearDate - now;

// clear any previous alarms
chrome.alarms.clearAll();

// create the alarm that will fire off within timeToClear
alarmInfo = {
  when: Date.now() + timeToClear,
};
chrome.alarms.create("clearStorageAlarm", alarmInfo);
console.log("Alarm created");
console.log("Time to clear ", timeToClear);

// now create the alarm listener that will listen for the alarm name from on top. once alarm fires, execute the clearStorage function
chrome.alarms.onAlarm.addListener(function (alarm) {
  console.log("Alarm fired", alarm);
  if (alarm.name === "clearStorageAlarm") {
    clearStorage();
  }
});

// function to clear the storage
function clearStorage() {
  chrome.storage.local.clear(function () {});
  console.log("Storage cleared at 0000");
}
