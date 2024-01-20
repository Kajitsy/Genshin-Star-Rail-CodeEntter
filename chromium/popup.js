if (typeof browser === "undefined") {
	browser = chrome;
}
const buttonIds = ['submitGI', 'shareGI', 'submitHSR', 'shareHSR'];
const frame = document.getElementById('frame');
const codeElement = document.getElementById('code');
const overlay = document.getElementById('displayOverlay');

buttonIds.forEach((buttonId) => {
  const buttonElement = document.getElementById(buttonId);
  if (buttonElement) {
    buttonElement.textContent = browser.i18n.getMessage(buttonId);
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
function displayOverlay() {
  overlay.textContent = browser.i18n.getMessage("displayOverlay")
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 2000);
}
browser.storage.local.get(['buttonColorMain', 'buttonTextColorMain']).then((result) => {
  if (result.buttonColorMain) {
    document.documentElement.style.setProperty('--button-color', result.buttonColorMain);
  }
  if (result.buttonTextColorMain) {
    document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorMain);
  }
});
browser.storage.local.get(['roundingDisable']).then((result) => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});