// Snow generation
// Add "<script src="popup.js"></script>" to popup.js to enable snow
if (typeof browser === "undefined") {
	browser = chrome;
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
// Remove this if you don't want to write a customization for it in the settings
  browser.storage.local.get(['snowDisable']).then(function (result) {
    if (result.snowDisable){
      console.log("Snow Disable");
    } else {
      console.log("Snow Enable");
      generateSnowfall();
      }
  })