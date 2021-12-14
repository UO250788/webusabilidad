$(document).ready(function() {
	
	var pags = ["index.html", "padel.html", "aficiones.html", "capgemini.html"];
	
	function buscar(e){
		e.preventDefault();
		var p = $("#textoBusca").val();
		cargar(p);
	}
	
	function cargar(pal){
		
		var main = $('main');
		main.empty();
		
		function addResult(result){
			console.log(result.url)
			var url = window.location.origin;
			var host = window.location.host;
			console.log(url)
			console.log(host)
			var temp =
			main.append('<p><a href="http://'+host+'/'+result.url+'">' + result.title + '</a></p>');
		}
		
		pags.forEach(function (pag){
			$.get(
				pag,function(res){
					var parser = new DOMParser();
					var dochtml = parser.parseFromString(res,"text/html");
					
					var title = dochtml.querySelector('title');
					var metaDescription = dochtml.querySelector('meta[name="description"]');
					var contenido = dochtml.querySelector('main').textContent;
                    
					if(contenido.toLowerCase().includes(pal.toLowerCase())){
						addResult({
							title: title.textContent,
							url: pag,
							descripcion: metaDescription.getAttribute('content')
						});
					}
					
				},
				"html"
			)
		});
	}
	$("#buscador").submit(buscar);
});