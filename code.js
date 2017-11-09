function $(selector) {
	return document.querySelector(selector);
}

function $$(selector) {
	return Array.prototype.slice.apply(document.querySelectorAll(selector));
}

var iframes = $$("iframe");
var urls = $$("input");

function resizeIframe () {
	const screenSizeOption =  this.value
	const targetIframe = parseInt(this.dataset.targetIframe);
	let screenSizeValue = []
	
	if (screenSizeOption === 'auto') {
		screenSizeValue = ['100%', '100%'];
	} else {
		screenSizeValue = this.value.split('x').map(val => `${val}px`);
	}
	
	iframes[targetIframe].style.width = screenSizeValue[0];
	iframes[targetIframe].style.height = screenSizeValue[1];
}

$$(".device_select").forEach(el => el.addEventListener('change', resizeIframe))

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
