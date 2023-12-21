const HSRHOSTS = [
	{
		apiHost: "sg-public-api.hoyolab.com",
		page: "act.hoyolab.com/bbs/event/signin/hkrpg/index.html"
	}
];

var currentHosts = HSRHOSTS;

chrome.runtime.onInstalled.addListener(() => {
	chrome.alarms.create("hsr_checker", {when: Date.now(), periodInMinutes: 1});
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
		currentHosts = HSRHOSTS;
		return;
	}
	fetch("https://" + host.apiHost + "/event/luna/os/sign", {
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
		if(data.retcode == 0 || data.retcode == -5003) {
			chrome.storage.local.set({hsr_lastCheked:  currDay});
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
	chrome.storage.local.get({hsr_lastCheked: null}).then(storage => {
		var currDay = getCurrDay();
		if (storage.hsr_lastCheked != currDay) {
			request(0, currDay);
		}
	});
}

chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name == "hsr_checker") {
		check();
	}
});