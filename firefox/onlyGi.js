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
      const locales = navigator.language.slice(0, 2);
      let url;
      switch (buttonId) {
        case 'submit':
          url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
          break;
        case 'share':
          url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
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

browser.storage.local.get(['roundingDisable']).then((result) => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});