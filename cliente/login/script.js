document.addEventListener('DOMContentLoaded', () => {

    verificarUsuarioToken().then(result => {
        if(result.Validacion == "Exitoso"){
            history.pushState(null, '', "../chat");
            window.location.reload();
        }         
    });    
       
});


function acceder(){

    let usuario = document.getElementById("usuario").value;
    let contrasena = document.getElementById("contrasena").value;

    getAllUsuarios().then(resultUsuarios => {
        let usuarioValido = resultUsuarios.data.find(u => u.usuario.toLowerCase() === usuario.toLowerCase() && u.contrasena === contrasena);
        if(usuarioValido){
            
            updateUsuarioToken(usuarioValido.usuarioId).then(resultToken => {
                if(resultToken.Validacion == "Exitoso"){
                    if(usuarioValido.rol == "Estandar"){
                        history.pushState(null, '', "../chat");
                        window.location.reload();
                    }
                    else if(usuarioValido.rol == "Developer"){
                        history.pushState(null, '', "../developer");
                        window.location.reload();
                    }
                    else{
                        window.location.reload();
                    }
                    
                }
                else{
                   notificacion("Advertencia", "Ups! ha ocurrido un error al iniciar session.", 0, "Error");
                } 
        
            });
        }
        else{
            notificacion("Advertencia", "Ups! usuario o contraseña es incorrecta.", 0, "Advertencia");
        }
    });
}

document.getElementById('btnLogin').onclick = function() {
    acceder()
};