if (typeof browser === "undefined") {
	browser = chrome;
}

const HSRHOSTS = [
	{
		apiHost: "sg-public-api.hoyolab.com",
		page: "act.hoyolab.com/bbs/event/signin/hkrpg/index.html"
	}
];
var currentHSRHosts = HSRHOSTS;

function getCurrDay() {
	var now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
	now.setHours(now.getHours() + 8);
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}

function request(i, currDay) {
	var host = currentHSRHosts[i];
	if (typeof host === "undefined") {
		currentHSRHosts = HSRHOSTS;
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
			browser.storage.local.set({hsr_lastCheked:  currDay});
			currentHSRHosts = [host];
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
	browser.storage.local.get({hsr_lastCheked: null}).then(storage => {
		var currDay = getCurrDay();
		if (storage.hsr_lastCheked != currDay) {
			request(0, currDay);
		}
	});
}

browser.alarms.onAlarm.addListener(alarm => {
	if (alarm.name == "hsr_checker") {
		check();
	}
});

browser.alarms.create("hsr_checker", {when: Date.now(), periodInMinutes: 1});