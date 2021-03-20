var screen = [];

function initScreen() {
	var srn = document.createElement("DIV");
	srn.setAttribute("id","screen");
	document.body.appendChild(srn);
	registerCommand("addApp",function (event) {
		addApplication(event.data.startingX,event.data.startingY,event.data.endingX,event.data.endingY,event.source);	
	
	});
	registerCommand("addElem", function (event) {
		addElement(event.source, event.data.elemType, event.data.x, event.data.y, event.data.attributes);	
	
	});
}

function addApplication(startingX, startingY, endingX, endingY, source) {
var space = {
	source: source,
	startingX: startingX,
	startingY: startingY,
	endingX: endingX,
	endingY: endingY,
	elements: [] 
	
	}
	screen.push(space);
}

function addElement(source, elementType, x, y, attibutes) {
	for(var i = 0;i<screen.length;i++) {
		if(screen[i].source == source) {
			if(screen[i].startingX<=x&&screen[i].startingY<=y&&screen[i].endingX>=x&&screen[i].endingY>=y) {
				screen[i].elements.push(createElem(elementType, x, y, attibutes));	
				break;
			}	else {
				//bad
				return -2;			
			}		
		} else {
			return -1;
		}
	}
	
}

function  createElem(type, x, y, attributes) {
	var elem = document.createElement(type);
	for (var i = 0;i<attributes.length;i++) {
		elem.setAttribute(attributes[i].name,attributes[i].value);
	}	
	elem.style.position = "fixed";
	elem.style.left = x;
	elem.style.top = y;
	document.getElementById("screen").appendChild(elem);
	return elem;
}
