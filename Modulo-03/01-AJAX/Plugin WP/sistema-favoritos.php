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
    //Solo mostrar si el usuario esta logueado
    if(!is_user_logged_in()){
        return '';
    }

    //Obtener el id del post actual
    $post_id = get_the_ID();

    //Obdtener el id del usuario actual
    $user_id = get_current_user();

    //Obtener la lista de favoritos del usuario
    $favoritos = get_user_meta($user_id, 'post_favoritos', true);

    //Verificar si ese post ya esta en favoritos
    $es_favorito = is_array ($favoritos) && in_array ($post_id, $favoritos);

    //Crear boton de favoritos en HTML
    $boton = '<div class = "contenedor-favorito">';
    $boton .= '<button class = "btn-favoritos" data-post-id = "'.esc_attr($post_id).'">';
    $boton .= $es_favorito ? '❤ Quitar de favoritos' : '🤍 Agregar a favoritos';
    $boton .= '</button>';
    $boton .= '</div>';

    //Agregar el boton al final del contenido del post
    function agregar_favorito_al_contenido($content){
        //Solo si son post individuales
        if(is_single() && in_the_loop()){
            $content.= mostrar_boton_favorito();
        }return $content;
    }
 add_filter('the_content','agregar_favorito_al_contenido');
}   
?>