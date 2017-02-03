function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return Array.prototype.slice.apply(document.querySelectorAll(selector));
}

var iframes = $$("iframe");
var urls = $$("input");

$("form").onsubmit = function() {
	for (let i=0; i < 2; i++) {
		let iframe = iframes[i];
		let url = urls[i].value;

		iframe.src = "about:blank";

		console.time(url + " load");

		iframe.src = url;

		iframe.onload = function() {
			console.timeEnd(url + " load");
		}
	}

	return false;
}
