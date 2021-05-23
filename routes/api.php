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

Route::post('doctor_view', 'MobileController@doctor_view');
Route::post('doctor_rating', 'MobileController@doctor_rating');
Route::get('confirm_appointment', 'MobileController@confirm_appointment');
Route::post('book_appointment_view', 'MobileController@book_appointment_view');
Route::post('booked_appointment_view', 'MobileController@booked_appointment_view');
Route::post('scheduled_appointment', 'MobileController@scheduled_appointment');
Route::get('dashboard_after_book_appointment', 'MobileController@dashboard_after_book_appointment');
Route::get('clinic_doctor_availability', 'MobileController@clinic_doctor_availability');
Route::get('my_appointment', 'MobileController@my_appointment');
Route::get('view_appointment', 'MobileController@view_appointment');
Route::post('cancel_appointment', 'MobileController@cancel_appointment');
Route::get('notification_list', 'MobileController@notification_list');
Route::get('notification_user', 'MobileController@notification_user');
Route::post('notify', 'NotificationController@notify' );
Route::post('generate_token', 'MobileController@generate_token');
Route::get('get_current_distance', 'MobileController@get_current_distance');
Route::get('get_current_expected_time', 'MobileController@get_current_expected_time');
Route::get('terms_and_condition', 'MobileController@terms_and_condition');
Route::get('help_and_support', 'MobileController@help_and_support');
Route::get('feedback', 'MobileController@feedback');
Route::post('list_appointment', 'MobileController@list_appointment');

