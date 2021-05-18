
const DrawTrie = (nodo) => {
	let di = document.createElement("div");
	let p = document.createElement("p");
	di.id = nodo.value + nodo.id;
	di.className = "nodo_padre";
	
	p.appendChild(document.createTextNode(nodo.value));
	p.id = nodo.value + nodo.id+ '_p';
	p.className = nodo.value + nodo.id+ '_p';
	p.classList.add("padre");
	di.appendChild(p);
	let hijos = document.createElement("div");
	hijos.id = nodo.value + nodo.id + "_hijos"; 
	hijos.className = "nodo";
	di.appendChild(hijos);
	document.getElementById("marco").appendChild(di);

	nodo.Childrem.forEach(key=>{
		SacarDiv(key);
    });
}

const SacarDiv = (nodo) => {
	let div = document.createElement("div");
	div.id = nodo.value+ nodo.id;
	let p = document.createElement("p");
	p.appendChild(document.createTextNode(nodo.value));
	p.id = nodo.value + nodo.id+ '_p';
	p.className = nodo.value + nodo.id+ '_p';
	if (nodo.isFinal) p.classList.add("final")
	div.appendChild(p);

	if (nodo.Childrem.size != 0) {
		let hijos = document.createElement("div");
		hijos.id = nodo.value + nodo.id + "_hijos"; 
		hijos.className = "nodo";
		div.appendChild(hijos);
	}

	document.getElementById(nodo.father.value + nodo.father.id+ "_hijos").appendChild(div);
	let node = document.getElementById(nodo.value+ nodo.id);
	node.className = "nodo_padre";

	nodo.Childrem.forEach(key=>{
		SacarDiv(key);
    });
}

const DrawLines = (node) => {
	node.Childrem.forEach(child => {
		DrawLines(child);
		let father_p = document.getElementById(child.father.value + child.father.id+ "_p");
		let node_p = document.getElementById(child.value + child.id + "_p");
		DrawLine(father_p, node_p);
    });
	document.getElementById("svg").style.width = document.getElementById("marco").getBoundingClientRect().width + 'px';
	document.getElementById("svg").style.height = document.getElementById("marco").getBoundingClientRect().height + 'px';
}

const DrawLine = (from, to) => {
	let line = document.createElementNS('http://www.w3.org/2000/svg','line');
	document.getElementById("svg").appendChild(line);

	let x1 = from.offsetLeft + from.offsetWidth/2;
	let y1 = from.offsetTop  + from.offsetHeight/2;
	let x2 = to.offsetLeft   + to.offsetWidth/2;
	let y2 = to.offsetTop    + to.offsetHeight/2;
	
	line.setAttribute('x1', x1);
	line.setAttribute('y1', y1); 
	line.setAttribute('x2', x2); 
	line.setAttribute('y2', y2); 
}

const ShowTrie = (node) => {
	if (node.Childrem.size>0) {
		document.getElementById("trie").innerHTML = `
			<svg id="svg" data-name="Layer 1" 
			xmlns="http://www.w3.org/2000/svg">
			</svg>
			<div id="marco"></div>
		`;
		document.getElementById("svg").innerHTML = '';
		document.getElementById("marco").innerHTML = '';
		DrawTrie(node);
		DrawLines(node);
	} else {
		document.getElementById("trie").innerHTML = `
			<div class="default_trie">
				<h1>There are not words registered</h1>
			</div>
		`;
	}
	
}