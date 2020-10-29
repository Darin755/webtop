var wins = [];

if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    var data = event.data;
    
    if(data.type == "window") {
    	wins.unshift(open(data.name,data.other,"window"));
    	updateTaskbar();
    }
    
    if(data.type == "close") {
    	closeit(data.name);
    	removeWin(data.name);
    	updateTaskbar();
    	console.log("closed "+data.name);
    }
    
    if(data.type == "widget") {
    	open(data.name,data.other,"widget");
    }

    if(data.type == "top") {
		if(wins[0] != data.name){
			winTop(data.name);
			
		}   	
    	
    }
    
	if(data.type == "menu") {
		menu(data.name,data.other,data.other2);
	} 
	
	if(data.type == "docklet") {
		requestDocklet(data.name,data.other,data.other2);
	} 
	
	if(data.type == "fullscreen") {
		document.documentElement.requestFullscreen();
		console.log("going fullscreen");
	}
}

function removeWin(name) { 
	for(var i = 0;i<=wins.length-1;i++){
		if(wins[i] == name){
			wins.splice(i,1);	
		}	
	
	}
}

function winTop(name){
	removeWin(name);
	wins.unshift(name);
	for(var i = 0;i<=wins.length-1;i++){
		document.getElementById(wins[i]).style.zIndex = (wins.length-1) - i;
	}
	updateTaskbar();
}

function updateTaskbar() {
window.frames['taskbar'].postMessage({
    'type' : 'updateTaskbar',
    'name': getWindows(),
}, "*");	
}

function getWindows() {
	str=" ";
	for(var i = 0;i<=wins.length-1;i++){
		str=str+wins[i]+" ";
	}
	return str;	
}