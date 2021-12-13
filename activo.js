var title = document.querySelector('title');
var metaElement = document.querySelectorAll('li a');

for (var i=0; i<metaElement.length; i++){
    if(metaElement[i].innerHTML == title.innerHTML){
        metaElement[i].setAttribute("style", "color: #ffffff; background-color: #992200;")
        break
    }
}