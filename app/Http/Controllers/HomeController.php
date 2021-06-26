<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Appointment;
use App\Hospital;
use App\User;
use App\Libraries\Firebase;
use App\Libraries\Push;
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
            $data['appointments'] =DB::select("select count(appointments.id) from appointments inner join users on users.id = appointments.user_id
            where users.role = 'patient'");
            dd($data['appointments']);
        }else{
            $data['patient'] = User::where('role','patient')->where('hospital_id',Auth::user()->hospital_id)->count();
            $data['appointments'] =DB::select("select count(appointments.id) from appointments inner join users on users.id = appointments.user_id
            where users.role = 'patient' and appointments.hospital_id = ".Auth::user()->hospital_id);
            $data['appointments'] = Appointment::where('hospital_id',Auth::user()->hospital_id)->where('users.role','patient')->count();
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
            $data = DB::select("select * from appointments inner join users on users.id = appointments.user_id where users.role = 'patient'");
        }else{
            $data = DB::select("select * from appointments inner join users on users.id = appointments.user_id
            where users.role = 'patient' and appointments.hospital_id = ".Auth::user()->hospital_id);
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

    public function savePushNotificationToken(Request $request)
    {
        auth()->user()->update(['device_token'=>$request->token]);
        return response()->json(['token saved successfully.']);
    }
    
    public function sendPushNotification(Request $request)
    {
        $firebaseToken = User::whereNotNull('device_token')->pluck('device_token')->all();
          
        $SERVER_API_KEY = 'AAAA7APWBt8:APA91bH483-18a6_BFKSRtqeTTrXElxnqoZbCm9KVgnI0k8KUPsKjIru1-D1DS1AydhY1qTJaLYhl8EZvKZFVzn7vmTFwlkc5bsm0r9l4xqGO7G5r6Kp9gezYBD30uH7CCfzD6D62AfA';
  
        $data = [
            "registration_ids" => $firebaseToken,
            "notification" => [
                "title" => $request->title,
                "body" => $request->body,  
            ]
        ];
        $dataString = json_encode($data);
    
        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];
    
        $ch = curl_init();
      
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
               
        $response = curl_exec($ch);
  
        dd($response);
    }

    public function notifyUser(Request $request){
 
        $user = User::where('id', Auth::user()->id)->first();
      
        // $notification_id = $user->notification_id;
        $title = "Greeting Notification";
        $message = "Have good day!";
        $id = $user->id;
        $type = "basic";
      
        $res = send_notification_FCM('eiSFTNPhSGu_fz5T4dh-Eg:APA91bHeIoGunmKNPbRrbvEyjO59-wxIG1i4QYe97rL_5q5hSpJrljpljv2JvxXkQNozLOtk2SgclqZilKBql7USJnxN0QYbaqWR6K6FqMDoKnmcbARSTTYS2fTXLmL58HDuRo0GsEnI', $title, $message, $id,$type);
      
        if($res == 1){
      
            dd('success');
      
        }else{
      
            dd('fail');
        }
         
      
     }
}

