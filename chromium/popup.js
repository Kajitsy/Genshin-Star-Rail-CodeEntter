const buttonIds = ['submitGI', 'shareGI', 'submitHSR', 'shareHSR', 'submitZZZ', 'shareZZZ', 'sthsr', 'sehsr', 'stzzz', 'sezzz', 'stgi', 'segi'];
const frame = document.getElementById('frame');
const codeElement = document.getElementById('code');
const overlay = document.getElementById('displayOverlay');
const effectVision = true;

function displayOverlay(text, tab = null) {
  overlay.textContent = text;
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.display = 'none';
    if (tab) {
      chrome.tabs.create({ active: true, url: tab });
    }
  }, 2000);
}

function handleButtonClick(buttonId, gameBiz, promoBaseUrl, region) {
  const code = codeElement.value;
  if (!code) return;

  const apiUrl = `https://api-account-os.hoyoverse.com/account/binding/api/getUserGameRolesByCookieToken?game_biz=${gameBiz}&region=${region}`;

  fetch(apiUrl, { method: 'GET', credentials: 'include' })
    .then(response => response.json())
    .then(data => {
      if (data.retcode === 0 && data.data && data.data.list && data.data.list.length > 0) {
        data.data.list.forEach(userData => {
          const uid = userData.game_uid;
          const region = userData.region;
          const promoUrl = `${promoBaseUrl}?game_biz=${gameBiz}&uid=${uid}&region=${region}&lang=${navigator.language.slice(0, 2)}&cdkey=${code}`;

          fetch(promoUrl, { method: 'GET', credentials: 'include' })
            .then(response => response.json())
            .then(promoData => {
              displayOverlay(promoData.data ? promoData.data.msg : promoData.message);
            })
            .catch(error => {
              displayOverlay(chrome.i18n.getMessage("api_request_error") + "\n" + error);
            });
        });
      } else if (data.retcode === -100) {
        displayOverlay(chrome.i18n.getMessage("api_request_login_expired"), getRedemptionPage(gameBiz));
      } else {
        displayOverlay(chrome.i18n.getMessage("account_data_error"));
      }
    })
    .catch(error => {
      displayOverlay(chrome.i18n.getMessage("api_request_error") + "\n" + error);
    });
}

function getRedemptionPage(gameBiz) {
  switch (gameBiz) {
    case 'hk4e_global': return 'https://genshin.hoyoverse.com/gift';
    case 'hkrpg_global': return 'https://hsr.hoyoverse.com/gift';
    case 'nap_global': return 'https://zenless.hoyoverse.com/redemption';
    default: return '';
  }
}

function setupButtons(buttonIds, gameBiz, promoBaseUrl, region) {
  buttonIds.forEach(buttonId => {
    const buttonElement = document.getElementById(buttonId);
    if (buttonElement) {
      buttonElement.textContent = chrome.i18n.getMessage(buttonId);
      buttonElement.addEventListener('click', () => handleButtonClick(buttonId, gameBiz, promoBaseUrl, region));
    }
  });
}

function applyStyles(result, game) {
  document.documentElement.style.setProperty('--button-color', result[`buttonColor${game}`]);
  document.documentElement.style.setProperty('--button-text-color', result[`buttonTextColor${game}`]);
  document.body.style.background = `url("/pictures/background${game}.webp")`;
  document.body.style.backgroundSize = 'cover';
  document.body.style.backgroundRepeat = 'no-repeat';
  document.body.style.backgroundPosition = 'center';
  document.body.style.overflow = 'hidden';
  if (result[`Background${game}`]) {
    document.body.style.background = result[`BackgroundColor${game}`];
  }
}

chrome.storage.local.get(['onlyHsr', 'onlyGi', 'onlyZzz', 'regionGi', 'regionHsr', 'regionZzz']).then(result => {
  const locales = navigator.language.slice(0, 2);
  const regionSettings = {
    hk4e_global: result.regionGi || 'os_euro',
    hkrpg_global: result.regionHsr || 'prod_official_eur',
    nap_global: result.regionZzz || 'prod_gf_eu'
  };

  if (result.onlyHsr) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("hsr-popup").style.display = "block";
    setupButtons(buttonIds, 'hkrpg_global', 'https://sg-hkrpg-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hkrpg_global);
    chrome.storage.local.get(['buttonColorHsr', 'buttonTextColorHsr', 'BackgroundHsr', 'BackgroundColorHsr']).then(result => applyStyles(result, 'Hsr'));
  } else if (result.onlyZzz) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("zzz-popup").style.display = "block";
    setupButtons(buttonIds, 'nap_global', 'https://public-operation-nap.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.nap_global);
    chrome.storage.local.get(['buttonColorZzz', 'buttonTextColorZzz', 'BackgroundZzz', 'BackgroundColorZzz']).then(result => applyStyles(result, 'Zzz'));
  } else if (result.onlyGi) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("gi-popup").style.display = "block";
    setupButtons(buttonIds, 'hk4e_global', 'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hk4e_global);
    chrome.storage.local.get(['buttonColorGi', 'buttonTextColorGi', 'BackgroundGi', 'BackgroundColorGi']).then(result => applyStyles(result, 'Gi'));
  } else {
    setupButtons(buttonIds, 'hk4e_global', 'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hk4e_global);
    chrome.storage.local.get(['buttonColorMain', 'buttonTextColorMain']).then(result => {
      if (result.buttonColorMain) {
        document.documentElement.style.setProperty('--button-color', result.buttonColorMain);
      }
      if (result.buttonTextColorMain) {
        document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorMain);
      }
    });
  }
});

chrome.storage.local.get(['roundingDisable']).then(result => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});
