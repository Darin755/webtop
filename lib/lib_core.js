
var externalCommand = {};
var externalCommandNames = [];

window.onmessage = (event) => {
	for (var i = 0;i<=externalCommandNames.length-1;i++) {
		if(externalCommandNames[i] == event.data.type) {
			externalCommand[externalCommandNames[i]](event);
		}
	}
}

function setupPID(name) {	
	window.top.postMessage({
	type: "request_id",
	status: 0,
	as: name
	}, '*');
}


function addCommand(name,run) {
	externalCommand[name] = run;
	externalCommandNames.unshift(name);
}
