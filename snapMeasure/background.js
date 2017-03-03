let isRunning = false;

chrome.browserAction.onClicked.addListener(function (tab) {
  if (!isRunning) {
    chrome.tabs.executeScript(tab.id, {file: 'inpage.js'});
    isRunning = true;
  }
});