postMessage({
	type: "addApp",
	startingX: 0,
	startingY: 0,
	endingX: 50,
	endingY: 200
});



postMessage({
	type: "addElem",
	elemType: "iframe",
	elemName: "taskbar",
	x: 0,
	y: 0,
	attributes: [{name: "src",value: "system/taskbar/index.html"},{name: "width", value:"100%"},{name: "height",value: "45"}]
});
