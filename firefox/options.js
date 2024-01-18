document.getElementById('labelGi').textContent = browser.i18n.getMessage("labelGi");
document.getElementById('labelHsr').textContent = browser.i18n.getMessage("labelHsr");
document.getElementById('labelSnow').textContent = browser.i18n.getMessage("labelSnow");
document.getElementById('labelRounding').textContent = browser.i18n.getMessage("labelRounding");
document.getElementById('labelBackgroundGi').textContent = browser.i18n.getMessage("labelBackground");
document.getElementById('labelBackgroundColorGi').textContent = browser.i18n.getMessage("labelBackgroundColor");
document.getElementById('labelBackgroundHsr').textContent = browser.i18n.getMessage("labelBackground");
document.getElementById('labelBackgroundColorHsr').textContent = browser.i18n.getMessage("labelBackgroundColor");
document.getElementById('resetpopup').textContent = browser.i18n.getMessage("reset");
document.getElementById('resetGi').textContent = browser.i18n.getMessage("reset");
document.getElementById('resetHsr').textContent = browser.i18n.getMessage("reset");
document.getElementById('labelButtonColor').textContent = browser.i18n.getMessage("labelButtonColor");
document.getElementById('labelButtonColorGi').textContent = browser.i18n.getMessage("labelButtonColor");
document.getElementById('labelButtonColorHsr').textContent = browser.i18n.getMessage("labelButtonColor");
document.getElementById('labelTextColor').textContent = browser.i18n.getMessage("labelTextColor");
document.getElementById('labelTextColorGi').textContent = browser.i18n.getMessage("labelTextColor");
document.getElementById('labelTextColorHsr').textContent = browser.i18n.getMessage("labelTextColor");
document.getElementById('labelGlobal-settings').textContent = browser.i18n.getMessage("labelGlobal");
document.getElementById('labelMainPopup-settings').textContent = browser.i18n.getMessage("labelMainPopup");
document.getElementById('labelOnlyGi-settings').textContent = browser.i18n.getMessage("labelOnlyGi");
document.getElementById('labelOnlyHsr-settings').textContent = browser.i18n.getMessage("labelOnlyHsr");
function showSettingsSection(section) {
  var sections = ['global-settings','main-popup-settings', 'onlyGi-settings', 'onlyHsr-settings'];
  sections.forEach(function (s) {
      var element = document.getElementById(s);
      if (element) {
          element.style.display = s === section ? 'block' : 'none';
      }
  });
}
document.getElementById('settingsSectionSelector').addEventListener('change', function () {
  var selectedSection = this.value;
  showSettingsSection(selectedSection);
});
document.getElementById('buttonColorMain').addEventListener('input', function() {
  var buttonColorMain = document.getElementById('buttonColorMain').value;
  browser.storage.local.set({
    buttonColorMain: buttonColorMain
  }
)});
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
document.getElementById('buttonTextColorMain').addEventListener('input', function() {
  var buttonTextColorMain = document.getElementById('buttonTextColorMain').value;
  browser.storage.local.set({
    buttonTextColorMain: buttonTextColorMain
  }
)});
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
document.getElementById('snowDisable').addEventListener('change', function() {
  var snowDisable = document.getElementById('snowDisable').checked;
  browser.storage.local.set({
    snowDisable: snowDisable
  });
});
document.getElementById('roundingDisable').addEventListener('change', function() {
  var roundingDisable = document.getElementById('roundingDisable').checked;
  browser.storage.local.set({
    roundingDisable: roundingDisable
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
  document.getElementById('buttonColorMain').value = '#9a609a';
  document.getElementById('buttonTextColorMain').value = '#ffffff';
  browser.storage.local.set({
    buttonColorMain: '#9a609a',
    buttonTextColorMain: '#ffffff',
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
  })});
document.getElementById('resetHsr').addEventListener('click', function() {
  document.getElementById('buttonColorHsr').value = '#004080';
  document.getElementById('buttonTextColorHsr').value = '#ffffff';
  document.getElementById('BackgroundColorHsr').value = '#1e274e';
  browser.storage.local.set({
    buttonColorHsr: '#004080',
    buttonTextColorHsr: '#ffffff',
    BackgroundColorHsr: '#1e274e'
  })});
browser.storage.local.get(['roundingDisable', 'snowDisable', 'BackgroundHsr', 'BackgroundColorHsr', 'BackgroundGi', 'BackgroundColorGi', 'buttonColorMain', 'buttonColorGi', 'buttonColorHsr', 'buttonTextColorMain', 'buttonTextColorGi', 'buttonTextColorHsr', 'onlyHsr', 'onlyGi'], function(result) {
  var buttonColorMain = result.buttonColorMain ? result.buttonColorMain : '#9a609a';
  var buttonColorGi = result.buttonColorGi ? result.buttonColorGi : '#a89f96';
  var buttonColorHsr = result.buttonColorHsr ? result.buttonColorHsr : '#004080';
  var buttonTextColorMain = result.buttonTextColorMain ? result.buttonTextColorMain : '#ffffff';
  var buttonTextColorGi = result.buttonTextColorGi ? result.buttonTextColorGi : '#ffffff';
  var buttonTextColorHsr = result.buttonTextColorHsr ? result.buttonTextColorHsr : '#ffffff';
  var BackgroundColorGi = result.BackgroundColorGi ? result.BackgroundColorGi: '#4e4b54';
  var BackgroundColorHsr = result.BackgroundColorHsr ? result.BackgroundColorHsr: '#1e274e';
  var onlyHsr = result.onlyHsr ? result.onlyHsr : false;
  var onlyGi = result.onlyGi ? result.onlyGi : false;
  var snowDisable = result.snowDisable ? result.snowDisable: false;
  var roundingDisable = result.roundingDisable ? result.roundingDisable: false;
  var BackgroundGi = result.BackgroundGi ? result.BackgroundGi: false;
  var BackgroundHsr = result.BackgroundHsr ? result.BackgroundHsr: false;
  document.getElementById('buttonColorMain').value = buttonColorMain;
  document.getElementById('buttonColorGi').value = buttonColorGi;
  document.getElementById('buttonColorHsr').value = buttonColorHsr;
  document.getElementById('buttonTextColorMain').value = buttonTextColorMain;
  document.getElementById('buttonTextColorGi').value = buttonTextColorGi;
  document.getElementById('buttonTextColorHsr').value = buttonTextColorHsr;
  document.getElementById('BackgroundColorGi').value = BackgroundColorGi;
  document.getElementById('BackgroundColorHsr').value = BackgroundColorHsr;
  document.getElementById('onlyHsr').checked = onlyHsr;
  document.getElementById('onlyGi').checked = onlyGi;
  document.getElementById('snowDisable').checked = snowDisable;
  document.getElementById('roundingDisable').checked = roundingDisable;
  document.getElementById('BackgroundHsr').checked = BackgroundHsr;
  document.getElementById('BackgroundGi').checked = BackgroundGi;
});
browser.storage.local.get(['roundingDisable']).then(function (result) {
  if (result.roundingDisable) {
  document.documentElement.style.setProperty('--border-radius', '10px')
  }
  else {
    document.documentElement.style.setProperty('--border-radius', '20px')
  }
});