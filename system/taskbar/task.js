var ontop = "";
var z = 0;
if (window.addEventListener) {
    window.addEventListener("message", onMessage, false);        
} 
else if (window.attachEvent) {
    window.attachEvent("onmessage", onMessage, false);
}

function onMessage(event) {
    var data = event.data;
    
    if(data.type == "window") {
    	open(data.name,data.other,"window");
    }
    
    if(data.type == "close") {
    	closeit(data.name);
    	
    }
    
    if(data.type == "widget") {
    	open(data.name,data.other,"widget");
    }

    if(data.type == "top") {
		if(ontop != data.name){
			z++;
			document.getElementById(data.name).style.zIndex = z;
			ontop = data.name;
			z = document.getElementById(data.name).style.zIndex;
			
		}   	
    	
    }
    
	if(data.type == "menu") {
		menu(data.other);
	} 
	
		if(data.type == "gig") {
			requestGig(data.name,data.other,data.other2);

	} 

}







