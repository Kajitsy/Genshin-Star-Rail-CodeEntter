const HSRHOSTS = [
	{
		apiHost: "sg-public-api.hoyolab.com",
		page: "act.hoyolab.com/bbs/event/signin/hkrpg/index.html"
	}
];
const HOSTS = [
	{
		apiHost: "sg-hk4e-api.hoyolab.com",
		page: "act.hoyolab.com/ys/event/signin-sea-v3/index.html"
	},
	{
		apiHost: "hk4e-api-os.mihoyo.com",
		page: "webstatic-sea.mihoyo.com/ys/event/signin-sea/index.html"
	}
];
var currentHSRHosts = HSRHOSTS;
var currentHosts = HOSTS;
var dcwork;
function getCurrDay() {
	var now = new Date();
	now.setMinutes(now.getMinutes() + now.getTimezoneOffset());
	now.setHours(now.getHours() + 8);
	return Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
}
function request(i, currDay) {
	var host = currentHosts[i];
	if (typeof host === "undefined") {
		currentHosts = HOSTS;
		return;
	}
	var hsrhost = currentHSRHosts[i];
	if (typeof hsrhost === "undefined") {
		currentHSRHosts = HSRHOSTS;
		return;
	}
	fetch("https://" + host.apiHost + "/event/sol/sign?act_id=e202102251931481", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	})
	fetch("https://" + hsrhost.apiHost + "/event/luna/os/sign?act_id=e202303301540311", {
		method : "POST",
		headers: {
			"Content-Type": "application/json"
		},
		credentials: "include"
	})
	.then(response => response.json())
	.then(data => {
		if(data.retcode == 0 || data.retcode == -5003) {
			chrome.storage.local.set({dc_lastCheked:  currDay});
			dcwork = true;
			currentHosts = [host];
			currentHSRHosts = [hsrhost];
			console.log("success", data);
		} else if(data.retcode == -10002) {
			dcwork = false;
			console.log("badrequest", data);
			request(i + 1);
		} else {
			console.log("warning", data);
			request(i + 1);
		}
	})
	.catch(error => {
		dcwork = false;
		console.log("error", error);
		request(i + 1);
	});
}

function check() {
	chrome.storage.local.get({dc_lastCheked: null}).then(storage => {
		var currDay = getCurrDay();
		if (storage.dc_lastCheked != currDay) {
			request(0, currDay);
		}
	});
}

chrome.alarms.onAlarm.addListener(alarm => {
	if (alarm.name == "daily_checker") {
		check();
	}
});

chrome.alarms.create("daily_checker", {when: Date.now(), periodInMinutes: 1});