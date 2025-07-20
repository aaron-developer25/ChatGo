document.addEventListener("contextmenu", function(e){
    e.preventDefault();
  }, false);
  
  document.onkeydown = function (e) {
    if (e.keyCode == 123) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)) {
        return false;
    }
    if (e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)) {
        return false;
    }
  }


function escapeForHtmlAttribute(value) {
    return value.replace(/"/g, '&quot;').replace(/'/g, '&#039;').replace(/\n/g, '\\n');
}


function obtenerParametroUrl(nombre) {
    nombre = nombre.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + nombre + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}


function enviarSessionStorage(key, valor){
    sessionStorage.setItem(key, valor);
}


function obtenerSessionStorage(key) {
    return sessionStorage.getItem(key);
}
