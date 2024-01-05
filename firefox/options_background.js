async function updatePopup() {
  const resultGi = await browser.storage.local.get('onlyGi');
  const resultHsr = await browser.storage.local.get('onlyHsr');

  if (resultGi.onlyGi) {
    browser.browserAction.setPopup({
      popup: 'onlyGi.html'
    });
  } else if (resultHsr.onlyHsr) {
    browser.browserAction.setPopup({
      popup: 'onlyHsr.html'
    });
  } else {
    browser.browserAction.setPopup({
      popup: 'popup.html'
    });
  }
}

browser.storage.onChanged.addListener(async function(changes, areaName) {
  if (areaName === 'local' && ('onlyGi' in changes || 'onlyHsr' in changes)) {
    await updatePopup();
  }
});

updatePopup();