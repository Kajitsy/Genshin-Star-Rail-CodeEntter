if (typeof browser === "undefined") {
	browser = chrome;
}
document.getElementById('labelGi').textContent = browser.i18n.getMessage("labelGi");
document.getElementById('labelHsr').textContent = browser.i18n.getMessage("labelHsr");
document.getElementById('labelBacksettings').textContent = browser.i18n.getMessage("labelBacksettings");
document.getElementById('labelBackgroundGi').textContent = browser.i18n.getMessage("labelBackground");
document.getElementById('labelBackgroundColorGi').textContent = browser.i18n.getMessage("labelBackgroundColor");
document.getElementById('labelBackgroundHsr').textContent = browser.i18n.getMessage("labelBackground");
document.getElementById('labelBackgroundColorHsr').textContent = browser.i18n.getMessage("labelBackgroundColor");
document.getElementById('resetpopup').textContent = browser.i18n.getMessage("reset");
document.getElementById('resetGi').textContent = browser.i18n.getMessage("reset");
document.getElementById('resetHsr').textContent = browser.i18n.getMessage("reset");
document.getElementById('buttonColort').textContent = browser.i18n.getMessage("buttonColort");
document.getElementById('buttonColorGit').textContent = browser.i18n.getMessage("buttonColort");
document.getElementById('buttonColorHsrt').textContent = browser.i18n.getMessage("buttonColort");
document.getElementById('buttonTextColort').textContent = browser.i18n.getMessage("buttonTextColort");
document.getElementById('buttonTextColorGit').textContent = browser.i18n.getMessage("buttonTextColort");
document.getElementById('buttonTextColorHsrt').textContent = browser.i18n.getMessage("buttonTextColort");
document.getElementById('settingsSectionSelector').addEventListener('change', function () {
  var selectedSection = this.value;
  showSettingsSection(selectedSection);
});
function showSettingsSection(section) {
  var sections = ['current-settings', 'onlyGi-settings', 'onlyHsr-settings'];
  sections.forEach(function (s) {
      var element = document.getElementById(s);
      if (element) {
          element.style.display = s === section ? 'block' : 'none';
      }
  });
}
document.getElementById('buttonColor').addEventListener('input', function() {
  var buttonColor = document.getElementById('buttonColor').value;
  browser.storage.local.set({
    buttonColor: buttonColor
  }, function() {
    updateButtonColors(buttonColor, null);
  });
});
document.getElementById('buttonColorGi').addEventListener('input', function() {
  var buttonColorGi = document.getElementById('buttonColorGi').value;
  browser.storage.local.set({
    buttonColorGi: buttonColorGi
  });
});
document.getElementById('buttonColorHsr').addEventListener('input', function() {
  var buttonColorHsr = document.getElementById('buttonColorHsr').value;
  browser.storage.local.set({
    buttonColorHsr: buttonColorHsr
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
document.getElementById('buttonTextColorGi').addEventListener('input', function() {
  var buttonTextColorGi = document.getElementById('buttonTextColorGi').value;
  browser.storage.local.set({
    buttonTextColorGi: buttonTextColorGi
  });
});
document.getElementById('buttonTextColorHsr').addEventListener('input', function() {
  var buttonTextColorHsr = document.getElementById('buttonTextColorHsr').value;
  browser.storage.local.set({
    buttonTextColorHsr: buttonTextColorHsr
  });
});
document.getElementById('BackgroundColorGi').addEventListener('input', function() {
  var BackgroundColorGi = document.getElementById('BackgroundColorGi').value;
  browser.storage.local.set({
    BackgroundColorGi: BackgroundColorGi
  });
});
document.getElementById('BackgroundColorHsr').addEventListener('input', function() {
  var BackgroundColorHsr = document.getElementById('BackgroundColorHsr').value;
  browser.storage.local.set({
    BackgroundColorHsr: BackgroundColorHsr
  });
});
document.getElementById('onlyHsr').addEventListener('change', function() {
  var onlyHsr = document.getElementById('onlyHsr').checked;
  browser.storage.local.set({
    onlyHsr: onlyHsr
  });
});
document.getElementById('onlyGi').addEventListener('change', function() {
  var onlyGi = document.getElementById('onlyGi').checked;
  browser.storage.local.set({
    onlyGi: onlyGi
  });
});
document.getElementById('backsettings').addEventListener('change', function() {
  var backsettings = document.getElementById('backsettings').checked;
  updateBackground(backsettings);
  browser.storage.local.set({
    backsettings: backsettings
  });
});
document.getElementById('BackgroundGi').addEventListener('change', function() {
  var BackgroundGi = document.getElementById('BackgroundGi').checked;
  browser.storage.local.set({
    BackgroundGi: BackgroundGi
  });
});
document.getElementById('BackgroundHsr').addEventListener('change', function() {
  var BackgroundHsr = document.getElementById('BackgroundHsr').checked;
  browser.storage.local.set({
    BackgroundHsr: BackgroundHsr
  });
});
document.getElementById('resetpopup').addEventListener('click', function() {
  document.getElementById('buttonColor').value = '#9a609a';
  document.getElementById('buttonTextColor').value = '#ffffff';
  browser.storage.local.set({
    buttonColor: '#9a609a',
    buttonTextColor: '#ffffff',
  });
});
document.getElementById('resetGi').addEventListener('click', function() {
  document.getElementById('buttonColorGi').value = '#a89f96';
  document.getElementById('buttonTextColorGi').value = '#ffffff';
  document.getElementById('BackgroundColorGi').value = '#4e4b54';
  browser.storage.local.set({
    buttonColorGi: '#a89f96',
    buttonTextColorGi: '#ffffff',
    BackgroundColorGi: '#4e4b54'
  },
  function() {
    updateButtonColors(buttonColorGi, buttonTextColorGi);
  });
});
document.getElementById('resetHsr').addEventListener('click', function() {
  document.getElementById('buttonColorHsr').value = '#004080';
  document.getElementById('buttonTextColorHsr').value = '#ffffff';
  document.getElementById('BackgroundColorHsr').value = '#1e274e';
  browser.storage.local.set({
    buttonColorHsr: '#004080',
    buttonTextColorHsr: '#ffffff',
    BackgroundColorHsr: '#1e274e'
  },
  function() {
    updateButtonColors(buttonColorHsr, buttonTextColorHsr);
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
function updateBackground(backsettings) {
  var body = document.body;
  if (backsettings) {
    body.style.background = '#292a2d';
  } else {
    body.style.background = 'url("/pictures/backgroundOptions.png")';
    body.style.backgroundSize = 'cover';
    body.style.backgroundRepeat = 'no-repeat';
    body.style.backgroundPosition = 'center';
    body.style.overflow = 'hidden';
  }
}
browser.storage.local.get(['BackgroundHsr', 'BackgroundColorHsr', 'BackgroundGi', 'BackgroundColorGi', 'backsettings', 'buttonColor', 'buttonColorGi', 'buttonColorHsr', 'buttonTextColor', 'buttonTextColorGi', 'buttonTextColorHsr', 'onlyHsr', 'onlyGi'], function(result) {
  var buttonColor = result.buttonColor ? result.buttonColor : '#9a609a';
  var buttonColorGi = result.buttonColorGi ? result.buttonColorGi : '#a89f96';
  var buttonColorHsr = result.buttonColorHsr ? result.buttonColorHsr : '#004080';
  var buttonTextColor = result.buttonTextColor ? result.buttonTextColor : '#ffffff';
  var buttonTextColorGi = result.buttonTextColorGi ? result.buttonTextColorGi : '#ffffff';
  var buttonTextColorHsr = result.buttonTextColorHsr ? result.buttonTextColorHsr : '#ffffff';
  var BackgroundColorGi = result.BackgroundColorGi ? result.BackgroundColorGi: '#4e4b54';
  var BackgroundColorHsr = result.BackgroundColorHsr ? result.BackgroundColorHsr: '#1e274e';
  var onlyHsr = result.onlyHsr ? result.onlyHsr : false;
  var onlyGi = result.onlyGi ? result.onlyGi : false;
  var BackgroundGi = result.BackgroundGi ? result.BackgroundGi: false;
  var BackgroundHsr = result.BackgroundHsr ? result.BackgroundHsr: false;
  var backsettings = result.backsettings ? result.backsettings : false;
  document.getElementById('buttonColor').value = buttonColor;
  document.getElementById('buttonColorGi').value = buttonColorGi;
  document.getElementById('buttonColorHsr').value = buttonColorHsr;
  document.getElementById('buttonTextColor').value = buttonTextColor;
  document.getElementById('buttonTextColorGi').value = buttonTextColorGi;
  document.getElementById('buttonTextColorHsr').value = buttonTextColorHsr;
  document.getElementById('BackgroundColorGi').value = BackgroundColorGi;
  document.getElementById('BackgroundColorHsr').value = BackgroundColorHsr;
  document.getElementById('onlyHsr').checked = onlyHsr;
  document.getElementById('onlyGi').checked = onlyGi;
  document.getElementById('BackgroundGi').checked = BackgroundGi;
  document.getElementById('BackgroundHsr').checked = BackgroundHsr;
  document.getElementById('backsettings').checked = backsettings;
  updateBackground(backsettings, BackgroundColorGi, BackgroundColorHsr);
  updateButtonColors(buttonColor, buttonTextColor, buttonColorGi, buttonTextColorGi, buttonColorHsr, buttonTextColorHsr);
});