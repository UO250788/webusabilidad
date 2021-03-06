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
			var url = window.location.host;
			var listado = window.location.pathname.split('/')
			for (var i = 0; i<listado.length; i++){
				if (listado[i].length > 0 && !listado[i].includes('.html')) {
					url += "/"+ listado[i]
				}
			}
			main.append('<p><a href="http://'+url+'/'+result.url+'">' + result.title + '</a></p>');
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