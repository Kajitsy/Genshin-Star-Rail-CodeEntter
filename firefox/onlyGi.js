browser.storage.local.get('snowEnable', function(result) {
  if (result.snowEnable) {
    function createSnowflake() {
      const snowflake = document.createElement('div');
      snowflake.className = 'snowflake';
      const size = Math.random() * 3 + 2 + 'px';
      snowflake.style.width = size;
      snowflake.style.height = size;
      snowflake.style.position = 'absolute';
      snowflake.style.background = 'white';
      snowflake.style.borderRadius = '50%';
      snowflake.style.pointerEvents = 'none';

      const startPositionLeft = Math.random() * window.innerWidth;
      const duration = Math.random() * 2 + 3 + 's';
      const delay = Math.random() * 2 + 's';

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
    generateSnowfall();
    console.log("snowEnable");
  } else {
    console.log("snowDisable");
  }
});

['submit', 'share', 'options'].forEach(function (buttonId) {
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

        case 'options':
          window.location.href = 'options.html';
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
        document.getElementById('options').style.display = 'none';
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

browser.storage.local.get(['buttonColor', 'buttonTextColor']).then(function (result) {
  if (result.buttonColor) {
    document.documentElement.style.setProperty('--button-color', result.buttonColor);
  }
  if (result.buttonTextColor) {
    document.documentElement.style.setProperty('--button-text-color', result.buttonTextColor);
  }
});