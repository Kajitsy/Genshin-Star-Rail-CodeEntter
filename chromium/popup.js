if (typeof browser === "undefined") {
	browser = chrome;
}
const buttonIds = ['submitGI', 'shareGI', 'submitHSR', 'shareHSR', 'sthsr', 'sehsr', 'stgi', 'segi'];
const frame = document.getElementById('frame');
const codeElement = document.getElementById('code');
const overlay = document.getElementById('displayOverlay');
const font = document.styleSheets[0];
browser.storage.local.get(['mainFont']).then(function (result) {
  if (result.mainFont) {
    mainFont= "@font-face {font-family: 'SDK_SC_Web'; src: url('HSRfont.woff2') format('woff2');}";
  } else {
    mainFont = "@font-face {font-family: 'SDK_SC_Web'; src: url('GIfont.woff2') format('woff2');}";
  }
})
function displayOverlay() {
  overlay.textContent = browser.i18n.getMessage("displayOverlay")
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 2000);
}
browser.storage.local.get(['onlyHsr', 'onlyGi']).then(function (result) {
  if (result.onlyHsr) {
    font.insertRule("@font-face {font-family: 'SDK_SC_Web'; src: url('HSRfont.woff2') format('woff2');}", font.cssRules.length);
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("hsr-popup").style.display = "block";
    buttonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.textContent = browser.i18n.getMessage(buttonId);
        buttonElement.addEventListener('click', () => {
          const code = codeElement.value;
          let url;
          switch (buttonId) {
            case 'sthsr':
              url = `https://hsr.hoyoverse.com/gift?code=${code}`;
              break;
            case 'sehsr':
              url = `https://hsr.hoyoverse.com/gift?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            default:
              break;
          }
          if (buttonId === 'sthsr') {
            frame.src = url;
            frame.style.display = 'block';
            codeElement.style.display = 'none';
            buttonIds.forEach((id) => {
              document.getElementById(id).style.display = 'none';
            });
          }
        });
      }
    })
    browser.storage.local.get(['buttonColorHsr', 'buttonTextColorHsr', 'BackgroundHsr', 'BackgroundColorHsr']).then((result) => {
      if (result.buttonColorHsr) {
        document.documentElement.style.setProperty('--button-color', result.buttonColorHsr);
      }
      if (result.buttonTextColorHsr) {
        document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorHsr);
      }
      if (result.BackgroundHsr) {
        document.body.style.background = '#1e274e';
        document.body.style.background = result.BackgroundColorHsr;
      } 
      else {
        document.body.style.background = 'url("/pictures/backgroundHSR.png")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.overflow = 'hidden';
      }
    });
  } else if (result.onlyGi) {
    font.insertRule("@font-face {font-family: 'SDK_SC_Web'; src: url('GIfont.woff2') format('woff2');}", font.cssRules.length);
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("gi-popup").style.display = "block";
    buttonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.textContent = browser.i18n.getMessage(buttonId);
        buttonElement.addEventListener('click', () => {
          const code = codeElement.value;
          const locales = navigator.language.slice(0, 2);
          let url;
          switch (buttonId) {
            case 'stgi':
              url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
              break;
            case 'segi':
              url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            default:
              break;
          }
          if (buttonId === 'stgi') {
            frame.src = url;
            frame.style.display = 'block';
            codeElement.style.display = 'none';
            buttonIds.forEach((id) => {
              document.getElementById(id).style.display = 'none';
            });
          }
        });
      }
    });
    browser.storage.local.get(['buttonColorGi', 'buttonTextColorGi', 'BackgroundGi', 'BackgroundColorGi']).then((result) => {
      if (result.buttonColorGi) {
        document.documentElement.style.setProperty('--button-color', result.buttonColorGi);
      }
      if (result.buttonTextColorGi) {
        document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorGi);
      }
      if (result.BackgroundGi) {
        document.body.style.background = '#4e4b54';
        document.body.style.background = result.BackgroundColorGi;
      } 
      else {
        document.body.style.background = 'url("/pictures/backgroundGI.png")';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center';
        document.body.style.overflow = 'hidden';
      }
    });
  } else {
    font.insertRule(mainFont, font.cssRules.length);
    buttonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      buttonElement.textContent = browser.i18n.getMessage(buttonId);
      if (buttonElement) {
        buttonElement.addEventListener('click', () => {
          const code = codeElement.value;
          const locales = navigator.language.slice(0, 2);
          let url;
          switch (buttonId) {
            case 'submitGI':
              document.body.style.backgroundImage = "url(/pictures/backgroundGI.png)";
              url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
              break;
            case 'submitHSR':
              url = `https://hsr.hoyoverse.com/gift?code=${code}`;
              document.body.style.backgroundImage = "url(/pictures/backgroundHSR.png)";
              break;
            case 'shareGI':
              url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            case 'shareHSR':
              url = `https://hsr.hoyoverse.com/gift?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            default:
              break;
          }
          if (buttonId === 'submitGI' || buttonId === 'submitHSR') {
            frame.src = url;
            frame.style.display = 'block';
            codeElement.style.display = 'none';
            buttonIds.forEach((id) => {
              document.getElementById(id).style.display = 'none';
            });
          }
        });
      }
    });
    browser.storage.local.get(['buttonColorMain', 'buttonTextColorMain']).then((result) => {
      if (result.buttonColorMain) {
        document.documentElement.style.setProperty('--button-color', result.buttonColorMain);
      }
      if (result.buttonTextColorMain) {
        document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorMain);
      }
    });    
  }
})
browser.storage.local.get(['roundingDisable']).then((result) => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});
