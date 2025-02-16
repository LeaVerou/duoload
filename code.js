function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return Array.prototype.slice.apply(document.querySelectorAll(selector));
}

var iframes = $$("iframe");
var urls = $$("input");

$("form").onsubmit = function () {
	for (let i = 0; i < 2; i++) {
		startTimer(`#timer${i + 1}`);
		let iframe = iframes[i];
		let url = urls[i].value;

		iframe.src = "about:blank";

		console.time(url + " load");

		iframe.src = url;

		iframe.onload = function () {
			console.timeEnd(url + " load");
			stopTimer(`#timer${i + 1}`);
		}
	}

	return false;
}

let timerInterval = {};

function startTimer(className) {
	let startTime = Date.now();
	let timerElement = $(className);
	if (!timerElement) {
		console.log(`Timer ${className} not found`);
		return;
	}

	timerInterval[className] = setInterval(function () {
		let elapsedTime = Date.now() - startTime;
		timerElement.textContent = (elapsedTime / 1000).toFixed(2) + "s";
	}, 100);
}

function stopTimer(className) {
	clearInterval(timerInterval[className]);
}
