const GIHOSTS = [
	{
		apiHost: "sg-hk4e-api.hoyolab.com",
		page: "act.hoyolab.com/ys/event/signin-sea-v3/index.html"
	},
	{
		apiHost: "hk4e-api-os.mihoyo.com",
		page: "webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html"
	}
];

var currentHosts = GIHOSTS;

chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.create("gi_checker", {when: Date.now(), periodInMinutes: 1});
});

function getCurrDay() {
	var now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
	now.setHours(now.getHours() + 8);
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function request(i, currDay) {
	var host = currentHosts[i];
	if (typeof host === "undefined") {
		currentHosts = GIHOSTS;
		return;
	}
	fetch("https://" + host.apiHost + "/event/sol/sign?act_id=e202102251931481", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	})
	.then(response => response.json())
	.then(data => {
		if(data.retcode == 0 || data.retcode == -5003) {
			chrome.storage.local.set({gi_lastCheked:  currDay});
			currentHosts = [host];
		} else {
			console.log("badrequest", data);
			request(i + 1);
		}
	})
	.catch(error => {
		console.log("error", error);
		request(i + 1);
	});
}

function check() {
	chrome.storage.local.get({gi_lastCheked: null}).then(storage => {
		var currDay = getCurrDay();
		if (storage.gi_lastCheked != currDay) {
			request(0, currDay);
		}
	});
}

chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name == "gi_checker") {
		check();
	}
});