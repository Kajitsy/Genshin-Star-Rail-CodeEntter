const labels = {
  'labelGi': 'labelGi',
  'labelHsr': 'labelHsr',
  'labelZzz': 'labelZzz',
  'labelRounding': 'labelRounding',
  'labelBackgroundGi': 'labelBackground',
  'labelBackgroundHsr': 'labelBackground',
  'labelBackgroundZzz': 'labelBackground',
  'labelBackgroundColorGi': 'labelBackgroundColor',
  'labelBackgroundColorHsr': 'labelBackgroundColor',
  'labelBackgroundColorZzz': 'labelBackgroundColor',
  'resetpopup': 'reset',
  'resetGi': 'reset',
  'resetHsr': 'reset',
  'resetZzz': 'reset',
  'labelButtonColor': 'labelButtonColor',
  'labelButtonColorGi': 'labelButtonColor',
  'labelButtonColorHsr': 'labelButtonColor',
  'labelButtonColorZzz': 'labelButtonColor',
  'labelTextColor': 'labelTextColor',
  'labelTextColorGi': 'labelTextColor',
  'labelTextColorHsr': 'labelTextColor',
  'labelTextColorZzz': 'labelTextColor',
  'labelGlobal-settings': 'labelGlobal',
  'labelMainPopup-settings': 'labelMainPopup',
  'labelOnlyGi-settings': 'labelOnlyGi',
  'labelOnlyHsr-settings': 'labelOnlyHsr',
  'labelOnlyZzz-settings': 'labelOnlyZzz',
  'labelMainBirthday': 'labelBirthday',
  'labelGIBirthday': 'labelBirthday'
};
for (let id in labels) {
  document.getElementById(id).textContent = chrome.i18n.getMessage(labels[id]);
}
function showSettingsSection(section) {
  var sections = ['global-settings','main-popup-settings', 'onlyGi-settings', 'onlyHsr-settings', 'onlyZzz-settings'];
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
  chrome.storage.local.set({
    buttonColorMain: buttonColorMain
  }
)});
document.getElementById('buttonColorGi').addEventListener('input', function() {
  var buttonColorGi = document.getElementById('buttonColorGi').value;
  chrome.storage.local.set({
    buttonColorGi: buttonColorGi
  });
});
document.getElementById('buttonColorHsr').addEventListener('input', function() {
  var buttonColorHsr = document.getElementById('buttonColorHsr').value;
  chrome.storage.local.set({
    buttonColorHsr: buttonColorHsr
  });
});
document.getElementById('buttonColorZzz').addEventListener('input', function() {
  var buttonColorZzz = document.getElementById('buttonColorZzz').value;
  chrome.storage.local.set({
    buttonColorZzz: buttonColorZzz
  });
});
document.getElementById('buttonTextColorMain').addEventListener('input', function() {
  var buttonTextColorMain = document.getElementById('buttonTextColorMain').value;
  chrome.storage.local.set({
    buttonTextColorMain: buttonTextColorMain
  }
)});
document.getElementById('buttonTextColorGi').addEventListener('input', function() {
  var buttonTextColorGi = document.getElementById('buttonTextColorGi').value;
  chrome.storage.local.set({
    buttonTextColorGi: buttonTextColorGi
  });
});
document.getElementById('buttonTextColorHsr').addEventListener('input', function() {
  var buttonTextColorHsr = document.getElementById('buttonTextColorHsr').value;
  chrome.storage.local.set({
    buttonTextColorHsr: buttonTextColorHsr
  });
});
document.getElementById('buttonTextColorZzz').addEventListener('input', function() {
  var buttonTextColorZzz = document.getElementById('buttonTextColorZzz').value;
  chrome.storage.local.set({
    buttonTextColorZzz: buttonTextColorZzz
  });
});
document.getElementById('BackgroundColorGi').addEventListener('input', function() {
  var BackgroundColorGi = document.getElementById('BackgroundColorGi').value;
  chrome.storage.local.set({
    BackgroundColorGi: BackgroundColorGi
  });
});
document.getElementById('BackgroundColorHsr').addEventListener('input', function() {
  var BackgroundColorHsr = document.getElementById('BackgroundColorHsr').value;
  chrome.storage.local.set({
    BackgroundColorHsr: BackgroundColorHsr
  });
});
document.getElementById('BackgroundColorZzz').addEventListener('input', function() {
  var BackgroundColorZzz = document.getElementById('BackgroundColorZzz').value;
  chrome.storage.local.set({
    BackgroundColorZzz: BackgroundColorZzz
  });
});
document.getElementById('mainBirthdayDisable').addEventListener('change', function() {
  var mainBirthdayDisable = document.getElementById('mainBirthdayDisable').checked;
  chrome.storage.local.set({
    mainBirthdayDisable: mainBirthdayDisable
  });
});
document.getElementById('giBirthdayDisable').addEventListener('change', function() {
  var giBirthdayDisable = document.getElementById('giBirthdayDisable').checked;
  chrome.storage.local.set({
    giBirthdayDisable: giBirthdayDisable
  });
});
document.getElementById('roundingDisable').addEventListener('change', function() {
  var roundingDisable = document.getElementById('roundingDisable').checked;
  chrome.storage.local.set({
    roundingDisable: roundingDisable
  });
});
document.getElementById('BackgroundGi').addEventListener('change', function() {
  var BackgroundGi = document.getElementById('BackgroundGi').checked;
  chrome.storage.local.set({
    BackgroundGi: BackgroundGi
  });
});
document.getElementById('BackgroundHsr').addEventListener('change', function() {
  var BackgroundHsr = document.getElementById('BackgroundHsr').checked;
  chrome.storage.local.set({
    BackgroundHsr: BackgroundHsr
  });
});
document.getElementById('BackgroundZzz').addEventListener('change', function() {
  var BackgroundZzz = document.getElementById('BackgroundZzz').checked;
  chrome.storage.local.set({
    BackgroundZzz: BackgroundZzz
  });
});
document.getElementById('resetpopup').addEventListener('click', function() {
  document.getElementById('buttonColorMain').value = '#9a609a';
  document.getElementById('buttonTextColorMain').value = '#ffffff';
  chrome.storage.local.set({
    buttonColorMain: '#9a609a',
    buttonTextColorMain: '#ffffff',
  });
});
document.getElementById('resetGi').addEventListener('click', function() {
  document.getElementById('buttonColorGi').value = '#a89f96';
  document.getElementById('buttonTextColorGi').value = '#ffffff';
  document.getElementById('BackgroundColorGi').value = '#4e4b54';
  chrome.storage.local.set({
    buttonColorGi: '#a89f96',
    buttonTextColorGi: '#ffffff',
    BackgroundColorGi: '#4e4b54'
  })});
document.getElementById('resetHsr').addEventListener('click', function() {
  document.getElementById('buttonColorHsr').value = '#004080';
  document.getElementById('buttonTextColorHsr').value = '#ffffff';
  document.getElementById('BackgroundColorHsr').value = '#1e274e';
  chrome.storage.local.set({
    buttonColorHsr: '#004080',
    buttonTextColorHsr: '#ffffff',
    BackgroundColorHsr: '#1e274e'
  })});
document.getElementById('resetZzz').addEventListener('click', function() {
  document.getElementById('buttonColorZzz').value = '#696d76';
  document.getElementById('buttonTextColorZzz').value = '#ffffff';
  document.getElementById('BackgroundColorZzz').value = '#1e274e';
  chrome.storage.local.set({
    buttonColorZzz: '#696d76',
    buttonTextColorZzz: '#ffffff',
    BackgroundColorZzz: '#1e274e'
  })});
chrome.storage.local.get(['roundingDisable']).then(function (result) {
  if (result.roundingDisable) {
  document.documentElement.style.setProperty('--border-radius', '10px')
  }
  else {
    document.documentElement.style.setProperty('--border-radius', '20px')
  }
});
chrome.storage.local.get(['BackgroundZzz','onlyZzz','buttonTextColorZzz','buttonColorZzz','giBirthdayDisable', 'mainBirthdayDisable', 'roundingDisable', 'BackgroundHsr', 'BackgroundColorHsr', 'BackgroundGi', 'BackgroundColorGi', 'buttonColorMain', 'buttonColorGi', 'buttonColorHsr', 'buttonTextColorMain', 'buttonTextColorGi', 'buttonTextColorHsr', 'onlyHsr', 'onlyGi'], function(result) {
  const defaults = {
    'buttonColorMain': '#9a609a',
    'buttonColorGi': '#a89f96',
    'buttonColorHsr': '#004080',
    'buttonColorZzz': '#696d76',
    'buttonTextColorMain': '#ffffff',
    'buttonTextColorGi': '#ffffff',
    'buttonTextColorHsr': '#ffffff',
    'buttonTextColorZzz': '#ffffff',
    'BackgroundColorGi': '#4e4b54',
    'BackgroundColorHsr': '#1e274e',
    'BackgroundColorZzz': '#1e274e',
    'onlyGi': false,
    'onlyHsr': false,
    'onlyZzz': false,
    'mainBirthdayDisable': false,
    'giBirthdayDisable': false,
    'roundingDisable': false,
    'BackgroundGi': false,
    'BackgroundHsr': false,
    'BackgroundZzz': false,
  };
  for (let key in defaults) {
    window[key] = result[key] ? result[key] : defaults[key];
  }  
  document.getElementById('onlyHsr').addEventListener('change', function() {
    var onlyHsr = document.getElementById('onlyHsr').checked;
    if (onlyHsr) {
      document.getElementById('onlyGi').checked = false;
      chrome.storage.local.set({
        onlyGi: false
      });
      document.getElementById('onlyZzz').checked = false;
      chrome.storage.local.set({
        onlyZzz: false
      });
    }
    chrome.storage.local.set({
      onlyHsr: onlyHsr
    });
  });
  document.getElementById('onlyGi').addEventListener('change', function() {
    var onlyGi = document.getElementById('onlyGi').checked;
    if (onlyGi) {
      document.getElementById('onlyHsr').checked = false;
      chrome.storage.local.set({
        onlyHsr: false
      });
      document.getElementById('onlyZzz').checked = false;
      chrome.storage.local.set({
        onlyZzz: false
      });
    }
    chrome.storage.local.set({
      onlyGi: onlyGi
    });
  });
  document.getElementById('onlyZzz').addEventListener('change', function() {
    var onlyZzz = document.getElementById('onlyZzz').checked;
    if (onlyZzz) {
      document.getElementById('onlyGi').checked = false;
      chrome.storage.local.set({
        onlyGi: false
      });
      document.getElementById('onlyHsr').checked = false;
      chrome.storage.local.set({
        onlyHsr: false
      });
    }
    chrome.storage.local.set({
      onlyZzz: onlyZzz
    });
  });
  const elements = {
    'buttonColorMain': buttonColorMain,
    'buttonColorGi': buttonColorGi,
    'buttonColorHsr': buttonColorHsr,
    'buttonColorZzz': buttonColorZzz,
    'buttonTextColorMain': buttonTextColorMain,
    'buttonTextColorGi': buttonTextColorGi,
    'buttonTextColorHsr': buttonTextColorHsr,
    'buttonTextColorZzz': buttonTextColorZzz,
    'BackgroundColorGi': BackgroundColorGi,
    'BackgroundColorHsr': BackgroundColorHsr,
    'BackgroundColorZzz': BackgroundColorZzz,
    'onlyGi': onlyGi,
    'onlyHsr': onlyHsr,
    'onlyZzz': onlyZzz,
    'mainBirthdayDisable': mainBirthdayDisable,
    'giBirthdayDisable': giBirthdayDisable,
    'roundingDisable': roundingDisable,
    'BackgroundGi': BackgroundGi,
    'BackgroundHsr': BackgroundHsr,
    'BackgroundZzz': BackgroundZzz,
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
    chrome.storage.local.set({buttonColorGi: '#a89f96', buttonColorHsr: '#004080'})
  }
});