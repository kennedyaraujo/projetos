var intervalo = null;
var score = 0;
var anteriores = new Array();
function gE(variavel){
	return document.getElementById(variavel);	
}

function parar(){
	clearInterval(intervalo);
	intervalo = null;
	anteriores = new Array();
	gE("acertos").innerHTML = score = 0;
	gE("f_tempo").innerHTML = "";
	gE("tags").innerHTML = "<strong>Tags: </strong>";
	gE("tempo").innerHTML = "00:00";
	gE("nome").disabled=0;
	gE("nome").focus();	
}

function comecar(){
	gE("nome").disabled=0;
	gE("nome").value = "";
	if(intervalo != "pausar"){
		parar();
	}
	data = new Date();	
	intervalo = window.setInterval("cronometro()", 1000);
	gE("nome").focus();
}

function cronometro(){
	campo = gE("tempo").innerHTML;
	itens = campo.split(":");
	itens[0] = parseInt(itens[0],10);
	itens[1] = parseInt(itens[1],10);
	if(itens[0] == 2){
		clearInterval(intervalo);
		intervalo = null;
		gE("nome").disabled = 1;
		gE("f_tempo").innerHTML = "Tempo esgotado!";
		if(score!=0) gE("f_tempo").innerHTML += " <span>Parabéns pelos "+score+" acerto(s).</span>";
	}else if(itens[1] == 59){
		itens[0] += 1;
		itens[1] = 0;
	}else{
		itens[1] += 1;
	}
	segundos = itens[1]<10 ? "0"+itens[1] : itens[1]; 
	gE("tempo").innerHTML = "0"+itens[0]+":"+segundos;
}

function pausar(){
	clearInterval(intervalo);
	gE("nome").disabled = 1;
	intervalo = "pausar";
}


function verifica(var1){
	//var tags = new Array("a","abbr","acronym","address","area","b","base","bdo","big","blockquote","body","br","button","caption","cite","code","col","colgroup","dd","del","dfn","div","dl","DOCTYPE","dt","em","fieldset","form","h1", "h2", "h3", "h4", "h5", "h6","head","html","hr","i","img","input","ins","kbd","label","legend","li","link","map","meta","noscript","object","ol","optgroup","option","p","param","pre","q","samp","script","select","small","span","strong","style","sub","sup","table","tbody","td","textarea","tfoot","th","thead","title","tr","tt","ul","var","background","background-attachment","background-color","background-image","background-position","background-repeat","border","border-collapse","border-color","border-spacing","border-style","border-width","bottom","caption-side","clear","clip","color","content","counter-increment","counter-reset","cursor","direction","display","empty-cells","float","font","font-family","font-size","font-style","font-variant","font-weight","height","left","letter-spacing","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","max-height","max-width","min-height","min-width","orphans","outline","outline-color","outline-style","outline-width","overflow","padding","page-break-after","page-break-before","page-break-inside","position","quotes","right","table-layout","text-align","text-decoration","text-indent","text-transform","top","unicode-bidi","vertical-align","visibility","white-space","widows","width","word-spacing","z-index");
	var tags = new Array("html", "head", "title", "base", "link", "meta", "style", "body", "article", "section", "nav", "aside", "h1", "h2", "h3", "h4", "h5", "h6", "hgroup", "header", "footer", "address", "p", "hr", "pre", "blockquote", "ol", "ul", "menu", "li", "dl", "dt", "dd", "figure", "figcaption", "main", "search", "div", "a", "em", "strong", "small", "s", "cite", "q", "dfn", "abbr", "ruby", "rt", "rp", "data", "time", "code", "var", "samp", "kbd", "sub", "sup", "i", "b", "u", "mark", "bdi", "bdo", "span", "br", "wbr", "ins", "del", "picture", "source", "img", "iframe", "embed", "object", "video", "audio", "track", "map", "area", "table", "caption", "colgroup", "col", "tbody", "thead", "tfoot", "tr", "td", "th", "form", "label", "input", "button", "select", "datalist", "optgroup", "option", "textarea", "output", "progress", "meter", "fieldset", "legend", "details", "summary", "script", "noscript", "template", "slot", "canvas");
	num = tags.length;
	num2 = anteriores.length;
	
	for(y=0; y<num2; y++){//se a palavra for repetida
		if(var1 == anteriores[y]){
			gE("nome").value = "";
			gE("nome").focus();	
			return false;
		}
	}
	anteriores[num2]= var1;
	for(i=0; i<num; i++){				
		if(var1 == tags[i]){
			score++;
			gE("tags").innerHTML  += score==1 ? "" : ", ";
			gE("tags").innerHTML  += tags[i];
		}
	}
}


function comparar(){	
	if(intervalo != null){		
		nomes = gE("nome").value;
		if(nomes.indexOf(",") == -1){//se for apenas um item
			verifica(nomes);			
		}else{
			nomes = nomes.split(",");
			num2 = nomes.length;
			for(i=0; i<num2; i++){
				verifica(nomes[i]);
			}
		}
		gE("acertos").innerHTML = score;
		gE("nome").value = "";
		gE("nome").focus();		
	}else{
		data = new Date();	
		intervalo = window.setInterval("cronometro()", 1000);
		comparar();
	}
	return false;
}