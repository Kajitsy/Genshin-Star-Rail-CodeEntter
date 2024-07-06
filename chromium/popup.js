const buttonIds = ['submitGI', 'shareGI', 'submitHSR', 'shareHSR', 'submitZZZ', 'shareZZZ', 'sthsr', 'sehsr', 'stzzz', 'sezzz', 'stgi', 'segi'];
const frame = document.getElementById('frame');
const codeElement = document.getElementById('code');
const overlay = document.getElementById('displayOverlay');
effectVision = true;
function displayOverlay() {
  overlay.textContent = chrome.i18n.getMessage("displayOverlay")
  overlay.style.display = 'flex';
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 2000);
}
chrome.storage.local.get(['onlyHsr', 'onlyGi', 'onlyZzz']).then(function (result) {
  const locales = navigator.language.slice(0, 2);
  if (result.onlyHsr) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("hsr-popup").style.display = "block";
    buttonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.textContent = chrome.i18n.getMessage(buttonId);
        buttonElement.addEventListener('click', () => {
          const code = codeElement.value;
          let url;
          switch (buttonId) {
            case 'sthsr':
              url = `https://hsr.hoyoverse.com/gift?code=${code}`;
              break;
            case 'sehsr':
              url = `https://hsr.hoyoverse.com/gift?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            default:
              break;
          }
          if (buttonId === 'sthsr') {
            frame.src = url;
            frame.style.display = 'block';
            codeElement.style.display = 'none';
            buttonIds.forEach((id) => {
              document.getElementById(id).style.display = 'none';
            });
          }
        });
      }
    })
    chrome.storage.local.get(['buttonColorHsr', 'buttonTextColorHsr', 'BackgroundHsr', 'BackgroundColorHsr']).then((result) => {
      document.documentElement.style.setProperty('--button-color', result.buttonColorHsr);
      document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorHsr);
      document.body.style.background = 'url("/pictures/backgroundHSR.webp")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.overflow = 'hidden';
      if (result.BackgroundHsr) {
        document.body.style.background = result.BackgroundColorHsr;
      } 
    });
  } else if (result.onlyZzz) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("zzz-popup").style.display = "block";
    buttonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.textContent = chrome.i18n.getMessage(buttonId);
        buttonElement.addEventListener('click', () => {
          const code = codeElement.value;
          let url;
          switch (buttonId) {
            case 'stzzz':
              url = `https://zenless.hoyoverse.com/redemption?code=${code}`;
              break;
            case 'sezzz':
              url = `https://zenless.hoyoverse.com/redemption?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            default:
              break;
          }
          if (buttonId === 'stzzz') {
            frame.src = url;
            frame.style.display = 'block';
            codeElement.style.display = 'none';
            buttonIds.forEach((id) => {
              document.getElementById(id).style.display = 'none';
            });
          }
        });
      }
    })
    chrome.storage.local.get(['buttonColorZzz', 'buttonTextColorZzz', 'BackgroundZzz', 'BackgroundColorZzz']).then((result) => {
      document.documentElement.style.setProperty('--button-color', result.buttonColorZzz);
      document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorZzz);
      document.body.style.background = 'url("/pictures/backgroundZZZ.webp")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.overflow = 'hidden';
      if (result.BackgroundZzz) {
        document.body.style.background = result.BackgroundColorZzz;
  }});
  } else if (result.onlyGi) {
    document.getElementById("main-popup").style.display = "none";
    document.getElementById("gi-popup").style.display = "block";
    buttonIds.forEach((buttonId) => {
      const buttonElement = document.getElementById(buttonId);
      if (buttonElement) {
        buttonElement.textContent = chrome.i18n.getMessage(buttonId);
        buttonElement.addEventListener('click', () => {
          const code = codeElement.value;
          let url;
          switch (buttonId) {
            case 'stgi':
              url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
              break;
            case 'segi':
              url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
              navigator.clipboard.writeText(url);
              displayOverlay();
              break;
            default:
              break;
          }
          if (buttonId === 'stgi') {
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
    chrome.storage.local.get(['buttonColorGi', 'buttonTextColorGi', 'BackgroundGi', 'BackgroundColorGi']).then((result) => {
      document.documentElement.style.setProperty('--button-color', result.buttonColorGi);
      document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorGi);
      document.body.style.background = 'url("/pictures/backgroundGI.webp")';
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundPosition = 'center';
      document.body.style.overflow = 'hidden';
      if (result.BackgroundGi) {
        document.body.style.background = result.BackgroundColorGi;
      } 
    });
    chrome.storage.local.get(['giBirthdayDisable']).then((result) => {
      if (!result.giBirthdayDisable) {     
        let today = new Date();
        let dd = String(today.getDate()).padStart(2, '0');
        let mm = String(today.getMonth() + 1).padStart(2, '0');
        today = mm + '-' + dd;
        fetch('https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/birthdays.json')
            .then(response => response.json())
            .then(birthdayData => {
              if (birthdayData[today]) {
                let characterData = birthdayData[today];
                let bgUrl = 'https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/backgrounds/' + characterData.character + '.webp';
                function createEffect() {
                  const effect = document.createElement('div');
                  effect.className = 'effect';
                  let effectUrl = 'https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/element/' + characterData.element + '.png';
                  effect.innerHTML = '<img src="' + effectUrl + '"style="width: 30px; height: 30px;">';
                  effect.style.position = 'absolute';
                  effect.style.pointerEvents = 'none';
                  const startPositionLeft = Math.random() * window.innerWidth;
                  const duration = Math.random() * 6 + 3 + 's';
                  const delay = Math.random() * 10 + 's';
                  effect.style.left = startPositionLeft + 'px';
                  effect.style.animation = `snowfall ${duration} linear ${delay} infinite`;
                  effect.style.zIndex = 1;
                  document.body.appendChild(effect);
                  effect.addEventListener('animationiteration', () => {
                    effect.style.left = Math.random() * window.innerWidth + 'px';
                  });
                }
                function generateEffect() {
                  for (let i = 0; i < 10; i++) {
                    createEffect();
                  }
                } 
                setTimeout(function() {
                  if (characterData.element) {
                    generateEffect()
                  }}, 1000)
                document.body.style.background = 'url(' + bgUrl + ')';
                document.body.style.backgroundSize = 'cover';
                document.body.style.backgroundRepeat = 'no-repeat';
                document.body.style.backgroundPosition = 'center';
                document.body.style.overflow = 'hidden';
                if (characterData.buttonColor) {
                  document.documentElement.style.setProperty('--button-color', characterData.buttonColor);
                } else if (characterData.buttonColor && characterData.buttonTextColor) {
                  document.documentElement.style.setProperty('--button-color', characterData.buttonColor);
                  document.documentElement.style.setProperty('--button-text-color', characterData.buttonTextColor);
                }
                const label = document.getElementById("labelBirthdayPopup");
                var characterLANG = characterData.characterEN;
                if (navigator.language === 'ru-RU' && characterData.characterRU) {
                    characterLANG = characterData.characterRU;
                } else if (navigator.language === 'es-ES' && characterData.characterES) {
                    characterLANG = characterData.characterES;
                } else if (navigator.language === 'ja-JP' && characterData.characterJA) {
                    characterLANG = characterData.characterJA;
                }
                label.textContent = chrome.i18n.getMessage("labelBirthdayPopup") + characterLANG + "!";                  
                label.style.display = 'flex';
                var width = label.offsetWidth;
                label.addEventListener('mouseover', function() {
                    document.documentElement.style.setProperty('--width-labelBirthdayPopupHover', width)
                    label.textContent = chrome.i18n.getMessage("labelNotClickable");
                });
                label.addEventListener('mouseout', function() {            
                    label.textContent = chrome.i18n.getMessage("labelBirthdayPopup") + characterLANG + "!";
                });
            }
            })
        .catch(err => console.error(err));
      }
    });
  } else {
      buttonIds.forEach((buttonId) => {
        const buttonElement = document.getElementById(buttonId);
        buttonElement.textContent = chrome.i18n.getMessage(buttonId);
        if (buttonElement) {
          buttonElement.addEventListener('click', () => {
            const code = codeElement.value;
            const locales = navigator.language.slice(0, 2);
            let url;
            switch (buttonId) {
              case 'submitGI':
                document.body.style.backgroundImage = "url(/pictures/backgroundGI.webp)";
                url = `https://genshin.hoyoverse.com/${locales}/gift?code=${code}`;
                break;
              case 'submitHSR':
                url = `https://hsr.hoyoverse.com/gift?code=${code}`;
                document.body.style.backgroundImage = "url(/pictures/backgroundHSR.webp)";
                break;
              case 'submitZZZ':
                url = `https://zenless.hoyoverse.com/redemption?code=${code}`;
                document.body.style.backgroundImage = "url(/pictures/backgroundZZZ.webp)";
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
              case 'shareZZZ':
                url = `https://zenless.hoyoverse.com/redemption?code=${code}`;
                navigator.clipboard.writeText(url);
                displayOverlay();
                break;
              default:
                break;    
            }
            if (buttonId === 'submitGI' || buttonId === 'submitHSR' || buttonId === 'submitZZZ') {
              frame.src = url;
              frame.style.display = 'block';
              codeElement.style.display = 'none';
              document.getElementById("labelBirthdayPopup").style.display = 'none';
              effectVision = false;
              buttonIds.forEach((id) => {
                document.getElementById(id).style.display = 'none';
              });
            }
          });
        }
      });
      chrome.storage.local.get(['buttonColorMain', 'buttonTextColorMain']).then((result) => {
        if (result.buttonColorMain) {
          document.documentElement.style.setProperty('--button-color', result.buttonColorMain);
        }
        if (result.buttonTextColorMain) {
          document.documentElement.style.setProperty('--button-text-color', result.buttonTextColorMain);
        }
      });
      chrome.storage.local.get(['mainBirthdayDisable']).then((result) => {
        if (!result.mainBirthdayDisable) {     
          let today = new Date();
          let dd = String(today.getDate()).padStart(2, '0');
          let mm = String(today.getMonth() + 1).padStart(2, '0');
          today = mm + '-' + dd;
          fetch('https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/birthdays.json')
              .then(response => response.json())
              .then(birthdayData => {
                if (birthdayData[today]) {
                  let characterData = birthdayData[today];
                  let bgUrl = 'https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/backgrounds/' + characterData.character + '.webp';
                  function createEffect() {
                    const effect = document.createElement('div');
                    effect.className = 'effect';
                    let effectUrl = 'https://raw.githubusercontent.com/Kajitsy/Genshin-Star-Rail-CodeEntter/main/birthday_elements/element/' + characterData.element + '.png';
                    effect.innerHTML = '<img src="' + effectUrl + '"style="width: 30px; height: 30px;">';
                    effect.style.position = 'absolute';
                    effect.style.pointerEvents = 'none';
                    const startPositionLeft = Math.random() * window.innerWidth;
                    const duration = Math.random() * 6 + 3 + 's';
                    const delay = Math.random() * 10 + 's';
                    effect.style.left = startPositionLeft + 'px';
                    effect.style.animation = `snowfall ${duration} linear ${delay} infinite`;
                    effect.style.zIndex = 1;
                    document.body.appendChild(effect);
                    effect.addEventListener('animationiteration', () => {
                      effect.style.left = Math.random() * window.innerWidth + 'px';
                    });
                  }
                  function generateEffect() {
                    for (let i = 0; i < 10; i++) {
                      createEffect();
                    }
                  } 
                  setTimeout(function() {
                    if (characterData.element && effectVision == true) {
                      generateEffect()
                    }}, 1000)
                  document.body.style.background = 'url(' + bgUrl + ')';
                  document.body.style.backgroundSize = 'cover';
                  document.body.style.backgroundRepeat = 'no-repeat';
                  document.body.style.backgroundPosition = 'center';
                  document.body.style.overflow = 'hidden';
                  if (characterData.buttonColor) {
                    document.documentElement.style.setProperty('--button-color', characterData.buttonColor);
                  } else if (characterData.buttonColor && characterData.buttonTextColor) {
                    document.documentElement.style.setProperty('--button-color', characterData.buttonColor);
                    document.documentElement.style.setProperty('--button-text-color', characterData.buttonTextColor);
                  }
                  const label = document.getElementById("labelBirthdayPopup");
                  var characterLANG = characterData.characterEN;
                  if (navigator.language === 'ru-RU' && characterData.characterRU) {
                      characterLANG = characterData.characterRU;
                  } else if (navigator.language === 'es-ES' && characterData.characterES) {
                      characterLANG = characterData.characterES;
                  } else if (navigator.language === 'ja-JP' && characterData.characterJA) {
                      characterLANG = characterData.characterJA;
                  }
                  label.textContent = chrome.i18n.getMessage("labelBirthdayPopup") + characterLANG + "!";                  
                  label.style.display = 'flex';
                  var width = label.offsetWidth;
                  label.addEventListener('mouseover', function() {
                      document.documentElement.style.setProperty('--width-labelBirthdayPopupHover', width)
                      label.textContent = chrome.i18n.getMessage("labelNotClickable");
                  });
                  label.addEventListener('mouseout', function() {            
                      label.textContent = chrome.i18n.getMessage("labelBirthdayPopup") + characterLANG + "!";
                  });
               }
            })
          .catch(err => console.error(err));
        }
      });
  }
})
chrome.storage.local.get(['roundingDisable']).then((result) => {
  document.documentElement.style.setProperty('--border-radius', result.roundingDisable ? '10px' : '20px');
});