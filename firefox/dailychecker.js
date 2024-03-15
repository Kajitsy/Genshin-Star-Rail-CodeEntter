function getCurrDay() {
	var now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
	now.setHours(now.getHours() + 8);
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}
var HSRwork;
var GIwork;
function GIrequest() {
	var currDay = getCurrDay();
	fetch("https://sg-hk4e-api.hoyolab.com/event/sol/sign?act_id=e202102251931481", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	})
	.then(response => response.json())
	.then(data => {
		if (data.retcode == 0 || data.retcode == -5003) {
			console.log("GIsuccess", data);
			browser.storage.local.set({dc_lastCheked: currDay});
			GIwork = true;
			} else {
			console.log("GIwarning", data);
			browser.storage.local.set({dc_lastCheked: currDay});
			GIwork = false;
		}
	})
	.catch(error => {
		console.log("GIbadrequest", error);
		GIwork = false;
	});
}
function HSRrequest() {
	var currDay = getCurrDay();
	fetch("https://sg-public-api.hoyolab.com/event/luna/os/sign?act_id=e202303301540311", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	})
	.then(response => response.json())
	.then(data => {
		if (data.retcode == 0 || data.retcode == -5003) {
			console.log("HSRsuccess", data);
			browser.storage.local.set({dc_lastCheked: currDay});
			HSRwork = true;
		} else {
			console.log("HSRwarning", data);
			browser.storage.local.set({dc_lastCheked: currDay});
			HSRwork = false;
		}
	})
	.catch(error => {
		console.log("HSRbadrequest", error);
		HSRwork = false;
	});
}
function icon(){
	browser.storage.local.get(['iconDisable']).then(function (result) {
		if (result.iconDisable) {
			browser.browserAction.setIcon({path: "/pictures/icon.webp"});
		} else {
			if (GIwork == true && HSRwork == true) {
				browser.browserAction.setIcon({path: "/pictures/icon.webp"});
			} else if (GIwork == true && HSRwork == false) {
				browser.browserAction.setIcon({path: "/pictures/icon_warn.webp"});
			} else if (GIwork == false && HSRwork == true) {
				browser.browserAction.setIcon({path: "/pictures/icon_warn.webp"});
			} else {
				browser.browserAction.setIcon({path: "/pictures/icon_error.webp"});
			}
		}
	  })
}
function check() {
	browser.storage.local.get({dc_lastCheked: null}).then(storage => {
		var currDay = getCurrDay();
		if (storage.dc_lastCheked != currDay) {
			HSRrequest();
			GIrequest();
			setTimeout(icon, 5000);
		}
	});
}
browser.alarms.onAlarm.addListener(alarm => {
	if (alarm.name == "daily_checker") {
		check();
	}
});
browser.alarms.create("daily_checker", {when: Date.now(), periodInMinutes: 1});