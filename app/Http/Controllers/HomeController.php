<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;
use App\Hospital;
use App\User;
use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Hash;
use Auth;
use DB;

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
        if(Auth::user()->role == 'superadmin'){
            $data['patient'] = User::where('role','patient')->count();
            $data['hospital'] = User::where('role','admin')->count();
            $data['appointments'] = Appointment::count();
        }else{
            $data['patient'] = User::where('role','patient')->where('hospital_id',Auth::user()->hospital_id)->count();
            $data['appointments'] = Appointment::where('hospital_id',Auth::user()->hospital_id)->count();
        }
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

    public function user_add(){
        return view('pages.user_add');
    }
    
    public function hospital_create(){
        $flight = new Hospital;

        $flight->name = request()->query('name');
        $flight->address = request()->query('address');
        $flight->phone = request()->query('phone');
        $flight->lat = request()->query('lat');
        $flight->lng = request()->query('lng');

        $flight->save();

        return redirect('hospital/list');
    }
    
    public function user_create(){
        User::create([
            'name' => request()->query('name'),
            'email' => request()->query('email'),
            'password' => Hash::make(request()->query('email')),
            'role' => 'admin',
            'hospital_id' => request()->query('hospital_id'),
        ]);

        return redirect('user/list');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function appointment_list()
    {
        if(Auth::user()->role == 'superadmin'){
            $data = DB::select('select * from appointments inner join users on users.id = appointments.user_id');
        }else{
            $data = DB::select('select * from appointments inner join users on users.id = appointments.user_id 
            where appointments.hospital_id = '.Auth::user()->hospital_id);
        }
        return response()->json([
            'success' => true,
            'data' => $data,
            'meta' => ["field" => "id",
            "sort" => "asc", "total" => Appointment::where('hospital_id',Auth::user()->hospital_id)->count()]
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
