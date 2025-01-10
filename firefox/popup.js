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
      browser.tabs.create({ active: true, url: tab });
    }
  }, 2000);
}

function handleButtonClick(gameBiz, promoBaseUrl, region) {
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
              displayOverlay(browser.i18n.getMessage("api_request_error") + "\n" + error);
            });
        });
      } else if (data.retcode === -100) {
        displayOverlay(browser.i18n.getMessage("api_request_login_expired"), getRedemptionPage(gameBiz));
      } else {
        displayOverlay(browser.i18n.getMessage("account_data_error"));
      }
    })
    .catch(error => {
      displayOverlay(browser.i18n.getMessage("api_request_error") + "\n" + error);
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

browser.storage.local.get(['onlyHsr', 'onlyGi', 'onlyZzz', 'regionGi', 'regionHsr', 'regionZzz']).then(result => {
  const locales = navigator.language.slice(0, 2);
  const regionSettings = {
    hk4e_global: result.regionGi || 'os_euro',
    hkrpg_global: result.regionHsr || 'prod_official_eur',
    nap_global: result.regionZzz || 'prod_gf_eu'
  };

  if (result.onlyHsr) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("hsr-popup").style.display = "block";
    browser.storage.local.get(['buttonColorHsr', 'buttonTextColorHsr', 'BackgroundHsr', 'BackgroundColorHsr']).then(result => applyStyles(result, 'Hsr'));
    
    const sthsr = document.getElementById('sthsr');
    const sehsr = document.getElementById('sehsr');
    if (sthsr) {
      sthsr.textContent = browser.i18n.getMessage('sthsr');
      sthsr.addEventListener('click', () => handleButtonClick('hkrpg_global', 'https://sg-hkrpg-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hkrpg_global));
    }
    if (sehsr) {
      sehsr.textContent = browser.i18n.getMessage('sehsr');
      sehsr.addEventListener('click', () => {
      const code = codeElement.value;
      if (code) {
        const url = `${getRedemptionPage('hkrpg_global')}?code=${code}`;
        navigator.clipboard.writeText(url)
        .then(() => displayOverlay(browser.i18n.getMessage('copied_to_clipboard')))  
      }});
    }
  } else if (result.onlyZzz) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("zzz-popup").style.display = "block";
    browser.storage.local.get(['buttonColorZzz', 'buttonTextColorZzz', 'BackgroundZzz', 'BackgroundColorZzz']).then(result => applyStyles(result, 'Zzz'));
    
    const stzzz = document.getElementById('stzzz');
    const sezzz = document.getElementById('sezzz');
    if (stzzz) {
      stzzz.textContent = browser.i18n.getMessage('stzzz');
      stzzz.addEventListener('click', () => handleButtonClick('nap_global', 'https://public-operation-nap.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.nap_global));
    }
    if (sezzz) {
      sezzz.textContent = browser.i18n.getMessage('sezzz');
      sezzz.addEventListener('click', () => {
      const code = codeElement.value;
      if (code) {
        const url = `${getRedemptionPage('nap_global')}?code=${code}`;
        navigator.clipboard.writeText(url)
        .then(() => displayOverlay(browser.i18n.getMessage('copied_to_clipboard')))  
      }});
    }
  } else if (result.onlyGi) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("gi-popup").style.display = "block";
    browser.storage.local.get(['buttonColorGi', 'buttonTextColorGi', 'BackgroundGi', 'BackgroundColorGi']).then(result => applyStyles(result, 'Gi'));
    
    const stgi = document.getElementById('stgi');
    const segi = document.getElementById('segi');
    if (stgi) {
      stgi.textContent = browser.i18n.getMessage('stgi');
      stgi.addEventListener('click', () => handleButtonClick('hk4e_global', 'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hk4e_global));
    }
    if (segi) {
      segi.textContent = browser.i18n.getMessage('segi');
      segi.addEventListener('click', () => {
      const code = codeElement.value;
      if (code) {
        const url = `${getRedemptionPage('hk4e_global')}?code=${code}`;
        navigator.clipboard.writeText(url)
        .then(() => displayOverlay(browser.i18n.getMessage('copied_to_clipboard')))  
      }});
    }
    browser.storage.local.get(['giBirthdayDisable']).then((result) => {
      if (result.giBirthdayDisable) return;

      const today = new Date();
      const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      fetch('https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/birthdays.json')
        .then(response => response.json())
        .then(birthdayData => {
          const characterData = birthdayData[dateKey];
          if (!characterData) return;

          const baseUrl = 'https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements';
          const bgUrl = `${baseUrl}/backgrounds/${characterData.character}.webp`;

          if (characterData.element && effectVision) {
            const createEffect = () => {
              const effect = document.createElement('div');
              effect.className = 'effect';
              effect.innerHTML = `<img src="${baseUrl}/element/${characterData.element}.png" style="width: 30px; height: 30px;">`;
              effect.style.cssText = `
                position: absolute;
                pointer-events: none;
                left: ${Math.random() * window.innerWidth}px;
                animation: snowfall ${Math.random() * 6 + 3}s linear ${Math.random() * 10}s infinite;
                z-index: 1;
              `;
              effect.addEventListener('animationiteration', () => {
                effect.style.left = `${Math.random() * window.innerWidth}px`;
              });
              document.body.appendChild(effect);
            };

            setTimeout(() => {
              for (let i = 0; i < 10; i++) createEffect();
            }, 1000);
          }

          document.body.style.cssText = `
            background: url(${bgUrl});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;
          `;

          if (characterData.buttonColor) {
            document.documentElement.style.setProperty('--button-color', characterData.buttonColor);
            if (characterData.buttonTextColor) {
              document.documentElement.style.setProperty('--button-text-color', characterData.buttonTextColor);
            }
          }

          const label = document.getElementById("labelBirthdayPopup");
          const characterLANG = characterData[`character${navigator.language.toUpperCase()}`] || characterData.characterEN;
          const baseText = browser.i18n.getMessage("labelBirthdayPopup") + characterLANG + "!";
          label.textContent = baseText;
          label.style.display = 'flex';

          const width = label.offsetWidth;
          label.addEventListener('mouseover', () => {
            document.documentElement.style.setProperty('--width-labelBirthdayPopupHover', width);
            label.textContent = browser.i18n.getMessage("labelNotClickable");
          });
          label.addEventListener('mouseout', () => {
            label.textContent = baseText;
          });
        })
        .catch(console.error);
    });
  } else {
    const submitGI = document.getElementById('submitGI');
    const submitHSR = document.getElementById('submitHSR');
    const submitZZZ = document.getElementById('submitZZZ');
    const shareGI = document.getElementById('shareGI');
    const shareHSR = document.getElementById('shareHSR');
    const shareZZZ = document.getElementById('shareZZZ');

    if (submitGI) {
      submitGI.textContent = browser.i18n.getMessage('submitGI');
      submitGI.addEventListener('click', () => handleButtonClick('hk4e_global', 'https://sg-hk4e-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hk4e_global));
    }

    if (submitHSR) {
      submitHSR.textContent = browser.i18n.getMessage('submitHSR');
      submitHSR.addEventListener('click', () => handleButtonClick('hkrpg_global', 'https://sg-hkrpg-api.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.hkrpg_global));
    }

    if (submitZZZ) {
      submitZZZ.textContent = browser.i18n.getMessage('submitZZZ');
      submitZZZ.addEventListener('click', () => handleButtonClick('nap_global', 'https://public-operation-nap.hoyoverse.com/common/apicdkey/api/webExchangeCdkey', regionSettings.nap_global));
    }

    if (shareGI) {
      shareGI.textContent = browser.i18n.getMessage('shareGI');
      shareGI.addEventListener('click', () => {
      const code = codeElement.value;
      if (code) {
        const url = `${getRedemptionPage('hk4e_global')}?code=${code}`;
        navigator.clipboard.writeText(url)
        .then(() => displayOverlay(browser.i18n.getMessage('copied_to_clipboard')))  
      }});
    }

    if (shareHSR) {
      shareHSR.textContent = browser.i18n.getMessage('shareHSR');
      shareHSR.addEventListener('click', () => {
      const code = codeElement.value;
      if (code) {
        const url = `${getRedemptionPage('hkrpg_global')}?code=${code}`;
        navigator.clipboard.writeText(url)
        .then(() => displayOverlay(browser.i18n.getMessage('copied_to_clipboard')))  
      }});
    }

    if (shareZZZ) {
      shareZZZ.textContent = browser.i18n.getMessage('shareZZZ');
      shareZZZ.addEventListener('click', () => {
      const code = codeElement.value;
      if (code) {
        const url = `${getRedemptionPage('nap_global')}?code=${code}`;
        navigator.clipboard.writeText(url)
        .then(() => displayOverlay(browser.i18n.getMessage('copied_to_clipboard')))
      }});
    }
    
    browser.storage.local.get(['buttonColorMain', 'buttonTextColorMain']).then(result => {
      document.documentElement.style.setProperty('--button-color', result.buttonColorMain || '#9a609a');
      document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorMain || '#ffffff');
    });

    browser.storage.local.get(['giBirthdayDisable']).then((result) => {
      if (result.giBirthdayDisable) return;

      const today = new Date();
      const dateKey = `${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

      fetch('https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/birthdays.json')
        .then(response => response.json())
        .then(birthdayData => {
          const characterData = birthdayData[dateKey];
          if (!characterData) return;

          const baseUrl = 'https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements';
          const bgUrl = `${baseUrl}/backgrounds/${characterData.character}.webp`;

          if (characterData.element && effectVision) {
            const createEffect = () => {
              const effect = document.createElement('div');
              effect.className = 'effect';
              effect.innerHTML = `<img src="${baseUrl}/element/${characterData.element}.png" style="width: 30px; height: 30px;">`;
              effect.style.cssText = `
                position: absolute;
                pointer-events: none;
                left: ${Math.random() * window.innerWidth}px;
                animation: snowfall ${Math.random() * 6 + 3}s linear ${Math.random() * 10}s infinite;
                z-index: 1;
              `;
              effect.addEventListener('animationiteration', () => {
                effect.style.left = `${Math.random() * window.innerWidth}px`;
              });
              document.body.appendChild(effect);
            };

            setTimeout(() => {
              for (let i = 0; i < 10; i++) createEffect();
            }, 1000);
          }

          document.body.style.cssText = `
            background: url(${bgUrl});
            background-size: cover;
            background-repeat: no-repeat;
            background-position: center;
            overflow: hidden;
          `;

          if (characterData.buttonColor) {
            document.documentElement.style.setProperty('--button-color', characterData.buttonColor);
            if (characterData.buttonTextColor) {
              document.documentElement.style.setProperty('--button-text-color', characterData.buttonTextColor);
            }
          }

          const label = document.getElementById("labelBirthdayPopup");
          const characterLANG = characterData[`character${navigator.language.toUpperCase()}`] || characterData.characterEN;
          const baseText = browser.i18n.getMessage("labelBirthdayPopup") + characterLANG + "!";
          label.textContent = baseText;
          label.style.display = 'flex';

          const width = label.offsetWidth;
          label.addEventListener('mouseover', () => {
            document.documentElement.style.setProperty('--width-labelBirthdayPopupHover', width);
            label.textContent = browser.i18n.getMessage("labelNotClickable");
          });
          label.addEventListener('mouseout', () => {
            label.textContent = baseText;
          });
        })
        .catch(console.error);
    });
  }
});

browser.storage.local.get(['roundingDisable']).then(result => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});
