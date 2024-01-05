if (typeof browser === "undefined") {
	browser = chrome;
}
['submit', 'share'].forEach(function (buttonId) {
  const buttonElement = document.getElementById(buttonId);
  if (buttonElement) {
    buttonElement.textContent = browser.i18n.getMessage(buttonId);

    buttonElement.addEventListener('click', function () {
      const code = document.getElementById('code').value;
      let url;

      switch (buttonId) {
        case 'submit':
          url = `https://hsr.hoyoverse.com/gift?code=${code}`;
          document.getElementById('frame').src = url;
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
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.color = 'white';
  overlay.style.display = 'flex';
  overlay.style.justifyContent = 'center';
  overlay.style.alignItems = 'center';
  overlay.style.fontSize = '1em';
  overlay.textContent = 'The Link Has Been Copied';
  overlay.style.display = 'flex';
  document.body.appendChild(overlay);

  setTimeout(function () {
    overlay.style.display = 'none';
  }, 2000);
}

browser.storage.local.get(['buttonColorHsr', 'buttonTextColorHsr', 'BackgroundHsr', 'BackgroundColorHsr']).then(function (result) {
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