<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\DB as myDB;
//use Request;
use Session;
use Illuminate\Support\Facades\Input;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use App\City;
use App\Hospital;
use App\Doctor;
use App\User;
use App\Clinic;
use App\Appointment;
use App\Notification;
use App\Jobs\DoctorPatientToken;
use Carbon\Carbon;
use App\OauthAccessToken;

class MobileController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    protected $instance;
    public function __construct()
    {
        
    }

    public function generate_token(Request $request)
    {
        
        $validator = Validator::make($request->all(), [
            'hospital_id' => 'required|numeric',
            'user_id' => 'required|numeric',
            'reason' => 'required'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        $appointment = new Appointment;
        $appointment->hospital_id = $request->input('hospital_id');
        $appointment->user_id = $request->input('user_id');
        $appointment->created_at = Carbon::now();
        $appointment->updated_at = Carbon::now();
        $appointment->reason = $request->input('reason');
        $appointment->save();
        
        // When appintment will insert then we can run the queue for next item
        // DoctorPatientToken::dispatch($appointment)->delay(now()->addMinutes(1));
        
        return response()->json([
            'success' => true,
            'message' => 'You have succesfully Appointment!'
        ], 201);
    }

    public function get_current_distance(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'clinic_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }
        
        $loc = Clinic::find($request->input('clinic_id'))->location_id;
        
        return response()->json([
            'success' => true,
            'data' => [$loc->latitude,$loc->longitude,$loc->address_name],
            'message' => 'You have been succesfully get Distance!'
        ], 201);
    }

    public function get_current_expected_time(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'clinic_id' => 'required',
            'doctor_id' => 'required',
            'patient_id' => 'required'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        $current_token = Appointment::where('clinic_id',$request->input('clinic_id'))->
        where('doctor_id',$request->input('doctor_id'))->
        where('status','incomplete')->
        orderBy('id','DESC')->
        get()->toArray()[0]['token_no'];

        $my_token = Appointment::where('clinic_id',$request->input('clinic_id'))->
        where('doctor_id',$request->input('doctor_id'))->
        where('patient_id',$request->input('patient_id'))->
        where('status','incomplete')->
        orderBy('id','DESC')->
        get()->toArray()[0]['token_no'];

        $token_diff = (Appointment::where('clinic_id',$request->input('clinic_id'))
        ->where('doctor_id',$request->input('doctor_id'))
        ->where('patient_id',$request->input('patient_id'))
        ->where('status','incomplete')
        ->orderBy('id','DESC')
        ->get()->toArray()[0]['token_no'])-(Appointment::where('clinic_id',$request->input('clinic_id'))
        ->where('doctor_id',$request->input('doctor_id'))
        ->where('status','incomplete')
        ->orderBy('id','DESC')
        ->get()
        ->toArray()[0]['token_no']);

        return response()->json([
            'success' => true,
            'data' => $token_diff,
            'message' => 'You have been succesfully Expect Time!'
        ], 201);
    }

    /**
     * Login user and create token
     * @param  [string] email
     * @param  [string] password
     * @param  [boolean] remember_me
     * @return [string] access_token
     * @return [string] token_type
     * @return [string] expires_at
     * php artisan passport:install
     * Personal access client created successfully.
     * Client ID: 1
     * Client secret: Dr4zYBmrkU6Ucgkaj57bft9bdLBG98ZIM1ltAY4c
     * Password grant client created successfully.
     * Client ID: 2
     * Client secret: tMv37fLX1znGjf9iHk98vkwmPnZ3lwymBN8kvYCE
     */
    public function sign_in(Request $request){
        
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|min:6'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'success' => false,
                'message' => 'Authentication Failed'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken('EasyClinic');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        User::find($user->id)->update(['device_token'=>$request->device_token]);

        if(empty($user->avatar)){
            $user->avatar = 'https://pngimage.net/wp-content/uploads/2018/06/icon-pasien-png-4.png';
        }

        return response()->json([
            'success' => true,
            'access_token' => $tokenResult->token->id,
            'token_type' => 'Bearer',
            'message' => 'Successfully Authenticated!',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'avatar' => $user->avatar
            ]
            
        ], 201);

    }

    /**
     * Logout user (Revoke the token)
     *
     * @return [string] message
     */
    public function logout(Request $request)
    {
        if(!empty($request->input('access_token'))){
            OauthAccessToken::find($request->input('access_token'))->delete();
        }

        return response()->json([
            'success' => true,
            'message' => 'You have been succesfully logged out!'
        ], 201);
    }

    /**
     * Create user
     *
     * @param  [string] name
     * @param  [string] email
     * @param  [string] password
     * @param  [string] password_confirmation
     * @return [string] message
     */
    public function sign_up(Request $request){

        $validator = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'name' => 'required|string|max:50',
            'phone_number' => 'required|string|max:50',
            'address' => 'required|string|max:50',
            'password' => 'required|confirmed|min:6'
        ]);

     
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }
        
        // if(!empty(User::orderBy('id', 'desc')->first())){
        //     $val = preg_split('#(?<=\d)(?=[a-z])#i', User::orderBy('id', 'desc')->first()->user_code);
        //     $num = ++$val[0];
        //     // $alp = $val[1];
        //     $alp = 'US';
        // }else{
        //     $num = 1;
        //     $alp = 'US';
        // }
        
        $user = new User;
        $user->name = $request->input('name');
        $user->email = $request->input('email');
        $user->phone_number = $request->input('phone_number');
        $user->address = $request->input('address');
        $user->role = 'patient';
        $user->password = bcrypt($request->input('password'));
        // $user->user_code = $num.$alp;
        $user->save();

        $credentials = request(['email', 'password']);
        if(!Auth::attempt($credentials))
            return response()->json([
                'success' => false,
                'message' => 'Authentication Failed'
            ], 401);

        $user = $request->user();
        $tokenResult = $user->createToken('EasyClinic');
        $token = $tokenResult->token;
        if ($request->remember_me)
            $token->expires_at = Carbon::now()->addWeeks(1);
        $token->save();

        if(empty($user->avatar)){
            $user->avatar = 'https://pngimage.net/wp-content/uploads/2018/06/icon-pasien-png-4.png';
        }

        return response()->json([
            'success' => true,
            'access_token' => $tokenResult->token->id,
            'token_type' => 'Bearer',
            'message' => 'Successfully Create Account!',
            'expires_at' => Carbon::parse(
                $tokenResult->token->expires_at
            )->toDateTimeString(),
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'avatar' => $user->avatar
            ]
            
        ], 201);
        
    }

    public function my_profile(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }
 
        $user = User::find($request->input('id'));
       
        if($user->avatar != null){
            
        }else{
            $user->avatar = 'https://pngimage.net/wp-content/uploads/2018/06/icon-pasien-png-4.png';
        }
        
        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'user' => [
                'id' => $user->id,
                'email' => $user->email,
                'name' => $user->name,
                'avatar' => $user->avatar,
                'address' => $user->address,
                'phone_number' => $user->phone_number,
                'gender' => $user->gender
            ]
            
        ], 201);
    }
    
    public function update_profile(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric',
            'name' => 'required',
            'address' => 'required',
            'phone_number' => 'required'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        $user = User::find($request->input('id'));
      
        if($request->input('name') != ''){
            $user->name = $request->input('name');
        }
        
        if($request->input('address') != ''){
            $user->address = $request->input('address');
        }
       
        if( $request->input('phone_number') != ''){
            $user->phone_number = $request->input('phone_number');
        }

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Successfully Profile Updated!',
            'user' => [
                'id' => $request->input('id'),
                'name' => $request->input('name'),
                'email' => User::find($request->input('id'))->email
            ]
            
        ], 201);
    }

    public function class_routine(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric'
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => DB::select('select * from class_routine where user_id = '.$request->user_id)
            
        ], 201);
    }

    public function payment_list(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric',
        ]);

        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        $status = '';
        $year = '';

        if(!empty($request->year)){
            $year = ' AND year(payment.date) = '.$request->year;
        }else{
            $year = ' AND year(payment.date) = '.date('Y');
        }

        if(!empty($request->status)){
            $status = " AND payment.status = '".$request->status."'";
        }

        $list = DB::select("select 
                DATE_FORMAT(m1, '%b %Y') AS month, IFNULL((SELECT status FROM payment WHERE month(payment.date) = DATE_FORMAT(m1, '%m')
                and  year(payment.date) = DATE_FORMAT(m1, '%Y') AND user_id = $request->user_id $year $status LIMIT 1),'-') AS status
                
                from
                (
                select 
                (
                    (SELECT min(DATE) FROM payment WHERE user_id = $request->user_id $year $status LIMIT 1) - INTERVAL DAYOFMONTH((SELECT min(DATE) FROM 
                    payment WHERE user_id = $request->user_id $year $status LIMIT 1))-1 DAY) 
                    +INTERVAL m MONTH as m1
                    from
                    (
                    select @rownum:=@rownum+1 AS m from
                        (select 1 union select 2 union select 3 union select 4) t1,
                        (select 1 union select 2 union select 3 union select 4) t2,
                        (select 1 union select 2 union select 3 union select 4) t3,
                        (select 1 union select 2 union select 3 union select 4) t4,
                        (select @rownum:=-1) t0
                    ) d1
                ) d2
                where m1<=(SELECT max(DATE) FROM payment WHERE user_id = $request->user_id $year $status LIMIT 1)
            order by m1");

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => $list
            
        ], 201);
    }

    public function notification(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric'
        ]);
        
        $list = DB::select('select name as title,name as month from class_routine 
        where user_id = '.$request->user_id.' order by id asc limit '.$request->current_page.','.$request->next_page);
        if(empty($list)){
            $list = null;
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => $list
            
        ], 201);

    }

    public function issue(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric'
        ]);
        
        $list = DB::select('select reason as title from issues 
        where user_id = '.$request->user_id.' order by id asc limit '.$request->current_page.','.$request->next_page);
        if(empty($list)){
            $list = null;
        }

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => $list
            
        ], 201);

    }

    public function report_list(Request $request){

        $validator = Validator::make($request->all(), [
            'user_id' => 'required|numeric'
        ]);
        
        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => DB::select('select name as title,name as month from class_routine where user_id = '.$request->user_id)
            
        ], 201);
    }

    public function course_list(Request $request){

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => DB::select('select name, id from users')
        ], 201);
    }

    public function subject_list(Request $request){

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => DB::select('select subject.name, subject.id from subject where subject.user_id = '.$request->user_id)
        ], 201);
    }

    public function is_class_time_active(Request $request){

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'data' => DB::select('SELECT 
            if(((TIMESTAMPDIFF(MINUTE, time(NOW()), time(START)) > -10) AND 
            (TIMESTAMPDIFF(MINUTE, time(NOW()), time(START)) < 10)), 1, 0) AS is_avail
            ,TIME_FORMAT(TIMEDIFF(time(NOW()), time(START)), "%H") AS hours,
            TIME_FORMAT(TIMEDIFF(time(NOW()), time(START)), "%i") AS minutes,
            TIME_FORMAT(TIMEDIFF(time(NOW()), time(START)), "%s") AS seconds,
            if(((TIMESTAMPDIFF(MINUTE, time(NOW()), time(START)) > 0) AND 
            (TIMESTAMPDIFF(MINUTE, time(NOW()), time(START)) < 10)), 1, 0) AS check_signature 
            FROM class_routine WHERE (Date(START) = Date(NOW())) and
                        user_id = '.$request->user_id)
        ], 201);
    }
    
    public function hospital_list_nearby(Request $request){
        
        // DB::raw('SQRT( POW(69.1 * (lat - '.$request->input('lat').'), 2) + POW(69.1 * ('.$request->input('lng').' - lng) * 
        // COS(lat / 57.3), 2)) AS distance')
        // )

        // $list = Hospital::select('*', DB::raw(
        // '(
        //     3959 * acos (
        //       cos ( radians(78.3232) )
        //       * cos( radians( '.$request->input('lat').' ) )
        //       * cos( radians( '.$request->input('lng').' ) - radians(65.3234) )
        //       + sin ( radians(78.3232) )
        //       * sin( radians( '.$request->input('lat').' ) )
        //     )
        //   ) AS distance'
        // ))
        // $list = Hospital::select('*', 
        //     DB::raw('SQRT( POWER(170.1 * (lat - '.$request->input('lat').'), 2) + POWER(69.1 * ('.$request->input('lng').' - lng) * 
        //     COS(lat / 57.3), 2)) AS distance')
        // )
        // ->having('distance', '<', 10)
        // ->orderBy('distance')->get()->toArray();
        // $list = Hospital::get()->toArray();

        $list = DB::select("SELECT *, (
            SQRT( POWER(170.1 * (lat - ".$request->input('lat')."), 2) + POWER(69.1 * (".$request->input('lng')." - lng) * 
            COS(lat / 57.3), 2))) AS distance FROM hospitals WHERE  (
            SQRT( POWER(170.1 * (lat - ".$request->input('lat')."), 2) + POWER(69.1 * (".$request->input('lng')." - lng) * 
            COS(lat / 57.3), 2))) < 10");
    
        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Hospital List!'
        ], 201);
    }

    //on click clinic name
    public function clinic_doctor_availability(Request $request){
        $list = Doctor::where('clinic_id', $request->input('clinic_id'))
        ->join('users', 'users.id', '=', 'doctor.users_id')
        ->get()
        ->toArray();

        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Doctor Availability!'
        ], 201);
    }

    public function add_issue(Request $request){
        $list = DB::select("insert into issues (reason,user_id) values ('".$request->reason."',".$request->user_id.")");

        return response()->json([
            'success' => true,
            'message' => 'Successfully Insert Issue!'
        ], 201);
    }

    public function distanceInKmBetweenEarthCoordinates($lat1, $lon1, $lat2, $lon2) {
            
        $p = 0.017453292519943295;    // Math.PI / 180
        
        
        $a = 0.5 - cos(($lat2 - $lat1) * $p)/2 + 
        cos($lat1 * $p) * cos($lat2 * $p) * 
        (1 - cos(($lon2 - $lon1) * $p))/2;

        return 12742 * asin(sqrt($a)); // 2 * R; R = 6371 km
    }

    //https://stackoverflow.com/questions/29003118/get-driving-distance-between-two-points-using-google-maps-api
    function GetDrivingDistance($lat1 = null, $long1 = null, $lat2 = null, $long2 = null)
    {

        $url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins=".$lat1.",".$long1."&destinations=".$lat2.",".$long2."&mode=driving&language=pl-PL&key=AIzaSyCxc6Gh1YC4FI1f2zLAbmrdYyQ24JWK9mo";
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
        $response = curl_exec($ch);
        curl_close($ch);
        $response_a = json_decode($response, true);

        $dist = 0;
        $time = 0; 

        if(!empty($response_a['rows'])){
            if(!empty($response_a['rows'][0]['elements'][0]['distance'])){
                $dist = $response_a['rows'][0]['elements'][0]['distance']['text'];
                $time = $response_a['rows'][0]['elements'][0]['duration']['text'];
            }else{
                $distance = $this->distanceInKmBetweenEarthCoordinates($lat1, $long1, $lat2, $long2);
                $distance_mile = $distance * 0.62137119224;
                $distance_nautical_miles = $distance * 0.539957;
                $distance_meters = $distance * 1000;

                $dist = $distance_meters.' m';
            }
        }
        
        return $dist;
    }

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function send(Request $request)
    {
        $token = User::find($request->user_id)->device_token;
        return $this->sendNotification(array(
            $token
        ), array(
          "title" => "Sample Message", 
          "body" => "This is Test message body"
        ));
    }
  
    /**
     * Write code on Method
     *
     * @return response()
     */
    public function sendNotification($device_tokens, $message)
    {
        $SERVER_API_KEY = 'AAAAVHkNacE:APA91bFnLZMj56RXygZhIGGYddXGGqMTlwD4Q9CmTc2O-JYUWuSWjiG7ohRxp-gUjdtIpDlFFFMS77nEwSuSULcxJe-sVgfTxZ1rHbfrjPnqOOt2SH-rj_svxEnJrOXKCrvfdvvgszoJ';
        
        $data = [
            "registration_ids" => $device_tokens, // for multiple device ids
            "notification" => $message
        ];
        $dataString = json_encode($data);
        // print_r($dataString);die;
        $headers = [
            'Authorization: key=' . $SERVER_API_KEY,
            'Content-Type: application/json',
        ];
    
        $ch = curl_init();
      
        curl_setopt($ch, CURLOPT_URL, 'https://fcm.googleapis.com/fcm/send');
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $dataString);
               
        $response = curl_exec($ch);
      
        curl_close($ch);
        return $response;
    }

}

