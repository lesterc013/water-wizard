# WATER WIZARD CHROME EXTENSION V1.2

#### Video Demo: https://youtu.be/LNEMt_yPWiA (TO BE UPDATED)

## V1.2 Update Notes:

- Removed usage of service worker (timeToClear.js) to handle clearing of storage due to its inconsistency and inefficiency
- Clearing of storage directly handled in script.js and is explained below

## Introduction

Chrome extension built with Javascript, HTML and CSS along with utilising chrome APIs (storage and alarms) to help track your water intake throughout the day

### Quick Overview of Features

- Use the dead wizard and water wizard buttons to log the number of cups of water you have drunk accordingly
- The images will change according to the number of cups of water drunk; number of water wizards are only limited to 8 and the number cannot go below 0
- The text above the images will change (from 0 to 7 when the counter is between these two numbers), and a congratulatory message after at 8 and above
- The previous day's log will be cleared when the user clicks the extension during a new day - time is based on machine's system time

### Explanation of script.js

This is the main script that handles the display of the text and images, storing of the user's cup counts and time of input in chrome.storage.local api, and all around functionalities of the interactive elements of the extension.

- script.js first checks if there is data stored in the chrome storage api. If there is none, it will initialise the initial values of counter and timestamp into the counterKey object. Then it will display the required cup images and provide the add and subtract button functionalities
- Else if there had been data stored, <b>UPDATED: compare data timestamp to the current day's midnight.
  - If timestamp < current midnight i.e. data from previous day, storage will be cleared. counter will be set to 0 and a new log will be created
  - Else, no need to take any action as the counter and timestamp values are still valid i.e. user's log is still within the current day window</b>
- then, carry on to display the required information in the html elements

<b>REMOVED</b><s>### Explanation of timeToClear.js

This file is the service worker or background script that handles the clearing of the user's data when the time is 0000. It essentially manages the clearing of the chrome storage and then scheduling the next clearance using the chrome alarms api

- A listener is activated everytime chrome starts up.
- This if condition will help to clear the user's storage that if the user had previous inputs, closed chrome completely, and then reopened chrome past 0000
- This is required because the alarms api will not work when the browser is completely closed
- Otherwise, this script will create an alarm for the upcoming 0000
- Next, a listener is created for when the alarm is triggered
- When it does, the callback function is run that will clear the storage and set the next alarm for the next clearance; repeating the process</s>

### popup.html

The html is quite basic in my opinion; most of the "design" really comes from manipulating the html elements

### styles.css

Most of the styling was focused on ensuring the optimal amount of spaces between the elements. There was some focus on the styling of the buttons where a suitable adaptation was found online

### manifest.json

Standard manifest file required by chrome for extensions. Using manifest v3
<b>REMOVED service worker and permission for alarm</b>
