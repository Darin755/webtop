function request(name,type, other,other2) {
		window.parent.postMessage({
    'type' : type,
    'name': name,
    'other' : other,
    'other2' : other2,
}, "*");
}

function requestDocklet(name,url,width) {
window.frames['taskbar'].postMessage({
    'type' : 'docklet',
    'name': name,
    'url' : url,
    'width' : width
}, "*");
}

function closeit(name) {
	var elm = document.getElementById(name);
	elm.remove();
}

function reload(name){
	document.getElementById(name+"-iframe").src = document.getElementById(name+"-iframe").src;
}
