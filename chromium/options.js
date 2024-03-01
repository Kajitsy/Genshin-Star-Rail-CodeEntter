if (typeof browser === "undefined") {
	browser = chrome;
}
const labels = {
  'labelGi': 'labelGi',
  'labelHsr': 'labelHsr',
  'labelIcon': 'labelIcon',
  'labelRounding': 'labelRounding',
  'labelBackgroundGi': 'labelBackground',
  'labelBackgroundColorGi': 'labelBackgroundColor',
  'labelBackgroundHsr': 'labelBackground',
  'labelBackgroundColorHsr': 'labelBackgroundColor',
  'resetpopup': 'reset',
  'resetGi': 'reset',
  'resetHsr': 'reset',
  'labelButtonColor': 'labelButtonColor',
  'labelButtonColorGi': 'labelButtonColor',
  'labelButtonColorHsr': 'labelButtonColor',
  'labelTextColor': 'labelTextColor',
  'labelTextColorGi': 'labelTextColor',
  'labelTextColorHsr': 'labelTextColor',
  'labelGlobal-settings': 'labelGlobal',
  'labelMainPopup-settings': 'labelMainPopup',
  'labelOnlyGi-settings': 'labelOnlyGi',
  'labelOnlyHsr-settings': 'labelOnlyHsr',
  'labelFont': 'labelFont'
};
for (let id in labels) {
  document.getElementById(id).textContent = browser.i18n.getMessage(labels[id]);
}
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
document.getElementById('iconDisable').addEventListener('change', function() {
  var iconDisable = document.getElementById('iconDisable').checked;
  browser.storage.local.set({
    iconDisable: iconDisable
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
document.getElementById('mainFont').addEventListener('change', function() {
  var mainFont = document.getElementById('mainFont').checked;
  browser.storage.local.set({
    mainFont: mainFont
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
browser.storage.local.get(['roundingDisable']).then(function (result) {
  if (result.roundingDisable) {
  document.documentElement.style.setProperty('--border-radius', '10px')
  }
  else {
    document.documentElement.style.setProperty('--border-radius', '20px')
  }
});
browser.storage.local.get(['mainFont', 'iconDisable', 'roundingDisable', 'BackgroundHsr', 'BackgroundColorHsr', 'BackgroundGi', 'BackgroundColorGi', 'buttonColorMain', 'buttonColorGi', 'buttonColorHsr', 'buttonTextColorMain', 'buttonTextColorGi', 'buttonTextColorHsr', 'onlyHsr', 'onlyGi'], function(result) {
  const defaults = {
    'buttonColorMain': '#9a609a',
    'buttonColorGi': '#a89f96',
    'buttonColorHsr': '#004080',
    'buttonTextColorMain': '#ffffff',
    'buttonTextColorGi': '#ffffff',
    'buttonTextColorHsr': '#ffffff',
    'BackgroundColorGi': '#4e4b54',
    'BackgroundColorHsr': '#1e274e',
    'onlyHsr': false,
    'onlyGi': false,
    'iconDisable': false,
    'roundingDisable': false,
    'BackgroundGi': false,
    'BackgroundHsr': false,
    'mainFont': false
  };
  for (let key in defaults) {
    window[key] = result[key] ? result[key] : defaults[key];
  }  
  document.getElementById('onlyHsr').addEventListener('change', function() {
    var onlyHsr = document.getElementById('onlyHsr').checked;
    if (onlyHsr) {
      document.getElementById('onlyGi').checked = false;
      browser.storage.local.set({
        onlyGi: false
      });
    }
    browser.storage.local.set({
      onlyHsr: onlyHsr
    });
  });
  document.getElementById('onlyGi').addEventListener('change', function() {
    var onlyGi = document.getElementById('onlyGi').checked;
    if (onlyGi) {
      document.getElementById('onlyHsr').checked = false;
      browser.storage.local.set({
        onlyHsr: false
      });
    }
    browser.storage.local.set({
      onlyGi: onlyGi
    });
  });
  const elements = {
    'buttonColorMain': buttonColorMain,
    'buttonColorGi': buttonColorGi,
    'buttonColorHsr': buttonColorHsr,
    'buttonTextColorMain': buttonTextColorMain,
    'buttonTextColorGi': buttonTextColorGi,
    'buttonTextColorHsr': buttonTextColorHsr,
    'BackgroundColorGi': BackgroundColorGi,
    'BackgroundColorHsr': BackgroundColorHsr,
    'onlyHsr': onlyHsr,
    'onlyGi': onlyGi,
    'iconDisable': iconDisable,
    'roundingDisable': roundingDisable,
    'BackgroundHsr': BackgroundHsr,
    'BackgroundGi': BackgroundGi,
    'mainFont': mainFont
  };
  for (let id in elements) {
    let element = document.getElementById(id);
    if (element.type === "checkbox") {
      element.checked = elements[id];
    } else {
      element.value = elements[id];
    }
  }  
  if (result.buttonColorGi & result.buttonColorHsr) {
  } else if (result.buttonColorHsr) {} 
  else if (result.buttonColorGi) {} 
  else {
    browser.storage.local.set({buttonColorGi: '#a89f96', buttonColorHsr: '#004080'})
  }
});