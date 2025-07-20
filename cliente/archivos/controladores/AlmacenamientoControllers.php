<?php


    if ($_POST['metodo'] == 'Add') {
        session_start();

        $key = $_POST['key'];
        $value = $_POST['value'];

        if (!empty($key) && !empty($value)) {
            $_SESSION[$key] = $value;
            echo json_encode(array('Validacion' => 'Exitoso'));
        } 
        else {
            echo json_encode(array('Validacion' => 'Error'));
        }
    }

    if ($_POST['metodo'] == 'get') {
        session_start();
        
        $key = $_POST['key'];
        $value = "";

        if (isset($_SESSION[$key])) {
            $value = $_SESSION[$key];
            echo json_encode(array('Validacion' => 'Exitoso', 'value' => $value));
        } 
        else {
            echo json_encode(array('Validacion' => 'Error'));
        }
    }
    
?>
