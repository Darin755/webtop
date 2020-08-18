

function open(name,url) {
	var num = 0;
	var ifm = document.createElement('div'); //div
	while(document.getElementById(name+num) != null) { //find a unused num
		num++;
	}
	name=name+num;	
	ifm.setAttribute('id', name); // assign an id
	ifm.setAttribute('class','window');
document.body.appendChild(ifm);	
	
	var num = 0;
	var ifmh = document.createElement('div');
	ifmh.setAttribute('id', name+"header"); // assign an id
	ifmh.setAttribute('class','windowheader');	
	
	ifmh.innerHTML = name;
	
	ifm.appendChild(ifmh); //add header
	var ifr = document.createElement('iframe'); //iframe
	ifr.setAttribute('class','resizeable');
	ifr.setAttribute('src',url);
	ifr.setAttribute('title',name);
	ifm.appendChild(ifr); //add iframe

	dragElement(document.getElementById(name)); //make is dragable

	console.log("created window "+name);
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