/******/ (() => { // webpackBootstrap
"use strict";


$( "#create" ).click(function( e ) {
    e.preventDefault();
    a($("#create_form").serializeArray(), 'classes/store', 'POST', 'classes_list');
    });

/******/ })();