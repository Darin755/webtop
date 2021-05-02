postMessage({
	type: "addApp",
	startingX: 0,
	startingY: 0,
	endingX: 50,
	endingY: 50
});



postMessage({
	type: "addElem",
	elemType: "img",
	elemName: "eyes",
	parent: "eyes_div",
	x: 0,
	y: 0,
	attributes: [{name: "src", value: "apps/eyes/eyes.png"},{name: "alt", value: "eyes"},{name: "data-wm", value: true}]
});
