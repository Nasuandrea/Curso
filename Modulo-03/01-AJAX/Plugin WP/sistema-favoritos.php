<?php 
/*
Plugin Name: Sistema de favoritos simple
Description: Permite a los usuarios guardar post como favoritos
Version: 1.0
Author: Andrea Collazo
 */

//Evitar el acceso indirecto al archivo
if (!defined('ABSPATH')){
    exit;
}

//Funcion que crea el boton de favoritos
function mostrar_boton_favorito(){


    //Obtener el id del post actual
    $post_id = get_the_ID();

    //Obtener favoritos desde cookies
    $favoritos = isset($_COOKIE['post_favoritos']) ? json_decode(stripslashes($_COOKIE['post_favoritos']),true) : array();

    //Verificar si este post ya está en favoritos
    $es_favorito = is_array($favoritos) && in_array($post_id, $favoritos);
    
    //Crear boton HTML
    $boton = '<div class = "contenedor-favorito">';
    $boton .= '<button class = "btn-favoritos" data-post-id = "' . esc_attr($post_id) . '">';
    $boton .= $es_favorito ? '★ Quitar de favoritos' : '☆ Agregar a favoritos';
    $boton .= '</button>';
    $boton .= '</div>';
    return $boton;
}   
// Argregar el botón al final del contenido
function agregar_favorito_al_contenido($content){
    //Solo en post individuales
    if(is_single() && in_the_loop()){
        $content .=mostrar_boton_favorito();
    }
    return $content;
}
add_filter('the_content', 'agregar_favorito_al_contenido');

//Registrar y cargar archivos CSS y JavaScript
function cargar_scripts_favoritos(){
    //Cargar CSS
    wp_enqueue_style('favoritos-css',
        plugin_dir_url(__FILE__) . 'estilos.css', array(), '1.0'
    );

    //Cargar JavaScript
    wp_enqueue_script('favoritos-js', plugin_dir_url(__FILE__) . 'favoritos.js', array(), '1.0', true);

    //Pasar datos a JavaScript
    wp_enqueue_script('favortios-js','favoritosData', array('ajax_url' => admin_url('admin-ajax.php'), 'nonce' => wp_create_nonce ('favoritos_nonce')
));
}
add_action('wp_enqueue_scripts','cargar_scripts_favoritos' );

//Función que procesa la petición AJAX
function procesar_toggle_favorito(){
    //Verificar el nonce (token de seguridad)
    check_ajax_referer('favoritos_nonce', 'nonce');

    //Obstener y limpiar el ID del post
    $post_id = intval($_POST['post_id']);

    //Obtener la lista actual de favoritos desde la cookie
    $favoritos = isset($_COOKIE['post_favoritos']) ? json_decode (stripslashes($_COOKIE['post_favoritos']),true) : array();

    //Si no es array, crear uno vacío
    if(!is_array($favoritos)){
        $favoritos = array();
    }

    //Buscar si el post ya está en favoritos
    $clave = array_search($post_id, $favoritos);

    if($clave !== false) {
        //Si está, quitarlo
        unset($favoritos[$clave]);
        $accion = 'removed';
    }else {
        //Si no está, agregarlo
        $favoritos[] = $post_id;
        $accion = 'added';
    }

    //Reindexar el array
    $favoritos = array_values($favoritos);
    
    //Enviar respiesta exitosa a JavaScript con los datos actualizados
    wp_send_json_success(array(
        'accion' => $accion,
        'total' => count($favoritos),
        'favoritos' => $favoritos
    ));
}

//Registrar la funcion AJAX para usuarios logueados y no logueados
add_action('wp_ajax_toglle_favorito', 'procesar_toggle_favorito');
add_action('wp_ajax_nopriv_toglle_favorito', 'procesar_toggle_favorito');//Esta línea es clave para usuarios sin loguear
?>