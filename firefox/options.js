document.getElementById('labelGi').textContent = browser.i18n.getMessage("labelGi");
document.getElementById('labelHsr').textContent = browser.i18n.getMessage("labelHsr");
document.getElementById('reset').textContent = browser.i18n.getMessage("reset");
document.getElementById('buttonColort').textContent = browser.i18n.getMessage("buttonColort");
document.getElementById('buttonTextColort').textContent = browser.i18n.getMessage("buttonTextColort");
document.getElementById('labelSnow').textContent = browser.i18n.getMessage("labelSnow");
document.getElementById('buttonColor').addEventListener('input', function() {
  var buttonColor = document.getElementById('buttonColor').value;
  browser.storage.local.set({
    buttonColor: buttonColor
  }, function() {
    updateButtonColors(buttonColor, null);
  });
});

document.getElementById('buttonTextColor').addEventListener('input', function() {
  var buttonTextColor = document.getElementById('buttonTextColor').value;
  browser.storage.local.set({
    buttonTextColor: buttonTextColor
  }, function() {
    updateButtonColors(null, buttonTextColor);
  });
});

document.getElementById('onlyHsr').addEventListener('change', function() {
  var onlyHsr = document.getElementById('onlyHsr').checked;
  browser.storage.local.set({
    onlyHsr: onlyHsr
  });
});

document.getElementById('snowEnable').addEventListener('change', function() {
  var snowEnable = document.getElementById('snowEnable').checked;
  browser.storage.local.set({
    snowEnable: snowEnable
  });
});

document.getElementById('onlyGi').addEventListener('change', function() {
  var onlyGi = document.getElementById('onlyGi').checked;
  browser.storage.local.set({
    onlyGi: onlyGi
  });
});

document.getElementById('reset').addEventListener('click', function() {
  var defaultButtonColor = '#9a609a';
  var defaultButtonTextColor = '#ffffff';
  var defaultOnlyHsr = false;
  var defaultOnlyGi = false;
  var defaultSnowEnable = true;
  document.getElementById('buttonColor').value = defaultButtonColor;
  document.getElementById('buttonTextColor').value = defaultButtonTextColor;
  document.getElementById('onlyHsr').checked = defaultOnlyHsr;
  document.getElementById('onlyGi').checked = defaultOnlyGi;
  document.getElementById('snowEnable').checked = defaultSnowEnable;
  browser.storage.local.set({
    buttonColor: defaultButtonColor,
    buttonTextColor: defaultButtonTextColor,
    onlyHsr: defaultOnlyHsr,
    onlyGi: defaultOnlyGi,
    snowEnable: defaultSnowEnable
  }, function() {
    updateButtonColors(defaultButtonColor, defaultButtonTextColor);
  });
});

function updateButtonColors(buttonColor, buttonTextColor) {
  var buttons = document.getElementsByTagName('button');
  for (var i = 0; i < buttons.length; i++) {
    if (buttonColor) {
      buttons[i].style.backgroundColor = buttonColor;
    }
    if (buttonTextColor) {
      buttons[i].style.color = buttonTextColor;
    }
  }
}

browser.storage.local.get(['buttonColor', 'buttonTextColor', 'onlyHsr', 'onlyGi', 'snowEnable'], function(result) {
  var buttonColor = result.buttonColor ? result.buttonColor : '#9a609a';
  var buttonTextColor = result.buttonTextColor ? result.buttonTextColor : '#ffffff';
  var onlyHsr = result.onlyHsr ? result.onlyHsr : false;
  var onlyGi = result.onlyGi ? result.onlyGi : false;
  var snowEnable = result.snowEnable ? result.snowEnable : false;
  document.getElementById('buttonColor').value = buttonColor;
  document.getElementById('buttonTextColor').value = buttonTextColor;
  document.getElementById('onlyHsr').checked = onlyHsr;
  document.getElementById('onlyGi').checked = onlyGi;
  document.getElementById('snowEnable').checked = snowEnable;
  updateButtonColors(buttonColor, buttonTextColor);
});