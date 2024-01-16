['submit', 'share'].forEach(function (buttonId) {
  const buttonElement = document.getElementById(buttonId);
  if (buttonElement) {
    buttonElement.textContent = browser.i18n.getMessage(buttonId);

    buttonElement.addEventListener('click', function () {
      const code = document.getElementById('code').value;
      let url;

      switch (buttonId) {
        case 'submit':
          const locales = navigator.language.slice(0, 2);
          url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
          document.getElementById('frame').src = url;
          break;

        case 'share':
          const shareLocales = navigator.language.slice(0, 2);
          url = `https://genshin.hoyoverse.com/${shareLocales}/gift?code=${code}`;
          navigator.clipboard.writeText(url);
          displayOverlay();
          break;

        default:
          break;
      }

      if (buttonId === 'submit') {
        const frame = document.getElementById('frame');
        frame.style.display = 'block';
        document.getElementById('code').style.display = 'none';
        document.getElementById('submit').style.display = 'none';
        document.getElementById('share').style.display = 'none';
      }
    });
  }
});

function displayOverlay() {
  const overlay = document.getElementById('displayOverlay');
  overlay.textContent = browser.i18n.getMessage("displayOverlay")
  overlay.style.display = 'flex';
  document.body.appendChild(overlay);
  setTimeout(function () {
    overlay.style.display = 'none';
  }, 2000);
}

browser.storage.local.get(['buttonColorGi', 'buttonTextColorGi', 'BackgroundGi', 'BackgroundColorGi']).then(function (result) {
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
