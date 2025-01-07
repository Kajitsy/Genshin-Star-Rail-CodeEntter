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
  'labelGIBirthday': 'labelBirthday',
  'labelRegionGi': 'labelRegionGi',
  'labelRegionHsr': 'labelRegionHsr',
  'labelRegionZzz': 'labelRegionZzz',
  'eugi': 'eu',
  'euhsr': 'eu',
  'euzzz': 'eu',
  'usgi': 'usa',
  'ushsr': 'usa',
  'uszzz': 'usa',
  'asgi': 'asia',
  'ashsr': 'asia',
  'aszzz': 'asia',
  'chtgi': 'cht',
  'chthsr': 'cht',
  'chtzzz': 'cht',
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
const settings = [
  'buttonColorMain', 'buttonColorGi', 'buttonColorHsr', 'buttonColorZzz',
  'buttonTextColorMain', 'buttonTextColorGi', 'buttonTextColorHsr', 'buttonTextColorZzz',
  'BackgroundColorGi', 'BackgroundColorHsr', 'BackgroundColorZzz',
  'mainBirthdayDisable', 'giBirthdayDisable', 'roundingDisable',
  'BackgroundGi', 'BackgroundHsr', 'BackgroundZzz'
];

settings.forEach(setting => {
  const element = document.getElementById(setting);
  if (element.type === 'checkbox') {
    element.addEventListener('change', function() {
      chrome.storage.local.set({ [setting]: element.checked });
    });
  } else {
    element.addEventListener('input', function() {
      chrome.storage.local.set({ [setting]: element.value });
    });
  }
});

const resetButtons = [
  { id: 'resetpopup', values: { buttonColorMain: '#9a609a', buttonTextColorMain: '#ffffff' } },
  { id: 'resetGi', values: { buttonColorGi: '#a89f96', buttonTextColorGi: '#ffffff', BackgroundColorGi: '#4e4b54' } },
  { id: 'resetHsr', values: { buttonColorHsr: '#004080', buttonTextColorHsr: '#ffffff', BackgroundColorHsr: '#1e274e' } },
  { id: 'resetZzz', values: { buttonColorZzz: '#696d76', buttonTextColorZzz: '#ffffff', BackgroundColorZzz: '#404040' } }
];

resetButtons.forEach(reset => {
  document.getElementById(reset.id).addEventListener('click', function() {
    for (let key in reset.values) {
      document.getElementById(key).value = reset.values[key];
    }
    chrome.storage.local.set(reset.values);
  });
});

chrome.storage.local.get(['roundingDisable']).then(result => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});

['regionGi', 'regionHsr', 'regionZzz'].forEach(region => {
  document.getElementById(region).addEventListener('change', function() {
    chrome.storage.local.set({ [region]: this.value });
  });
});

chrome.storage.local.get(['regionGi', 'regionHsr', 'regionZzz'], function(result) {
  ['regionGi', 'regionHsr', 'regionZzz'].forEach(region => {
    if (result[region]) {
      document.getElementById(region).value = result[region];
    }
  });
});

chrome.storage.local.get(['BackgroundZzz','BackgroundColorZzz','onlyZzz','buttonTextColorZzz','buttonColorZzz','giBirthdayDisable', 'mainBirthdayDisable', 'roundingDisable', 'BackgroundHsr', 'BackgroundColorHsr', 'BackgroundGi', 'BackgroundColorGi', 'buttonColorMain', 'buttonColorGi', 'buttonColorHsr', 'buttonTextColorMain', 'buttonTextColorGi', 'buttonTextColorHsr', 'onlyHsr', 'onlyGi'], function(result) {
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
    'BackgroundColorZzz': '#404040',
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
  ['onlyHsr', 'onlyGi', 'onlyZzz'].forEach(id => {
    document.getElementById(id).addEventListener('change', function() {
      const checked = this.checked;
      if (checked) {
        ['onlyHsr', 'onlyGi', 'onlyZzz'].forEach(otherId => {
          if (otherId !== id) {
            document.getElementById(otherId).checked = false;
            chrome.storage.local.set({ [otherId]: false });
          }
        });
      }
      chrome.storage.local.set({ [id]: checked });
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
  chrome.storage.local.set({
    buttonColorGi: result.buttonColorGi || '#a89f96',
    buttonColorHsr: result.buttonColorHsr ||'#004080',
    buttonColorZzz: result.buttonColorZzz || '#696d76',
    buttonTextColorGi: result.buttonTextColorGi || '#ffffff',
    buttonTextColorHsr: result.buttonTextColorHsr || '#ffffff',
    buttonTextColorZzz: result.buttonTextColorZzz || '#ffffff',
    BackgroundColorGi: result.BackgroundColorGi || '#4e4b54',
    BackgroundColorHsr: result.BackgroundColorHsr || '#1e274e',
    BackgroundColorZzz: result.BackgroundColorZzz || '#404040',
  });
});