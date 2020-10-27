function request(name,type, other,other2) {
		window.parent.postMessage({
    'type' : type,
    'name': name,
    'other' : other,
    'other2' : other2,
}, "*");
}


