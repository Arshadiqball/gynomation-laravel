<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;
use App\Hospital;
use App\User;

class HomeController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }

     /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        $data['appointments'] = Appointment::count();
        $data['patient'] = User::where('role','patient')->count();
        $data['hospital'] = User::where('role','admin')->count();
        return view('pages.dashboard')->with($data, 'data');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function user_list()
    {
        $data['users'] = User::count();
        return view('pages.user')->with($data, 'data');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function hospital_list()
    {
        $data['hospitals'] = Hospital::count();
        return view('pages.hospital')->with($data, 'data');
    }

    public function hospital_add(){
        return view('pages.hospital_add');
    }
    
    public function hospital_create(){
        
        dd(Request::segment(1));
    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function appointment_list()
    {

        return response()->json([
            'success' => true,
            'data' => Appointment::all(),
            'meta' => ["field" => "id",
            "sort" => "asc", "total" => Appointment::count()]
        ], 201);
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function users_list()
    {

        return response()->json([
            'success' => true,
            'data' => User::all(),
            'meta' => ["field" => "id",
            "sort" => "asc", "total" => User::count()]
        ], 201);
    }
    
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function hospitals_list()
    {

        return response()->json([
            'success' => true,
            'data' => Hospital::all(),
            'meta' => ["field" => "id",
            "sort" => "asc", "total" => Hospital::count()]
        ], 201);
    }
}
