function updateUsuario(usuarioData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', controllers.controllersUsuarios, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        const data = `metodo=Update&` +
            `usuarioId=${encodeURIComponent(usuarioData.usuarioId)}&` +
            `usuario=${encodeURIComponent(usuarioData.usuario)}&` +
            `contrasena=${encodeURIComponent(usuarioData.contrasena)}&` +
            `nombre=${encodeURIComponent(usuarioData.nombre)}&` +
            `codigo=${encodeURIComponent(usuarioData.codigo)}&` +
            `vinculacion=${encodeURIComponent(usuarioData.vinculacion)}&` +
            `rol=${encodeURIComponent(usuarioData.rol)}`;

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject('Error al actualizar datos.');
            }
        };

        xhr.onerror = function() {
            reject('Error de conexión con el servidor.');
        };

        xhr.send(data);
    });
}


function updateUsuarioContrasena(usuarioData) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', controllers.controllersUsuarios, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        const data = `metodo=UpdatePass&` +
            `usuarioId=${encodeURIComponent(usuarioData.usuarioId)}&` +
            `contrasena=${encodeURIComponent(usuarioData.contrasena)}`;

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                getAllConfiguracion(config.configuracionId).then(result => {
                    notificacion("Advertencia", "Ups! no hemos podido actualizar estos datos.", result.locutora, "Advertencia");
                });
            }
        };
        
        xhr.onerror = function() {
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send(data);
    });
}

function updateUsuarioToken(usuarioId) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', controllers.controllersUsuarios, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        const data = `metodo=UpdateToken&` +
            `usuarioId=${encodeURIComponent(usuarioId)}`;

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                getAllConfiguracion(config.configuracionId).then(result => {
                    notificacion("Advertencia", "Ups! no hemos podido actualizar estos datos.", result.locutora, "Advertencia");
                });
            }
        };
        
        xhr.onerror = function() {
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send(data);
    });
}


function verificarUsuarioToken() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', controllers.controllersUsuarios + '?metodo=VerificarToken', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        
        xhr.onerror = function() {
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send();
    });
}

function cerrarSessionUsuario() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', controllers.controllersUsuarios + '?metodo=CerrarSession', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        
        xhr.onerror = function() {
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send();
    });
}

function deleteUsuario(usuarioId) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', controllers.controllersUsuarios, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        const data = `metodo=Delete&usuarioId=${encodeURIComponent(usuarioId)}`;
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                getAllConfiguracion(config.configuracionId).then(result => {
                    notificacion("Advertencia", "Ups! no hemos podido eliminar estos datos.", result.locutora, "Advertencia");
                });
            }
        };
        
        xhr.onerror = function() {
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send(data);
    });
}

function getUsuarioId(usuarioId) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', controllers.controllersUsuarios + '?metodo=getId&usuarioId=' + usuarioId, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                getAllConfiguracion(config.configuracionId).then(result => {
                    notificacion("Advertencia", "Ups! no hemos encontrado esos datos.", result.locutora, "Advertencia");
                });              
            }
        };
        
        xhr.onerror = function() {           
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send();
    });
}

function getUsuarioCodigo(codigo) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', controllers.controllersUsuarios + '?metodo=getCodigo&codigo=' + codigo, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                getAllConfiguracion(config.configuracionId).then(result => {
                    notificacion("Advertencia", "Ups! no hemos encontrado esos datos.", result.locutora, "Advertencia");
                });              
            }
        };
        
        xhr.onerror = function() {           
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send();
    });
}

function getAllUsuarios() {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', controllers.controllersUsuarios + '?metodo=getAll', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                getAllConfiguracion(config.configuracionId).then(result => {
                    notificacion("Advertencia", "Ups! no hemos encontrado esos datos.", result.locutora, "Advertencia");
                });
            }
        };
        
        xhr.onerror = function() {
            getAllConfiguracion(config.configuracionId).then(result => {
                notificacion("Error", "Ups! ha ocurrido un error con el servidor.", result.locutora, "Error");
            }); 
        };
        
        xhr.send();
    });
}
