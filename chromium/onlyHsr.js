if (typeof browser === "undefined") {
	browser = chrome;
}
function displayOverlay() {
  overlay.textContent = browser.i18n.getMessage("displayOverlay")
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 2000);
}
const buttonIds = ['submit', 'share'];
const frame = document.getElementById('frame');
const codeElement = document.getElementById('code');
const overlay = document.getElementById('displayOverlay');

buttonIds.forEach((buttonId) => {
  const buttonElement = document.getElementById(buttonId);
  if (buttonElement) {
    buttonElement.textContent = browser.i18n.getMessage(buttonId);
    buttonElement.addEventListener('click', () => {
      const code = codeElement.value;
      let url;
      switch (buttonId) {
        case 'submit':
          url = `https://hsr.hoyoverse.com/gift?code=${code}`;
          break;
        case 'share':
          url = `https://hsr.hoyoverse.com/gift?code=${code}`;
          navigator.clipboard.writeText(url);
          displayOverlay();
          break;
        default:
          break;
      }
      if (buttonId === 'submit') {
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
browser.storage.local.get(['roundingDisable']).then((result) => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});