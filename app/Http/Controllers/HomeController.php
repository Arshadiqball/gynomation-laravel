<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;
use App\user;

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

    public function hospital_add(){
        return view('pages.hospital');
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
}
