var screen = [];

function initScreen() {
	var srn = document.createElement("DIV");
	srn.setAttribute("name", "screen");
	srn.setAttribute("id","screen");
	document.body.appendChild(srn);
	registerCommand("addApp",function (event) {
		addApp(event.data.startingX,event.data.startingY,event.data.endingX,event.data.endingY,event.source);

	});
	registerCommand("addElem", function (event) {
		addElement(event.source, event.data.elemType, event.data.elemName, event.data.parent, event.data.x, event.data.y, event.data.attributes);
	});
	registerCommand("delElem", function(event){
		delElem(event.source, event.data.elemName);
	});
	registerCommand("modElem", function(event) {
		modElement(event.source, event.data.name, event.data.parent, event.data.attributes);
	});


}

function addApp(startingX, startingY, endingX, endingY, source) {
var space = {
	source: source,
	startingX: startingX,
	startingY: startingY,
	endingX: endingX,
	endingY: endingY,
	elements: [],
	wins: []

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
			for(var w = 0;w<screen[i].wins.length;w++) {
				screen[i].wins[w].close();
			}
			screen.splice(i,1);
			break;
		}
	}
}

function addElement(source, elementType, name, parent, x, y, attibutes) {
	for(var i = 0;i<screen.length;i++) {
		if(screen[i].source == source) {
			if(screen[i].startingX<=x&&screen[i].startingY<=y&&screen[i].endingX>=x&&screen[i].endingY>=y) {
				screen[i].elements[screen[i].elements.length] = createElem(elementType, name, x, y, attibutes, i, parent);
			}	else {
				//bad
				return -2;
			}
		} else {
			return -1;
		}
	}

}

function  createElem(type, name, x, y, attributes, index, parent) {
	var elem = document.createElement(type);
	for (var i = 0;i<attributes.length;i++) {
		elem.setAttribute(attributes[i].name,attributes[i].value);
	}
	elem.setAttribute("name",name);
	elem.style.position = "fixed";
	elem.style.left = x;
	elem.style.top = y;
	elem.setAttribute("id",newId());

	var attached = false;

	if(parent != "screen") {
		for(var i = 0;i<screen[index].elements.length;i++) {
			if(screen[index].elements[i].getAttribute("name") == parent) {
				screen[index].elements[i].appendChild(elem);
				attached = true;
				break;
			}
		}
	} else {
		document.getElementById("screen").appendChild(elem);
		attached = true;
	}

	if(attached == false) {
		document.getElementById("screen").appendChild(elem);
	}

  if(elem.getAttribute("data-wm") == "true") {
		var win = WinBox.new({
			title: elem.name,
			mount: elem,
			id: elem.id + "-window",
			root: document.getElementById("screen"),
			x: "center",
			y: "center",
			onclose: function() {
				for(var i = 0;screen[index].wins.length;i++) {
					if(screen[index].wins[i] == win) {
						screen[index].wins.splice(i,1);
						delElem(screen[index].source,elem.name);
						break;
					}
				}
			}
		});
		screen[index].wins[screen[index].wins.length] = win;

	}

	return elem;
}

function modElement(source, elemName, parent, attributes) {
	for(var i = 0;i<screen.length;i++) {
		if(screen[i].source == source) {
			for(var k = 0;k<screen[i].elements.length;k++) {
				if(screen[i].elements[k].getAttribute("name") == elemName) {

					for (var w = 0;w<attributes.length;w++) {
						if(attributes[w].name != "left" && attributes[w].name != "top") {
							screen[i].elements[k].setAttribute(attributes[w].name,attributes[w].value);
						}
					}

						for(var e = 0;e<screen[i].elements.length;e++) {
							if(screen[i].elements[e].getAttribute("name") == parent) {
								screen[i].elements[e].appendChild(screen[i].elements[k]);
								break;
							} else {
								document.getElementById("screen").appendChild(screen[i].elements[k]);
							}
						}

					break;
				}
			}
		}
	}
}

function newId() {
	var i = 0;
	while(document.getElementById("elem"+i)!= undefined) {
		i++;
	}
	return "elem"+i;
}
