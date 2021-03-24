var screen = [];

function initScreen() {
	var srn = document.createElement("DIV");
	srn.setAttribute("id","screen");
	document.body.appendChild(srn);
	registerCommand("addApp",function (event) {
		addApp(event.data.startingX,event.data.startingY,event.data.endingX,event.data.endingY,event.source);	
	
	});
	registerCommand("addElem", function (event) {
		addElement(event.source, event.data.elemType, event.data.elemName, event.data.x, event.data.y, event.data.attributes);	
	});
	registerCommand("delElem", function(event){
		delElem(event.source, event.data.elemName);
	}); 
}

function addApp(startingX, startingY, endingX, endingY, source) {
var space = {
	source: source,
	startingX: startingX,
	startingY: startingY,
	endingX: endingX,
	endingY: endingY,
	elements: [] 
	
	}
	screen[screen.length] = space;
}

function delElem(source, elemName) {
	for(var i = 0;i<screen.length;i++) {
		if(source == screen[i].source) {

				for(var k = 0;k<screen[i].elements.length;k++) {
					if(screen[i].elements[k].name == elemName) {
						screen[i].elements[k].remove();
						screen[i].elements.splice(k,1);
					}
				}
				
		}
	}
}

function removeApp(source) {
	for(var i = 0;i<screen.length;i++) {
		if(screen[i].source == source) {
			for(var k = 0;k<screen[i].elements.length;k++) {
				screen[i].elements[k].remove();
			}
			screen.splice(i,1);
			break;
		}
	}
}

function addElement(source, elementType, name, x, y, attibutes) {
	for(var i = 0;i<screen.length;i++) {
		if(screen[i].source == source) {
			if(screen[i].startingX<=x&&screen[i].startingY<=y&&screen[i].endingX>=x&&screen[i].endingY>=y) {
				screen[i].elements[screen[i].elements.length] = createElem(elementType, name, x, y, attibutes);	
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

function  createElem(type, name, x, y, attributes) {
	var elem = document.createElement(type);
	for (var i = 0;i<attributes.length;i++) {
		elem.setAttribute(attributes[i].name,attributes[i].value);
	}
	elem.setAttribute("name",name);
	elem.style.position = "fixed";
	elem.style.left = x;
	elem.style.top = y;
	elem.setAttribute("id",newId());
	document.getElementById("screen").appendChild(elem);
	return elem;
}

function newId() {
	var i = 0;
	while(document.getElementById("elem"+i)!= undefined) {
		i++;
	}
	return "elem"+i;
}
