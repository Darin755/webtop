
function menu(name,url,opt) {
	if(name == "closeall"){
		var slides = document.getElementsByClassName("hmenu");
		for (var i = 0; i < slides.length; i++) {
  			slides.item(i).style.display = "none";
		}
	} else {
		if(document.getElementById(url) == null){
			var x= newMenu(name,url);
			x.style.display = "block";
		}else{
			var x = document.getElementById(url);
			if(opt == "auto"){
 	 			if (x.style.display === "none") {
   	 			x.style.display = "block";
  				} else {
 	   			x.style.display = "none";
 	 			}
 			}
 			if(opt == "open"){
 				x.style.display = "block";
 			}
 			if(opt == "close"){
 				x.style.display = "none";
 			}
		}	
	}
}

function newMenu(name,url) {
	var frame = document.createElement('iframe');
	frame.setAttribute('class','hmenu');
	frame.setAttribute('id',url);
	frame.setAttribute('src',url);
	frame.setAttribute('name',name);
	document.body.appendChild(frame);
	console.log("created menu "+name);
	return frame;
}

function closeit(name) {
	var elm = document.getElementById(name);
	elm.remove();
}

function itclose(name) {
	request(name,"close");	
}

function reload(name){
	document.getElementById(name+"-iframe").src = document.getElementById(name+"-iframe").src;
}

function findName(name) {
	var num = 0;
	while(document.getElementById(name+num) != null) { //find a unused num
		num++;
	}
	return name+num;
}

function open(name,url,type) {
	menu("closeall");
	var cmd = "";
	name = findName(name);		
	
	if(type == "window") {
		var ifm = document.createElement('div'); //div	
		ifm.setAttribute('id', name); // assign an id
		ifm.setAttribute('class','window');
		cmd = "request('"+name+"','top','')";	
		ifm.setAttribute('onmousedown',cmd);
		document.body.appendChild(ifm);	
		var ifmh = document.createElement('div');
		ifmh.setAttribute('id', name+"header"); // assign an id
		ifmh.setAttribute('class','windowheader');	
	
		cmd= "itclose('"+name+"')";
		ifmh.innerHTML = name+"<button type='button' class='windowButtons' Onclick="+cmd+">close</button>";
		cmd = "reload('"+name+"')";
		ifmh.innerHTML = ifmh.innerHTML+"<button type='button' class='windowButtons' Onclick="+cmd+">reload</button>";		
		
		ifm.appendChild(ifmh); //add header
		var ifr = document.createElement('iframe'); //iframe
		ifr.setAttribute('class','resizeable');
		ifr.setAttribute('id',name+"-iframe");
		ifr.setAttribute('src',url);
		ifr.setAttribute('title',name);
		ifr.setAttribute('width',600);
		ifr.setAttribute('height',400);
		ifm.appendChild(ifr); //add iframe

		dragElement(document.getElementById(name)); //make is dragable

		console.log("created window "+name);

		return name;		
		
	}
	if(type == "widget"){
		var ifm = document.createElement('div'); //div	
		ifm.setAttribute('id', name); // assign an id
		ifm.setAttribute('class','window');
		
		document.body.appendChild(ifm);	
	
		var ifmh = document.createElement('div');
		ifmh.setAttribute('id', name+"header"); // assign an id
		ifmh.setAttribute('class','windowheader');	
		
		if(type == "widget"){
			cmd= "closeit('"+name+"')";
			ifmh.innerHTML = "<button type='button' class='windowButtons' Onclick="+cmd+">close</button>";
		}
	
		ifm.appendChild(ifmh); //add header
		var ifr = document.createElement('iframe'); //iframe
		ifr.setAttribute('class','resizeable');
		ifr.setAttribute('src',url);
		ifr.setAttribute('title',name);
		ifm.appendChild(ifr); //add iframe

		dragElement(document.getElementById(name)); //make is dragable

		console.log("created widget "+name);
	}
	return name;
}

function requestDocklet(name,url,width) {
window.frames['taskbar'].postMessage({
    'type' : 'docklet',
    'name': name,
    'url' : url,
    'width' : width
}, "*");
}



function reload(name){
	document.getElementById(name+"-iframe").src = document.getElementById(name+"-iframe").src;
}



//taken from https://www.w3schools.com/howto/howto_js_draggable.asp

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    /* if present, the header is where you move the DIV from:*/
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    /* otherwise, move the DIV from anywhere inside the DIV:*/
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    /* stop moving when mouse button is released:*/
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
