document.getElementById('submit').textContent = chrome.i18n.getMessage("submit");
document.getElementById('submit').addEventListener('click', function() {
  var code = document.getElementById('code').value;
  var locales = navigator.language.slice(0, 2);
  document.getElementById('frame').src = "https://genshin.hoyoverse.com/" + locales + "/gift?code=" + code;
  document.getElementById('frame').style.display = 'block';
  document.getElementById('code').style.display = 'none';
  document.getElementById('submit').style.display = 'none';
  document.getElementById('share').style.display = 'none';
  document.getElementById('options').style.display = 'none';
});
document.getElementById('share').textContent = chrome.i18n.getMessage("share");
document.getElementById('share').addEventListener('click', function() {
  var code = document.getElementById('code').value;
  var locales = navigator.language.slice(0, 2);
  var url = "https://genshin.hoyoverse.com/" + locales + "/gift?code=" + code;
  navigator.clipboard.writeText(url);
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
document.getElementById('share').addEventListener('click', function() {
  overlay.style.display = 'flex';
  setTimeout(function() {
    overlay.style.display = 'none';
  }, 2000); 
});