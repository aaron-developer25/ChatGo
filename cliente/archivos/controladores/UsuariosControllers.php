<?php
    require_once("../config/config.php");


    // Actualizar un usuario existente
    if ($_POST['metodo'] === 'Update') {
        $usuarioId = $_POST['usuarioId'];
        $usuario = $_POST['usuario'];
        $contrasena = $_POST['contrasena'];
        $nombre = $_POST['nombre'];
        $rol = $_POST['rol'];
        $codigo = $_POST['codigo'];
        $vinculacion = $_POST['vinculacion'];

        $sql = "UPDATE $tbl1 
                SET usuario='$usuario', contrasena='$contrasena', nombre='$nombre', rol='$rol', codigo='$codigo', vinculacion='$vinculacion'
                WHERE usuarioId='$usuarioId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('Validacion' => 'Exitoso'));
        } else {
            echo json_encode(array('Validacion' => 'No se ha podido actualizar los datos.'));
        }
    }



    // Actualizar un usuario token
    if ($_POST['metodo'] === 'UpdateToken') {
        $usuarioId = $_POST['usuarioId'];

        session_start();
        $token = session_id();
        $_SESSION["tokenUsuario"] = $token;
        $_SESSION["usuarioId"] = $usuarioId;

        $token = $conn->real_escape_string($token);
        $usuarioId = $conn->real_escape_string($usuarioId);

        $sql = "UPDATE $tbl1 
                SET token='$token'
                WHERE usuarioId='$usuarioId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('Validacion' => 'Exitoso'));
        } else {
            echo json_encode(array('Validacion' => 'No se ha podido actualizar los datos.'));
        }
    }


    // Verificar usuario token
    if ($_GET['metodo'] === 'VerificarToken') {
        session_start();
    
        $tokenUsuario = $_SESSION["tokenUsuario"];
        $usuarioId = $_SESSION["usuarioId"];
    
        $sql = "SELECT usuarioId, token FROM $tbl1 WHERE usuarioId = '$usuarioId' AND token = '$tokenUsuario'";
        $result = $conn->query($sql);
    
        if ($result) {
            if ($result->num_rows > 0) {
                echo json_encode(array('Validacion' => 'Exitoso', 'usuarioId' => $usuarioId));
            } else {
                echo json_encode(array('Validacion' => 'Error'));
            }
        }
    }

    
    // Cerrar Session usuario
    if ($_GET['metodo'] === 'CerrarSession') {
        session_start();

        $usuarioId = $conn->real_escape_string($_SESSION["usuarioId"]);
    
        $sql = "UPDATE $tbl1 
                SET token=''
                WHERE usuarioId='$usuarioId'";
    
        if ($conn->query($sql) === TRUE) {
            session_unset();
            session_destroy();
            echo json_encode(array('Validacion' => 'Exitoso'));
        } else {
            echo json_encode(array('Validacion' => 'No se ha podido actualizar los datos.'));
        }
    }
    

    // Eliminar un usuario
    if ($_POST['metodo'] === 'Delete') {
        $usuarioId = $_POST['usuarioId'];

        $sql = "DELETE FROM $tbl1 WHERE usuarioId='$usuarioId'";

        if ($conn->query($sql) === TRUE) {
            echo json_encode(array('Validacion' => 'Exitoso'));
        } else {
            echo json_encode(array('Validacion' => 'No se ha podido eliminar.'));
        }
    }

    // Obtener un usuario por ID
    if ($_GET['metodo'] === 'getId') {
        $usuarioId = $_GET['usuarioId'];

        $sql = "SELECT * FROM $tbl1 WHERE usuarioId='$usuarioId'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode(array('Validacion' => 'Exitoso', 'data' => $row));
        } else {
            echo json_encode(array('Validacion' => 'No se ha encontrado lo que buscas.'));
        }
    }

    // Obtener un usuario por Codigo
    if ($_GET['metodo'] === 'getCodigo') {
        $codigo = $_GET['codigo'];

        $sql = "SELECT * FROM $tbl1 WHERE codigo='$codigo'";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $row = $result->fetch_assoc();
            echo json_encode(array('Validacion' => 'Exitoso', 'data' => $row));
        } else {
            echo json_encode(array('Validacion' => 'No se ha encontrado lo que buscas.'));
        }
    }


    // Obtener todos los usuarios
    if ($_GET['metodo'] === 'getAll') {
        $sql = "SELECT * FROM $tbl1";
        $result = $conn->query($sql);
    
        if ($result) {
            $usuarios = array();
            while ($row = $result->fetch_assoc()) {

                $usuarios[] = $row;
            }
            echo json_encode(array('Validacion' => 'Exitoso', 'data' => $usuarios));
        } else {
            echo json_encode(array('Validacion' => 'No se han encontrado resultados.'));
        }
    }
?>
