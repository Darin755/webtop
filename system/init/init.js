var proc = [];
var registered = {};
var customCommands = {};

function init() {
	if (window.Worker) {
		proc[0] = window;
		registered["init"] = 0;
		
		window.addEventListener("message", (event) => {
			if (event.data.data.type == "reload") {
				location.reload();
			} else if (event.data.data.type == "fullscreen") {
				document.documentElement.requestFullscreen();
			} else if (event.data.data.type == "stop") {
				window.stop();			
			} else if (event.data.data.type == "start") {
				startProcess(event.data.data.path);
			} else if(event.data.data.type == "stop") {
				stopProcess(event.data.data.pid);
			}
		}, false);
		return true;
	} else {
		return false;	
	}
}

function registerCommand(name,handle) {
	if (typeof(handle) == "function") {
		customCommands[name] = handle;
	}
}

function startProcess(path) {
	var worker = new Worker(path);
	worker.onmessage = function(event) {handler(event);};
	proc[proc.length] = worker;
}

function stopProcess(pid) {
	proc[pid].terminate;
	proc.splice(pid,1);
}


function handler(event) {	
	var data = event.data;
	if (data.type == "sendTo") {
		if (proc[data.dest] != undefined) {
			proc[data.dest].postMessage({
				type: "incoming",
				data: data.data,		
				sender: event.source,
				dest: data.dest	
			});
		postResponse(event,"sendTo",0,"none");
		} else {
		postResponse(event,"sendTo",1,"notFound");	
		}
	}else if(data.type == "requestName") {
		if(registered[data.name != undefined]) {
			registered[data.name] = pid;
			postResponse(event,"requestName",0,"none");
		} else {
			postResponse(event,"RequestName",1,"nameTaken");
		}
	} else if (data.type == "getPid") {
		postResponse(event,"getPid",registered[data.name]);
	} else if(typeof(customCommands[data.type]) == "function") {
		customCommands[data.type](event);
	} else {
		postResponse(event,"unknownCommand",1,"notFound");
	}
	

}

function postResponse(event,type,outcome,problem) {
	event.source.postMessage({
		type: "response",
		request: type,
		outcome: outcome,
		problem: problem	
	});
}