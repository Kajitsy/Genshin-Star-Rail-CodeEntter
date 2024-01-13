if (typeof browser === "undefined") {
	browser = chrome;
}
document.getElementById('labelGi').textContent = browser.i18n.getMessage("labelGi");
document.getElementById('labelHsr').textContent = browser.i18n.getMessage("labelHsr");
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
// function toggleBackgroundColorHsr(BackgroundHsr) {
//   if (BackgroundHsr) {
//     labelBackgroundColorHsr.style.display = 'block';
//     BackgroundColorHsr.style.display = 'block';
//   } else {
//     labelBackgroundColorHsr.style.display = 'none';
//     BackgroundColorHsr.style.display = 'none';
//   }
// }
// function toggleBackgroundColorGi(BackgroundGi) {
//   if (BackgroundGi) {
//     labelBackgroundColorGi.style.display = 'block';
//     BackgroundColorGi.style.display = 'block';
//   } else {
//     labelBackgroundColorGi.style.display = 'none';
//     BackgroundColorGi.style.display = 'none';
//   }
// }
// function updateButtonColors(buttonColor, buttonTextColor) {
//   var buttons = document.getElementsByTagName('button');
//   for (var i = 0; i < buttons.length; i++) {
//     if (buttonColor) {
//       buttons[i].style.backgroundColor = buttonColor;
//     }
//     if (buttonTextColor) {
//       buttons[i].style.color = buttonTextColor;
//     }
//   }
// }
function showSettingsSection(section) {
  var sections = ['global-settings','main-popup-settings', 'onlyGi-settings', 'onlyHsr-settings'];
  sections.forEach(function (s) {
      var element = document.getElementById(s);
      if (element) {
          element.style.display = s === section ? 'block' : 'none';
      }
  });
}
function updateDcWorkIconColor() {
  if (dcwork = true) {
    dcWorkIcon.style.backgroundColor = 'green';
  } else if (dcwork = false) {
    dcWorkIcon.style.backgroundColor = 'red';
  } else {
    dcWorkIcon.style.backgroundColor = 'yellow';
  }
}
function updateIconColorOnChange() {
  browser.storage.local.get('dcwork', function(result) {
    dcwork = result.dcwork;
    updateDcWorkIconColor();
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
document.getElementById('BackgroundGi').addEventListener('change', function() {
  var BackgroundGi = document.getElementById('BackgroundGi').checked;
  // toggleBackgroundColorGi(BackgroundGi);
  browser.storage.local.set({
    BackgroundGi: BackgroundGi
  });
});
document.getElementById('BackgroundHsr').addEventListener('change', function() {
  var BackgroundHsr = document.getElementById('BackgroundHsr').checked;
  // toggleBackgroundColorHsr(BackgroundHsr);
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
dcWorkIcon.style.border = '2px solid #000';
document.body.appendChild(dcWorkIcon);

browser.storage.local.get(['BackgroundHsr', 'BackgroundColorHsr', 'BackgroundGi', 'BackgroundColorGi', 'buttonColorMain', 'buttonColorGi', 'buttonColorHsr', 'buttonTextColorMain', 'buttonTextColorGi', 'buttonTextColorHsr', 'onlyHsr', 'onlyGi'], function(result) {
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
  document.getElementById('BackgroundGi').checked = BackgroundGi;
  document.getElementById('BackgroundHsr').checked = BackgroundHsr;
});
browser.storage.onChanged.addListener(function(changes, areaName) {
  if (areaName === 'local' && 'dcwork' in changes) {
    dcwork = changes.dcwork.newValue;
    updateDcWorkIconColor();
  }
});
updateIconColorOnChange();
// toggleBackgroundColorHsr();
// toggleBackgroundColorGi();