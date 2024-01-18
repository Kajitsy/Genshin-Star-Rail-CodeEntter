if (typeof browser === "undefined") {
	browser = chrome;
}
['submit', 'share'].forEach(function (buttonId) {
  const buttonElement = document.getElementById(buttonId);
  if (buttonElement) {
    buttonElement.textContent = browser.i18n.getMessage(buttonId);
    
    buttonElement.addEventListener('click', function () {
      const code = document.getElementById('code').value;
      const locales = navigator.language.slice(0, 2);
      let url;
      switch (buttonId) {
        case 'submit':
          url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
          document.getElementById('frame').src = url;
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
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';
  snowflake.innerHTML = '❄';
  const size = Math.random() * 3 + 2;
  const fontSize = size > 5 ? 5 : size;
  snowflake.style.fontSize = fontSize + 'rem';
  snowflake.style.position = 'absolute';
  snowflake.style.color = 'white';
  snowflake.style.pointerEvents = 'none';
  const startPositionLeft = Math.random() * window.innerWidth;
  const duration = Math.random() * 4 + 3 + 's';
  const delay = Math.random() * 10 + 's';
  snowflake.style.left = startPositionLeft + 'px';
  snowflake.style.animation = `snowfall ${duration} linear ${delay} infinite`;
  document.body.appendChild(snowflake);
  snowflake.addEventListener('animationiteration', () => {
    snowflake.style.left = Math.random() * window.innerWidth + 'px';
  });
}
function generateSnowfall() {
  for (let i = 0; i < 20; i++) {
    createSnowflake();
  }
}
browser.storage.local.get(['snowDisable', 'buttonColorGi', 'buttonTextColorGi', 'BackgroundGi', 'BackgroundColorGi']).then(function (result) {
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
  if (result.snowDisable){
    console.log("Snow Disable");
  }
  else {
    console.log("Snow Enable");
    generateSnowfall();
  }
});
browser.storage.local.get(['roundingDisable']).then(function (result) {
  if (result.roundingDisable) {
  document.documentElement.style.setProperty('--border-radius', '10px')
  }
  else {
    document.documentElement.style.setProperty('--border-radius', '20px')
  }
});