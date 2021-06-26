<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|Api Authentication
|
*/

Route::post('my_profile', 'MobileController@my_profile');
Route::post('sign_in', 'MobileController@sign_in');
Route::post('sign_up', 'MobileController@sign_up');
Route::get('logout', 'MobileController@logout');
Route::post('update_profile', 'MobileController@update_profile');
Route::get('hospital_list_nearby', 'MobileController@hospital_list_nearby');
Route::post('book_appointment_view', 'MobileController@book_appointment_view');
Route::post('generate_token', 'MobileController@generate_token');

Route::post('class_routine', 'MobileController@class_routine');
Route::post('payment_list', 'MobileController@payment_list');
Route::post('report_list', 'MobileController@report_list');
Route::post('notification', 'MobileController@notification');

Route::post('send-notification', [App\Http\Controllers\MobileController::class, 'send']);