chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'local' && 'onlyGi' in changes) {
    if (changes.onlyGi.newValue) {
      chrome.action.setPopup({
        popup: 'onlyGi.html'
      });
    } else {
      chrome.action.setPopup({
        popup: 'popup.html'
      });
    }
  }
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'local' && 'onlyHsr' in changes) {
    if (changes.onlyHsr.newValue) {
      chrome.action.setPopup({
        popup: 'onlyHsr.html'
      });
    } else {
      chrome.action.setPopup({
        popup: 'popup.html'
      });
    }
  }
});

chrome.storage.local.get('onlyGi', function(result) {
  if (result.onlyGi) {
    chrome.action.setPopup({
      popup: 'onlyGi.html'
    });
  } else {
    chrome.action.setPopup({
      popup: 'popup.html'
    });
  }
});

chrome.storage.local.get('onlyHsr', function(result) {
  if (result.onlyHsr) {
    chrome.action.setPopup({
      popup: 'onlyHsr.html'
    });
  } else {
    chrome.action.setPopup({
      popup: 'popup.html'
    });
  }
});