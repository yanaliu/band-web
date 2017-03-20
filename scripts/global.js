function addLoadEvent(func) {
	var oldonload = window.onload;
	if(typeof window.onload != "function") {
		window.onload = func;
	} else {
		window.onload = function() {
			oldonload();
			func();
		}
	}
}

function insertAfter(newElement, targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild = targetElement) {
		parent.appendChild(newElement);
	} else {
		parent.insertBefore(newElement, targetElement.nextSibling);
	}
}

function addClass(element, value) {
	if(!element.className) {
		element.className = value;
	} else {
		var newClassName = element.className;
		newClassName += " ";
		newClassName += value;
		element.className = newClassName;
	}
}

function highlightPage() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var headers = document.getElementsByTagName("header");
	if(headers.length == 0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;

	var links = navs[0].getElementsByTagName("a");
	var linkurl;
	for(var i = 0; i < links.length; i++) {
		linkurl = links[i].getAttribute("href");
		if(window.location.href.indexOf(linkurl) != -1) {
			links[i].className = "here";
			var linktext = links[i].lastChild.nodeValue.toLowerCase();
			document.body.setAttribute("id", linktext);
		}
	}
}



function moveElement(elementID,final_x,final_y,interval){
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
    var elem = document.getElementById(elementID);
    if( !elem.style.left) {elem.style.left = 0;}
    if( !elem.style.top) {elem.style.top = 0;}
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    var dist;
    if(elem.movement) { clearTimeout(elem.movement)}; 
    if( xpos == final_x && ypos == final_y ){
        return true;
    }
    if( xpos < final_x){
        dist = Math.ceil((final_x - xpos)/10);
        xpos = xpos + dist;
    }
    if( xpos > final_x){
        dist = Math.ceil((xpos - final_x)/10);
        xpos = xpos - dist;
    }
    if( ypos < final_y){
        dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos + dist;
    }
    if( ypos > final_y){
        dist = Math.ceil((final_y - ypos)/10);
        ypos = ypos - dist;
    }
    elem.style.left = xpos +'px';
    elem.style.top = ypos +'px';
    var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
    elem.movement = setTimeout(repeat,interval);
}

function prepareSlideshow() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro = document.getElementById("intro");
	var slideshow = document.createElement("div");
	slideshow.setAttribute("id", "slideshow");
	var preview = document.createElement("img");
	preview.setAttribute("src", "images/4.jpg");
	preview.setAttribute("alt", "preview");
	preview.setAttribute("id", "preview");
	slideshow.appendChild(preview);
	insertAfter(slideshow, intro);

	var links = document.getElementsByTagName("a");
	var destination;
	for(var i = 0; i < links.length; i++) {
		links[i].onmouseover = function() {
			destination = this.getAttribute("href");
			if(destination.indexOf("index.html") != -1) {
				moveElement("preview", 0, 0, 5);
			}
			if(destination.indexOf("about.html") != -1) {
				moveElement("preview", -150, 0, 5);
			}
			if(destination.indexOf("photos.html") != -1) {
				moveElement("preview", -300, 0, 5);
			}
			if(destination.indexOf("live.html") != -1) {
				moveElement("preview", -450, 0, 5);
			}if(destination.indexOf("contact.html") != -1) {
				moveElement("preview", -600, 0, 5);
			}
		}
	}
}



function showSection(id) {
	var sections = document.getElementsByTagName("section");
	for(var i = 0; i < sections.length; i++) {
		if(sections[i].getAttribute("id") != id) {
			sections[i].style.display = "none";
		} else {
			sections[i].style.display = "block";
		}
	}
}

function prepareInternalnav() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles = document.getElementsByTagName("article");
	if(articles.length == 0) return false;
	var navs = articles[0].getElementsByTagName("nav");
	if(navs.length == 0) return false;
	var nav = navs[0];
	var links = nav.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		var sectionId = links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionId)) continue;
		document.getElementById(sectionId).style.display = "none";
		links[i].destination = sectionId;
		links[i].onclick = function() {
			showSection(this.destination);
			return false;
		}
	}
} 
 


function showPic(whichPic) {
	if(!document.getElementById("placeholder")) return false;
	var source = whichPic.getAttribute("href");
	var placeholder = document.getElementById("placeholder");
	placeholder.setAttribute("src", source);
	if(document.getElementById("description")) {
		if(whichPic.getAttribute("title")) {
			var text = whichPic.getAttribute("title");
		} else {
			var text = "";
		}
		
		var description = document.getElementById("description");
		description.firstChild.nodeValue = text;
	}
	return true;
}

function prepareGallery() {
	if(!document.getElementById || !document.getElementsByTagName) return false;
	if(!document.getElementById("imagegallery")) return false;
	var gallery = document.getElementById("imagegallery");
	var links = gallery.getElementsByTagName("a");
	for(var i = 0; i < links.length; i++) {
		links[i].onclick = function() {
			return !showPic(this);
		}
	}
}

function preparePlaceholder(){
    if( !document.getElementById) return false;
    if( !document.getElementsByTagName ) return false;
    if( !document.getElementById('imagegallery')) return false;
    var placeholder = document.createElement('img');
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src','images/5.png');
    var description = document.createElement('p');
    description.setAttribute('id','description');
    var text = document.createTextNode('choose an image');
    description.appendChild(text);
    var imagegallery= document.getElementById('imagegallery');
    insertAfter(description,imagegallery);
    insertAfter(placeholder,description);
}



function stripeTables(){
    var tables = document.getElementsByTagName('table');
    for(var i=0;i<tables.length;i++){
        var rows = tables[i].getElementsByTagName('tr');
        var odd = false;
        for(var j=0;j<rows.length;j++){
            if( odd == false ){
                odd = true;
            }else{
                addClass(rows[j],'odd');
                odd = false;
            }
        }
    }
}

function highlightRows(){
    var tables = document.getElementsByTagName('table');
    for(var i=0;i<tables.length;i++){
        var rows = tables[i].getElementsByTagName('tr');
        for(var j=0;j<rows.length;j++){
            rows[j].oldClassname = rows[j].className;
            rows[j].onmouseover = function(){
                 addClass(this,'highlight');
            }
            rows[j].onmouseout = function(){
                this.className = this.oldClassname;
            }
        }
    }
}

function displayAbbreviations(){
    if( !document.getElementsByTagName('abbr')) return false;
    var defs = new Array();
    var abbrs = document.getElementsByTagName('abbr');
    if( abbrs.length ==0) return false;
    for(var i=0;i<abbrs.length;i++){
        if( abbrs[i].childNodes.length <1) continue;
        var key = abbrs[i].firstChild.nodeValue;
        var definition = abbrs[i].getAttribute('title');
        defs[key] = definition;
    }
    var dlist = document.createElement('dl');
    for(var key in defs){
        var dtitle = document.createElement('dt');
        var dtitle_text = document.createTextNode(key);
        dtitle.appendChild(dtitle_text);
        var ddtitle = document.createElement('dd');
        var definition = defs[key];
        var ddtitle_text = document.createTextNode(definition);
        ddtitle.appendChild(ddtitle_text);
        dlist.appendChild(dtitle);
        dlist.appendChild(ddtitle);        
    }
    var header = document.createElement('h3');
    var header_text = document.createTextNode('Abbreviations');
    header.appendChild(header_text);
    var articles = document.getElementsByTagName('article');
    if( articles.length == 0) return false;
    articles[0].appendChild(header);
    articles[0].appendChild(dlist);
    
}



function focusLabel() {
	if(!document.getElementsByTagName) return false;
	var labels = document.getElementsByTagName("label");
	for(var i = 0; i < labels.length; i++) {
		if(!labels[i].getAttribute("for")) continue;
		labels[i].onclick = function() {
			var id = this.getAttribute("for");
			if(!document.getElementById(id)) return false;
			var element = document.getElementById(id);
			element.focus();
		}
	}
}

function resetFields(whichForm) {
	if(Modernizr.input.placeholder) return;
	for(var i = 0; i < whichForm.elements.length; i++) {
		var element = whichForm.elements[i];
		if(element.type == "submit") continue;
		var check = element.placeholder || element.getAttribute("placeholder");
		if(!check) continue;
		element.onfocus = function() {
			var text = this.placeholder || this.getAttribute("placeholder");
			if(this.value == text) {
				this.className = "";
				this.value = "";
			}
		}
		element.onblur = function() {
			if(this.value == "") {
				this.className = 'placeholder';
				this.value = this.placeholder || this.getAttribute("placeholder");
			}
		}
		element.onblur();
	}
}

function isFilled(filed) {
	if(filed.value.replace(" ", "").length == 0) return false;
	var placeholder = filed.placeholder || filed.getAttribute("placeholder");
	return (filed.value != placeholder);
}

function isEmail(filed) {
	return (filed.value.indexOf("@") != -1 && filed.value.indexOf(".") != -1);
}

function validateForm(whichForm) {
	for(var i = 0; i < whichForm.elements.length; i++) {
		var element = whichForm.elements[i];
		if(element.required == "required") {
			alert("hello!");
			if(!isFilled(element)) {
				alert("place fill in the "+element.name+" field.");
				return false;
			}
		}
		if(element.type == "email") {
			if(!isEmail(element)) {
				alert("The "+element.name+" field must be a vaild email address." );
				return false;
			}
		}
	}
	return true;
}

function prepareForms() {
	for(var i = 0; i < document.forms.length; i++) {
		var thisform = document.forms[i];
		resetFields(thisform);
		thisform.onsubmit = function() {
			if(!validateForm(this)) {
				return false;
			}
			var article = document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this, article)) return false;
			return true;
		}
	}
}

function getHTTPObject() {
	if(typeof XMLHttpRequest == "undefined") {
		XMLHttpRequest = function() {
			try{return new ActiveXObject("Msxml2.XMLHTTP.6.0");}
				catch(e) {}
			try{return new ActiveXObject("Msxml2.XMLHTTP.3.0");}
				catch(e) {}
			try{return new ActiveXObject("Msxml2.XMLHTTP");}
				catch(e) {}
			return false;
		}
	}
	return new XMLHttpRequest();
}

function displayAjaxLoading(element) {
	while(element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}
	var content = document.createElement("img");
	content.setAttribute("src", "images/Tulips.jpg");
	content.setAttribute("alt", "loading...");
	element.appendChild(content);
}

/*function submitFormWithAjax(whichForm, thetarget) {
	var request = getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(thetarget);

	var dataParts = [];
	var element;
	for(var i = 0; i < whichForm.elements.length; i++) {
		element = whichForm.elements[i];
		dataParts[i] = element.name + "=" + encodeURIComponent(element.value);
	}
	var data = dataParts.join("&");
	request.open("POST", whichForm.getAttribute("action"), true);
	request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

	request.onreadystatechange = function() {
		if(request.readyState == 4) {
			if(request.status == 200 || request.status == 0) {
				var matchs = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				alert(matchs);
				if(matchs.length > 0) {
					thetarget.innerHTML = matchs[1];
				} else {
					thetarget.innerHTML = '<p>Oops, there was an error, sorry.</p>';
				}
			} else {
				thetarget.innerHTML = "<p>" + request.statusText + "</p>";
			}
		}
	};

	request.send(data);
	return true;
}*/

function submitFormWithAjax(whichform,thetarget){
    var request = getHTTPObject();
    if(!request) return false;
    displayAjaxLoading(thetarget);
    var dataParts = [];
    for(i=0;i<whichform.elements.length;i++){
        var elem = whichform.elements[i];
        dataParts[i] = elem.getAttribute('name') + '=' + encodeURIComponent(elem.value);
    }
    var data = dataParts.join('&');
    request.open('POST',whichform.getAttribute('action'),true);
    request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
    request.onreadystatechange = function(){
        if(request.readyState == '4'){
            if( request.status ==200 || request.status ==0 ){
                var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
                if( matches.length > 0){
                    thetarget.innerHTML = matches[1];
                }else{
                    thetarget.innerHTML = '<p>Oops,there was an error.Sorry.</p>';
                }
            }else{
                thetarget.innerHTML = '<p>' + request.statusText + '</p>';
            }
        }
        
    }
    request.send(data);
    return true;
}




addLoadEvent(highlightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalnav);
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highlightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(focusLabel);
addLoadEvent(prepareForms);