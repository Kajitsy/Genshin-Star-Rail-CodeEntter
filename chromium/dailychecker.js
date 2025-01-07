function getCurrDay() {
	var now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
	now.setHours(now.getHours() + 8);
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}
function GIrequest() {
	var currDay = getCurrDay();
	fetch("https://sg-hk4e-api.hoyolab.com/event/sol/sign", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include",
		body: JSON.stringify({
			"act_id": "e202102251931481"
		})
	})
	.then(response => response.json())
	.then(data => {
		if (data.retcode == 0 || data.retcode == -5003) {
			console.log("GIsuccess", data);
			chrome.storage.local.set({dc_lastCheked: currDay});
			} else {
			console.log("GIwarning", data);
			chrome.storage.local.set({dc_lastCheked: currDay});
		}
	})
	.catch(error => {
		console.log("GIbadrequest", error);
	});
}
function HSRrequest() {
	var currDay = getCurrDay();
	fetch("https://sg-public-api.hoyolab.com/event/luna/os/sign", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include",
		body: JSON.stringify({
			"act_id": "e202303301540311"
		})
	})
	.then(response => response.json())
	.then(data => {
		if (data.retcode == 0 || data.retcode == -5003) {
			console.log("HSRsuccess", data);
			chrome.storage.local.set({dc_lastCheked: currDay});
		} else {
			console.log("HSRwarning", data);
			chrome.storage.local.set({dc_lastCheked: currDay});
		}
	})
	.catch(error => {
		console.log("HSRbadrequest", error);
	});
}
function ZZZrequest() {
	var currDay = getCurrDay();
	fetch("https://sg-public-api.hoyolab.com/event/luna/os/sign", {
		method : "POST",
		headers: {
			"Content-Type": "application/json",
			"X-RPC-Signgame": "zzz"
		},
		credentials: "include",
		body: JSON.stringify({
			"act_id": "e202406031448091"
		})
	})
	.then(response => response.json())
	.then(data => {
		if (data.retcode == 0 || data.retcode == -5003) {
			console.log("ZZZsuccess", data);
			chrome.storage.local.set({dc_lastCheked: currDay});
		} else {
			console.log("ZZZwarning", data);
			chrome.storage.local.set({dc_lastCheked: currDay});
		}
	})
	.catch(error => {
		console.log("ZZZbadrequest", error);
	});
}
function check() {
	chrome.storage.local.get({dc_lastCheked: null}).then(storage => {
		var currDay = getCurrDay();
		if (storage.dc_lastCheked != currDay) {
			HSRrequest();
			GIrequest();
			ZZZrequest();
		}
	});
}
chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name == "daily_checker") {
		check();
	}
});
chrome.alarms.create("daily_checker", {when: Date.now(), periodInMinutes: 1});