

var timeout = 30*1000;

function reload() {
	window.location.reload(true);
	setTimeout(reload, timeout);
}

setTimeout(reload, timeout);
