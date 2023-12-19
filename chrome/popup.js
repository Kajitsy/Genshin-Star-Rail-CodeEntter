document.getElementById('submitGI').textContent = chrome.i18n.getMessage("submitGI");
document.getElementById('submitGI').addEventListener('click', function() {
  var code = document.getElementById('code').value;
  var locales = navigator.language.slice(0, 2);
  document.getElementById('frame').src = "https://genshin.hoyoverse.com/" + locales + "/gift?code=" + code;
  document.getElementById('frame').style.display = 'block';
  document.getElementById('code').style.display = 'none';
  document.getElementById('submitGI').style.display = 'none';
  document.getElementById('shareGI').style.display = 'none';
  document.getElementById('submitHSR').style.display = 'none';
  document.getElementById('shareHSR').style.display = 'none';
  document.getElementById('options').style.display = 'none';
});
document.getElementById('shareGI').textContent = chrome.i18n.getMessage("shareGI");
document.getElementById('shareGI').addEventListener('click', function() {
  var code = document.getElementById('code').value;
  var locales = navigator.language.slice(0, 2);
  var url = "https://genshin.hoyoverse.com/" + locales + "/gift?code=" + code;
  navigator.clipboard.writeText(url);
});

document.getElementById('shareHSR').textContent = chrome.i18n.getMessage("shareHSR");
document.getElementById('shareHSR').addEventListener('click', function() {
  var code = document.getElementById('code').value;
  var url = "https://hsr.hoyoverse.com/gift?code=" + code;
  navigator.clipboard.writeText(url);
});
document.getElementById('submitHSR').textContent = chrome.i18n.getMessage("submitHSR");
document.getElementById('submitHSR').addEventListener('click', function() {
  var code = document.getElementById('code').value;
  document.getElementById('frame').src = "https://hsr.hoyoverse.com/gift?code=" + code;
  document.getElementById('frame').style.display = 'block';
  document.getElementById('code').style.display = 'none';
  document.getElementById('submitGI').style.display = 'none';
  document.getElementById('shareGI').style.display = 'none';
  document.getElementById('submitHSR').style.display = 'none';
  document.getElementById('shareHSR').style.display = 'none';
  document.getElementById('options').style.display = 'none';
});
document.getElementById('options').textContent = chrome.i18n.getMessage("options");
document.getElementById('options').addEventListener('click', function() {
  window.location.href = "options.html";
  var locales = navigator.language.slice(0, 2);
});

chrome.storage.local.get(['buttonColor', 'buttonTextColor']).then(function(result) {
  if (result.buttonColor) {
    document.documentElement.style.setProperty('--button-color', result.buttonColor);
  }
  if (result.buttonTextColor) {
    document.documentElement.style.setProperty('--button-text-color', result.buttonTextColor);
  }
});
var overlay = document.createElement('div');
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
overlay.textContent = 'Ссылка скопирована';
overlay.style.display = 'none';
document.body.appendChild(overlay);
document.getElementById('shareGI').addEventListener('click', function() {
  overlay.style.display = 'flex';
  setTimeout(function() {
    overlay.style.display = 'none';
  }, 2000);
});
document.getElementById('shareHSR').addEventListener('click', function() {
  overlay.style.display = 'flex';
  setTimeout(function() {
    overlay.style.display = 'none';
  }, 2000); 
});