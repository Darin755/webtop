var i = 0;

function timedCount() {
	if (i > 9) {
		i = 0;
	}	
  i = i + 1;
  postMessage({
	type: "show",
	data: i
  });
  setTimeout("timedCount()",500);
}

timedCount();