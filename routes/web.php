<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Auth::routes();

Route::get('/', 'HomeController@index');
Route::post('appointment/list', 'HomeController@appointment_list');
Route::get('user/list', 'HomeController@user_list');
Route::post('users/list', 'HomeController@users_list');
Route::get('hospital/list', 'HomeController@hospital_list');
Route::post('hospitals/list', 'HomeController@hospitals_list');
Route::get('hospital/add', 'HomeController@hospital_add');
