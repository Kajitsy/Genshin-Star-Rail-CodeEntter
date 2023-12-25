browser.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'local' && 'onlyGi' in changes) {
    if (changes.onlyGi.newValue) {
      browser.browserAction.setPopup({
        popup: 'onlyGi.html'
      });
    } else {
      browser.browserAction.setPopup({
        popup: 'popup.html'
      });
    }
  }
});

browser.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'local' && 'onlyHsr' in changes) {
    if (changes.onlyHsr.newValue) {
      browser.browserAction.setPopup({
        popup: 'onlyHsr.html'
      });
    } else {
      browser.browserAction.setPopup({
        popup: 'popup.html'
      });
    }
  }
});

browser.storage.local.get('onlyGi', function(result) {
  if (result.onlyGi) {
    browser.browserAction.setPopup({
      popup: 'onlyGi.html'
    });
  } else {
    browser.browserAction.setPopup({
      popup: 'popup.html'
    });
  }
});

browser.storage.local.get('onlyHsr', function(result) {
  if (result.onlyHsr) {
    browser.browserAction.setPopup({
      popup: 'onlyHsr.html'
    });
  } else {
    browser.browserAction.setPopup({
      popup: 'popup.html'
    });
  }
});
