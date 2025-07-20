   document.addEventListener('DOMContentLoaded', () => {
        cargarPrincipal();
    });


    let socket = new WebSocket("ws://192.168.1.9:8080");
    const btnEnviar = document.getElementById('btnEnviar');
    const btnCerrarSesion = document.getElementById('btnCerrarSesion');
    const mensaje = document.getElementById('mensaje');
    const log = document.getElementById('log');
    const modal = document.getElementById('modalVinculacion');

    socket.onopen = function() {
        console.log("Conectado");
    };

    socket.onmessage = (event) => {
        let data = JSON.parse(event.data);

        const msg = document.createElement('div');
        msg.classList.add('message');
        
        verificarUsuarioToken().then(result => {
            if(result.Validacion != "Exitoso"){
                window.location.replace("../");
            }
            else{
                getUsuarioId(result.usuarioId).then(usuarioActual => {

                    if (data.destinatario === usuarioActual.data.codigo) {
                        msg.classList.add('left');
                        msg.textContent = data.mensaje;
                    } else if (data.origen === usuarioActual.data.vinculacion) {
                        msg.classList.add('right');
                        msg.textContent = data.mensaje;
                    } else {
                        return;
                    }

                    log.appendChild(msg);
                    log.scrollTop = log.scrollHeight;

                });
            }
        });

    };


    btnEnviar.onclick = function() {
        verificarUsuarioToken().then(result => {
            if(result.Validacion != "Exitoso"){
                window.location.replace("../");
            } else {
                getUsuarioId(result.usuarioId).then(usuarioActual => {

                    if (usuarioActual.data.vinculacion && usuarioActual.data.vinculacion != 0 && usuarioActual.data.vinculacion !== '') {

                        if (mensaje.value.trim() !== "") {
                            const msgTexto = mensaje.value.trim();

                            socket.send(JSON.stringify({
                                origen: usuarioActual.data.codigo,
                                destinatario: usuarioActual.data.vinculacion,
                                mensaje: msgTexto
                            }));

                            const msg = document.createElement('div');
                            msg.classList.add('message', 'right');
                            msg.textContent = msgTexto;
                            log.appendChild(msg);
                            log.scrollTop = log.scrollHeight;

                            mensaje.value = "";
                        } else {
                            notificacion("Advertencia", "Escribe tu mensaje antes de enviar...", 0, "Advertencia");
                        }

                    } else {
                        requerirVinculacion();
                    } 
                });
            }
        });
    };



    mensaje.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') btnEnviar.click();
    });



    function requerirVinculacion() {
        modal.style.display = 'flex';
    }

    function ocultarVinculacion() {
        modal.style.display = 'none';
    }


    function onVincular() {
        const codigo = document.getElementById('codigoVinculacion').value.trim();

        if (codigo === "") {
            notificacion("Advertencia", "Ingrese el código de vinculación.", 0, "Advertencia");
            return;
        }

        verificarUsuarioToken().then(usuarioToken => {
            if (usuarioToken.Validacion !== "Exitoso") {
                cerrarSesion();
                return;
            }

            getUsuarioId(usuarioToken.usuarioId).then(usuarioActual => {

                if (!usuarioActual.data) {
                    notificacion("Advertencia", "No se pudo obtener los datos del usuario.", 0, "Error");
                    return;
                }

                if (codigo === usuarioActual.data.codigo) {
                    notificacion("Advertencia", "No puede vincularse a su propio código.", 0, "Advertencia");
                    return;
                }

                getAllUsuarios().then(usuarios => {
                    const usuarioDestino = usuarios.data.find(u => u.codigo === codigo);

                    if (!usuarioDestino) {
                        notificacion("Advertencia", "El código ingresado es incorrecto.", 0, "Advertencia");
                        return;
                    }

                    const yaVinculado = usuarios.data.find(u => u.vinculacion == codigo);

                    if (yaVinculado) {
                        notificacion("Advertencia", "Este código ya está vinculado a otro usuario.", 0, "Advertencia");
                        return;
                    }

                    const usuarioData = {
                        usuarioId: usuarioActual.data.usuarioId,
                        usuario: usuarioActual.data.usuario,
                        contrasena: usuarioActual.data.contrasena,
                        nombre: usuarioActual.data.nombre,
                        codigo: usuarioActual.data.codigo,
                        vinculacion: codigo,
                        rol: usuarioActual.data.rol
                    };

                    updateUsuario(usuarioData).then(response => {
                        if (response.Validacion === "Exitoso") {
                            ocultarVinculacion();
                            notificacion("Exitoso", "Vinculación exitosa.", 0, "Exitoso");
                            location.reload();
                        } else {
                            notificacion("Advertencia", "No se pudo vincular el código.", 0, "Error");
                        }
                    }).catch(() => {
                        notificacion("Advertencia", "Error al actualizar el usuario.", 0, "Error");
                    });

                }).catch(() => {
                    notificacion("Advertencia", "Error al obtener usuarios.", 0, "Error");
                });

            }).catch(() => {
                notificacion("Advertencia", "Error al obtener datos del usuario.", 0, "Error");
            });

        }).catch(() => {
            notificacion("Advertencia", "Error al validar usuario.", 0, "Error");
        });
    }


    btnCerrarSesion.addEventListener('click', () => {
        verificarUsuarioToken().then(usuarioToken => {
            if (usuarioToken.Validacion !== "Exitoso") {
                cerrarSesion();
                return;
            }

            getUsuarioId(usuarioToken.usuarioId).then(usuarioActual => {
                if (!usuarioActual.data) {
                    cerrarSesion();
                    return;
                }

                const codigoActual = usuarioActual.data.codigo;
                const vinculacionActual = usuarioActual.data.vinculacion;

                const usuarioActualData = {
                    usuarioId: usuarioActual.data.usuarioId,
                    usuario: usuarioActual.data.usuario,
                    contrasena: usuarioActual.data.contrasena,
                    nombre: usuarioActual.data.nombre,
                    codigo: codigoActual,
                    vinculacion: "", 
                    rol: usuarioActual.data.rol
                };

                updateUsuario(usuarioActualData).then(responseActual => {
                    if (responseActual.Validacion === "Exitoso") {
                        if (vinculacionActual && vinculacionActual !== "" && vinculacionActual !== "0") {
                            getUsuarioCodigo(vinculacionActual).then(usuarioVinculado => {
                                if (usuarioVinculado.data) {
                                    const usuarioVinculadoData = {
                                        usuarioId: usuarioVinculado.data.usuarioId,
                                        usuario: usuarioVinculado.data.usuario,
                                        contrasena: usuarioVinculado.data.contrasena,
                                        nombre: usuarioVinculado.data.nombre,
                                        codigo: usuarioVinculado.data.codigo,
                                        vinculacion: "",
                                        rol: usuarioVinculado.data.rol
                                    };

                                    updateUsuario(usuarioVinculadoData).finally(() => {

                                        socket.send(JSON.stringify({
                                            origen: usuarioActual.data.codigo,
                                            destinatario: usuarioActual.data.vinculacion,
                                            mensaje: "⚠️ LA PERSONA CON LA QUE HABLABAS SE ACABA DE RETIRO ⚠️"
                                        }));

                                        cerrarSesion();
                                    });
                                } else {
                                    cerrarSesion();
                                }
                            }).catch(() => {
                                cerrarSesion();
                            });
                        } else {
                            cerrarSesion();
                        }
                    } else {
                        notificacion("Error", "No se pudo actualizar la vinculacion del usuario.", 0, "Error");
                    }
                }).catch(() => {
                    notificacion("Error", "Error al actualizar el usuario.", 0, "Error");
                });

            }).catch(() => {
                cerrarSesion();
            });
        }).catch(() => {
            cerrarSesion();
        });
    });



    function cargarPrincipal(){

        verificarUsuarioToken().then(result => {
            if(result.Validacion != "Exitoso"){
                window.location.replace("../login");
            }
            else{

              getUsuarioId(result.usuarioId).then(resultUsua => {

                 if(resultUsua.data.rol == "Estandar"){

                    if (resultUsua.data.vinculacion && resultUsua.data.vinculacion != 0 && resultUsua.data.vinculacion !== '') {
                        
                        getUsuarioCodigo(resultUsua.data.vinculacion).then(resultUsuario => {
                        
                            document.getElementById("nombreUsuario").textContent = resultUsuario.data.nombre;  

                        });
                    }
                    else{
                        requerirVinculacion();
                    }
                }
                else{
                    cerrarSesion();
                }

              });        

            }   
        });

    }


    function cerrarSesion(){
        cerrarSessionUsuario().then(result =>{
            if(result.Validacion == "Exitoso"){
            window.location.replace("../login");
            }
        });
    }
