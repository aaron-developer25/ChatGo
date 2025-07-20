function addAlmacenamiento(key, value) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', controllers.controllersAlmacenamiento, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        const data = `metodo=Add&key=${encodeURIComponent(key)}&value=${encodeURIComponent(value)}`;

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject('Error al agregar el dato.');
            }
        };
        
        xhr.onerror = function() {
            reject('Error de conexión con el servidor.');
        };
        
        xhr.send(data);
    });
}


function getAlmacenamiento(key) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', controllers.controllersAlmacenamiento, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        
        const data = `metodo=get&key=${encodeURIComponent(key)}`;

        xhr.onload = function() {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            } else {
                reject('Error al obtener el dato.');
            }
        };
        
        xhr.onerror = function() {
            reject('Error de conexión con el servidor.');
        };
        
        xhr.send(data);
    });
}

