var registered = {};
var registeredNames = [];
var externalCommand = {};
var externalCommandNames = [];

window.onmessage = (event) => {
cleanRegistered(); //clean
var frames = document.getElementsByTagName('iframe');
for (var i = 0; i < frames.length; i++) {
	if (frames[i].contentWindow === event.source) { //find html element
   	var elem = frames[i];
      break;
    }
}	 
	

	 if(event.data.type == "request_id"){
		var pid = Math.round(Math.random()*1000000000);	 	
	 	for(var i = 0;document.getElementById(pid) != undefined&&i<1000;i++) { //random pid
	 		pid = Math.round(Math.random()*1000000000);	 
	 	}
	 	
	 	if (document.getElementById(pid) != undefined) { //panic
	 		console.log("Unable to find available pid!! reloading after 2 seconds");
	 		window.setTimeout(panic, 2000);
	 	}
	 	
      elem.setAttribute('id',""+pid); //set pid
 	
	 	//check
	 	if(event.data.as != undefined) {
	 		if (registered[event.data.as] == undefined) {
	 			registered[event.data.as] = pid; //register it
	 			registeredNames.unshift(event.data.as);
	 			elem.setAttribute('name',event.data.as);
			} else {
				sendError(event.data,"name_taken");			
			}
		}
		

		
		window.event.source.postMessage({
		type: "new_pid",
		data: pid //send new pid
		}, '*');


	} else if(event.data.type == "sendTo") { //inter communication
		var d = event.data;
		if(registered[d.dest] != undefined || document.getElementById(d.dest) != null) {
			d.registeredOrigin == null;
			for (var i = 0;i<=registeredNames.length-1;i++) {
				if (registered[registeredNames[i]] == elem.id) {
					d.registeredOrigin = registeredNames[i];
				}
			}
		
			if(d.isName == true) { //by name
				document.getElementById(registered[d.dest]).contentWindow.postMessage(d, '*');
			} else { //by id
				document.getElementById(d.dest).contentWindow.postMessage(d, '*');
			}
		} else {
				sendError(d,"not_found");	
		}
			
	} else {
		for (var i = 0;i<=externalCommandNames.length-1;i++) {
			if(externalCommandNames[i] == event.data.type) {
				externalCommand[externalCommandNames[i]](event);
			}
		}
	}
}

function cleanRegistered() { ///remove unused
for (var i = 0;i<=registeredNames.length-1;i++) {
	if(document.getElementById(registered[registeredNames[i]]) == null){
		registered[registeredNames[i]] = undefined;
		registeredNames.splice(i,1);
		
	}
}
}

function panic() {
location.reload();
}

function sendError(data,problem) {
window.event.source.postMessage({
type: "error",
data: data.type, //send error
problem: problem
}, '*');
}

function addCommand(name,run) {
	externalCommand[name] = run;
	externalCommandNames.unshift(name);
}


console.log("loaded");
