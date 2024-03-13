// background script that sets the time to clear the local storage with respect to 0000 of the next day

scheduleClear();

// function to clear the storage
function clearStorage() {
  chrome.storage.local.clear(function () {});

  // after clearing, call scheduleClear to ensure continuity
  scheduleClear();
}

// function to schedule the clearStorage function
function scheduleClear() {
  // the date now
  const now = new Date();

  // clear the storage at 0000 of the next day from now
  const clearDate = new Date(now);
  // set clearDate to be one day after now
  clearDate.setDate(now.getDate() + 1);
  // set clearDate time to be 0000
  clearDate.setHours(0, 0, 0, 0);
  // milliseconds from now to clearDate
  const timeToClear = clearDate - now;
  // set the time to clear the storage
  setTimeout(clearStorage, timeToClear);
}
