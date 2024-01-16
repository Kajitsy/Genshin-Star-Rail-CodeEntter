document.body.style.backgroundImage = "url(/pictures/background.png)";
['submitGI', 'shareGI', 'submitHSR', 'shareHSR'].forEach(function (buttonId) {
  const buttonElement = document.getElementById(buttonId);
  if (buttonElement) {
    buttonElement.textContent = browser.i18n.getMessage(buttonId);

    buttonElement.addEventListener('click', function () {
      const code = document.getElementById('code').value;
      let url;

      switch (buttonId) {
        case 'submitGI':
          const locales = navigator.language.slice(0, 2);
          document.body.style.backgroundImage = "url(/pictures/backgroundGI.png)";
          url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
          document.getElementById('frame').src = url;
          break;

        case 'shareGI':
          const shareLocales = navigator.language.slice(0, 2);
          url = `https://genshin.hoyoverse.com/${shareLocales}/gift?code=${code}`;
          navigator.clipboard.writeText(url);
          displayOverlay();
          break;

        case 'submitHSR':
          url = `https://hsr.hoyoverse.com/gift?code=${code}`;
          document.body.style.backgroundImage = "url(/pictures/backgroundHSR.png)";
          document.getElementById('frame').src = url;
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
        const frame = document.getElementById('frame');
        frame.style.display = 'block';
        document.getElementById('code').style.display = 'none';
        document.getElementById('submitGI').style.display = 'none';
        document.getElementById('shareGI').style.display = 'none';
        document.getElementById('submitHSR').style.display = 'none';
        document.getElementById('shareHSR').style.display = 'none';
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

browser.storage.local.get(['buttonColorMain', 'buttonTextColorMain']).then(function (result) {
  if (result.buttonColorMain) {
    document.documentElement.style.setProperty('--button-color', result.buttonColorMain);
  }
  if (result.buttonTextColorMain) {
    document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorMain);
  }
});
