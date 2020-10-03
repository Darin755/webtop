function newDocklet(name,url,width) {
	name = findName(name);
	
	var frame = document.createElement('iframe');
	frame.setAttribute('class','docklets');
	frame.setAttribute('id',name);
	frame.setAttribute('src',url);
	frame.setAttribute('height','37');
	if(width<222){
		frame.setAttribute('width',width)
		
	}else {
		return "width too long"		
	}
	document.getElementById("docklet_holder").appendChild(frame);
	console.log("created docklet "+name);
}

function findName(name) {
	var num = 0;
	while(document.getElementById(name+num) != null) { //find a unused num
		num++;
	}
	return name+num;
}