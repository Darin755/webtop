function request(name,type, other) {
		window.parent.postMessage({
    'type' : type,
    'name': name,
    'other' : other
}, "*");
}

function menu(opt) {
	var x = document.getElementById("menu");
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

function closeit(name) {
	var elm = document.getElementById(name);
	elm.remove();
}


function open(name,url,type) {
	var cmd = "";
	var num = 0;
		while(document.getElementById(name+num) != null) { //find a unused num
		num++;
	}
	name=name+num;
	
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
	
		cmd= "closeit('"+name+"')";
		ifmh.innerHTML = name+"<button type='button' class='windowButtons' Onclick="+cmd+">close</button>";
	
		ifm.appendChild(ifmh); //add header
		var ifr = document.createElement('iframe'); //iframe
		ifr.setAttribute('class','resizeable');
		ifr.setAttribute('src',url);
		ifr.setAttribute('title',name);
		ifm.appendChild(ifr); //add iframe

		dragElement(document.getElementById(name)); //make is dragable

		console.log("created window "+name);
	}
	if(type == "widget"){
		var ifm = document.createElement('div'); //div	
		ifm.setAttribute('id', name); // assign an id
		ifm.setAttribute('class','window');
		
		document.body.appendChild(ifm);	
	
		var ifmh = document.createElement('div');
		ifmh.setAttribute('id', name+"header"); // assign an id
		ifmh.setAttribute('class','windowheader');	
	
		cmd= "closeit('"+name+"')";
		ifmh.innerHTML = "<button type='button' class='windowButtons' Onclick="+cmd+">close</button>";
	
		ifm.appendChild(ifmh); //add header
		var ifr = document.createElement('iframe'); //iframe
		ifr.setAttribute('class','resizeable');
		ifr.setAttribute('src',url);
		ifr.setAttribute('title',name);
		ifm.appendChild(ifr); //add iframe

		dragElement(document.getElementById(name)); //make is dragable

		console.log("created widget "+name);
	}
	cmd = "";
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