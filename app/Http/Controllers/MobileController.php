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
use App\Patient;
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
        // print_r(Appointment::where('patient_id', $request->input('user_id'))->where('status', 'incomplete')->latest('patient_id')->get()->toArray());
        // exit();
        $validator = Validator::make($request->all(), [
            'clinic_id' => 'required|numeric',
            'doctor_id' => 'required|numeric',
            'patient_id' => 'required|numeric',
            'token_no' => 'required|numeric',
            'patient_name' => 'required',
            'disease_name' => 'required'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        if(count(Appointment::where('patient_id', $request->input('patient_id'))->where('status', 'incomplete')->latest('patient_id')->get()->toArray()) > 0){
            
            return response()->json([
                'success' => false,
                'message' => 'You Already have Appointment'
            ], 401);
            
        }

        $appointment = new Appointment;
        $appointment->doctor_id = $request->input('doctor_id');
        $appointment->clinic_id = $request->input('clinic_id');
        $appointment->patient_id = $request->input('patient_id');
        $appointment->no_of_patient = 0;
        $appointment->token_no = $request->input('token_no');
        $appointment->date = date("Y-m-d");
        $appointment->created_at = Carbon::now();
        $appointment->updated_at = Carbon::now();
        $appointment->probable_start_time = 0;
        $appointment->actual_end_time = 0;
        $appointment->patient_name = $request->input('patient_name');
        $appointment->disease_name = $request->input('disease_name');
        $appointment->save();
        
        // When appintment will insert then we can run the queue for next item
        DoctorPatientToken::dispatch($appointment)->delay(now()->addMinutes(1));
        
        return response()->json([
            'success' => true,
            'message' => 'You have been succesfully Generate Token!'
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

    public function cities(Request $request){

        return response()->json([
            'success' => true,
            'message' => 'Successfully Get List!',
            'city_list' => City::all()
            
        ], 201);
    }

    public function update_profile(Request $request){

        $validator = Validator::make($request->all(), [
            'id' => 'required|numeric',
            'name' => 'required',
            'phone_number' => 'required'
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }

        $avatar = null;

        if ($request->input('avatar') != null) {

            $prevImg = User::find($request->input('id'));
            
            Storage::delete('public/user/'. $request->input('id') . '/' . $prevImg->avatar);
            
            $data = base64_decode($request->input('avatar'));
            $imageName = uniqid() . ".png";
            $is_path = 'storage/user/';
            if( !file_exists(public_path($is_path)) ) {
                mkdir($is_path, 0755);
            }
            file_put_contents($is_path.$imageName, $data);

            
            $user = User::find($request->input('id'));
            
            $user->avatar = 'https://easyclinic.yedekhen.com/storage/user/'.$imageName;
            $user->update();

            $avatar = 'https://easyclinic.yedekhen.com/storage/user/'.$imageName;

        }else{

            $user = User::find($request->input('id'));
            if($user->avatar != null){
                $avatar = $user->avatar;
            }else{
                $avatar = 'https://pngimage.net/wp-content/uploads/2018/06/icon-pasien-png-4.png';
            }
            
        }

        $user = User::find($request->input('id'));
      
        if($request->input('name') != ''){
            $user->name = $request->input('name');
        }
        
        if( $request->input('phone_number') != ''){
            $user->phone_number = $request->input('phone_number');
        }
      
            $user->role = 'patient';

        $user->save();

        return response()->json([
            'success' => true,
            'message' => 'Successfully Profile Updated!',
            'user' => [
                'id' => $request->input('id'),
                'avatar' => $avatar,
                'name' => $request->input('name'),
                'email' => User::find($request->input('id'))->email
            ]
            
        ], 201);
    }

    public function doctor_list_search(Request $request){

        // name, avatar, rate, speciality, clinic_name,  
        $list = User::select('speciality.name as speciality_name','clinic.name as clinic_name','users.address as address','users.name as name',
        'users.avatar as avatar',
        'doctor.fee as fee','doctor.rate as rate','doctor.id as doctor_id','clinic.id as clinic_id','users.id as users_id','clinic.latitude as lat','clinic.longitude as lng')
        ->where('role_id', _getRoleNameToId('Doctor'))
        ->join('doctor', 'doctor.users_id', '=', 'users.id')
        ->join('clinic', 'doctor.clinic_id', '=', 'clinic.id')
        ->join('speciality', 'doctor.speciality_id', '=', 'speciality.id')
        // ->where('users.name', 'like', '%'.$request->input('name').'%')
        ->get();
        
        $i = 0;
        $data = null;
        foreach($list as $item){

            $data[$i]['speciality_name'] = $item->speciality_name;
            $data[$i]['clinic_name'] = $item->clinic_name;
            $data[$i]['address'] = $item->address;
            $data[$i]['name'] = $item->name;
            $data[$i]['avatar'] = $item->avatar;
            $data[$i]['fee'] = $item->fee;
            $data[$i]['rate'] = $item->rate;
            $data[$i]['doctor_id'] = $item->doctor_id;
            $data[$i]['lat'] = $item->lat;
            $data[$i]['lng'] = $item->lng;
            $data[$i]['users_id'] = $item->users_id;
            $data[$i]['clinic_id'] = $item->clinic_id;
            $data[$i]['timeslot'] = User::select(DB::raw("TIME_FORMAT(doctor_timeslot.start_time, '%h %p') as start_time"), DB::raw("TIME_FORMAT(doctor_timeslot.end_time, '%h %p') as end_time"),'doctor_timeslot.day_of_week as week','users.id as users_id')
            ->where('role_id', _getRoleNameToId('Doctor'))
            ->join('doctor_timeslot', 'users.id', '=', 'doctor_timeslot.users_id')
            ->where('users.id', $item->users_id)
            ->get();
            
            $distance = '0';

            if(!empty($request->input('lat')) && !empty($request->input('lng'))){
                $distance = $this->GetDrivingDistance($request->input('lat'), $request->input('lng'), $item->lat, $item->lng);
            }

            $data[$i]['distance'] = $distance;

            $i++;
        }

//https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon-by-vexels.png
        
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Successfully Get List!'
            
        ], 201);
    }

    public function doctor_list_nearby(Request $request){

        $validator = Validator::make($request->all(), [
            'lat' => 'required',
            'lng' => 'required',
        ]);
        
        if ($validator->fails()) {
            
            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 401);
        }
        
        $clinic = Clinic::select('*', DB::raw('SQRT( POW(69.1 * (latitude - '.$request->input('lat').'), 2) + POW(69.1 * ('.$request->input('lng').' - longitude) * 
        COS(latitude / 57.3), 2)) AS distance'))
        ->having('distance', '<', 25)
        ->orderBy('distance')->get()->toArray();

        $list = User::select('speciality.name as speciality_name','clinic.name as clinic_name','clinic.address_name as address','users.name as name',
        'users.avatar as avatar',
        'doctor.fee as fee','doctor.rate as rate','doctor.id as doctor_id','users.id as users_id','clinic.id as clinic_id','clinic.latitude as lat','clinic.longitude as lng')
        ->where('role_id', _getRoleNameToId('Doctor'))
        ->join('doctor', 'doctor.users_id', '=', 'users.id')
        ->join('clinic', 'doctor.clinic_id', '=', 'clinic.id')
        ->join('speciality', 'doctor.speciality_id', '=', 'speciality.id');
        if(count($clinic) > 0){
            $c=0;
            $list = $list->where('doctor.clinic_id', $clinic[0]['id']);
            foreach($clinic as $item){
                if($c++ != 0){
                    $list = $list->orWhere('doctor.clinic_id', $item['id']);
                }
            }

        }else{
            return response()->json([
                'success' => false,
                'message' => "Don't have a list!"
            ], 401);
        }

        // $list = $list->where('users.name', 'like', '%'.$request->input('name').'%');
        $list = $list->get();
        
        $i = 0;
        foreach($list as $item){

            $data[$i]['speciality_name'] = $item->speciality_name;
            $data[$i]['clinic_name'] = $item->clinic_name;
            $data[$i]['address'] = $item->address;
            $data[$i]['name'] = $item->name;
            $data[$i]['avatar'] = $item->avatar;
            $data[$i]['fee'] = $item->fee;
            $data[$i]['rate'] = $item->rate;
            $data[$i]['doctor_id'] = $item->doctor_id;
            $data[$i]['lat'] = $item->lat;
            $data[$i]['lng'] = $item->lng;
            $data[$i]['users_id'] = $item->users_id;
            $data[$i]['clinic_id'] = $item->clinic_id;
            $data[$i]['timeslot'] = User::select(DB::raw("TIME_FORMAT(doctor_timeslot.start_time, '%h %p') as start_time"),DB::raw("TIME_FORMAT(doctor_timeslot.end_time, '%h %p') as end_time"),'doctor_timeslot.day_of_week as week','users.id as users_id')
            ->where('role_id', _getRoleNameToId('Doctor'))
            ->join('doctor_timeslot', 'users.id', '=', 'doctor_timeslot.users_id')
            ->where('users.id', $item->users_id)
            ->get();

            $distance = '0';

            if(!empty($request->input('lat')) && !empty($request->input('lng'))){
                $distance = $this->GetDrivingDistance($request->input('lat'), $request->input('lng'), $item->lat, $item->lng);
            }

            $data[$i]['distance'] = $distance;
            
            $i++;
        }

//https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon-by-vexels.png
        
        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Successfully Get List!'
            
        ], 201);
        
    }

    public function doctor_rating(Request $request){
        $doctor = Doctor::where('users_id', User::find($request->input('users_id'))->id)->get();
        $clinic = Clinic::find(Doctor::where('users_id', User::find($request->input('users_id'))->id)->get('clinic_id'));
        
        $data['name'] = $clinic[0]['name'];
        $data['avatar'] = 'https://images.vexels.com/media/users/3/151709/isolated/preview/098c4aad185294e67a3f695b3e64a2ec-doctor-avatar-icon-by-vexels.png';
        $data['date'] = '01-20-2020';
        $data['rating'] = $doctor[0]['rating'];

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Successfully Get Doctor!'
        ], 201);
    }

    public function doctor_view(Request $request){
        $doctor = Doctor::where('users_id', User::find($request->input('users_id'))->id)->get();
        $clinic = Clinic::find(Doctor::where('users_id', User::find($request->input('users_id'))->id)->get('clinic_id'));
        
        $data['name'] = $clinic[0]['name'];
        $data['clinic_open_time'] = $clinic[0]['clinic_open_time'];
        $data['clinic_close_time'] = $clinic[0]['clinic_close_time'];
        $data['phone_number'] = $clinic[0]['phone_number'];
        $data['clinic_code'] = $clinic[0]['clinic_code'];
        $data['address_name'] = $clinic[0]['address_name'];
        $data['qualification_name'] = $doctor[0]['qualification_name'];
        $data['institute_name'] = $doctor[0]['institute_name'];
        $data['experience_year'] = $doctor[0]['experience_year'];
        $data['fee'] = $doctor[0]['fee'];

        return response()->json([
            'success' => true,
            'data' => $data,
            'message' => 'Successfully Get Doctor!'
        ], 201);
    }

    public function book_appointment_view(Request $request){

        $address = Clinic::where('id', $request->input('clinic_id'))
        ->get()[0]['address_name'];

        $lat = Clinic::where('id', $request->input('clinic_id'))
        ->get()[0]['latitude'];

        $lng = Clinic::where('id', $request->input('clinic_id'))
        ->get()[0]['longitude'];
        
        $current_token = 0;

        if(count(Appointment::where('clinic_id', $request->input('clinic_id'))->where('doctor_id', $request->input('users_id'))->get()->toArray()) > 0){
            
            $current_token = Appointment::where('clinic_id', $request->input('clinic_id'))->where('doctor_id', $request->input('users_id'))
                ->latest('token_no')
                ->get()[0]['token_no'];
            
        }

        $current_serve = 0;

        if(count(Appointment::where('clinic_id', $request->input('clinic_id'))->where('doctor_id', $request->input('users_id'))->where('status', 'complete')->get()->toArray()) > 0){
            
            $current_serve = Appointment::where('clinic_id', $request->input('clinic_id'))->where('doctor_id', $request->input('users_id'))->where('status', 'complete')
                ->latest('token_no')
                ->get()[0]['token_no'];
            
        }

        return response()->json([
            'success' => true,
            'current_token' => ($current_token==0) ? 0 : ++$current_serve,
            'serve_no' => (++$current_token),
            'address' => $address,
            'lat' => $lat,
            'lng' => $lng,
            'message' => 'Successfully Appointment Confirmed!'
        ], 201);
    }

    public function booked_appointment_view(Request $request){

        $current_serve = Appointment::where('status', 'complete')
            ->latest('token_no')
            ->get();
        
        if(count($current_serve->toArray()) > 0){
            $current_serve = $current_serve[0]['token_no'];
        }else{
            $current_serve = 0;
        }

        if(count(Appointment::where('patient_id', $request->input('user_id'))->get()->toArray()) > 0){
            
            $current_token = Appointment::where('patient_id', $request->input('user_id'))
                ->latest('token_no')
                ->get()[0]['token_no'];
            
        }

        return response()->json([
            'success' => true,
            'your_token_number' => $current_token,
            'serve_no' => ($current_serve++),
            'message' => 'View Appointment!'
        ], 201);
    }

    public function scheduled_appointment(Request $request){

        if(count(Appointment::where('patient_id', $request->input('user_id'))->where('status', '!=' , 'cancel')->get()->toArray()) > 0){

            $clinic_id = Appointment::where('patient_id', $request->input('user_id'))
            ->get()[0]['clinic_id'];

            $doctor_id = Appointment::where('patient_id', $request->input('user_id'))
            ->get()[0]['doctor_id'];


            $date = Appointment::where('patient_id', $request->input('user_id'))
            ->get()[0]['date'];

            $clinic_name = Clinic::find($clinic_id)
            ->get()[0]['name'];

            $address = Clinic::find($clinic_id)
            ->get()[0]['address_name'];

            $lat = Clinic::find($clinic_id)
            ->get()[0]['latitude'];

            $lng = Clinic::find($clinic_id)
            ->get()[0]['longitude'];

            $doctor_name = User::where('id',$doctor_id)
            ->get()[0]['name'];

        }else{
            
            return response()->json([
                'success' => false,
                'message' => 'Appointment Not Exist'
            ], 401);
           
        }


        return response()->json([
            'success' => true,
            'data' => [array(
            'avatar'=>'https://pngimage.net/wp-content/uploads/2018/06/icon-pasien-png-4.png',
            'doctor_name' => ($doctor_name),
            'clinic_name' => ($clinic_name),
            'address' => $address,
            'lat' => $lat,
            'lng' => $lng,
            'date' => $date
            )],
            'message' => 'View Appointment!'
        ], 201);
    }

    public function confirm_appointment(Request $request){

        $serve_no = $current_token;

        return response()->json([
            'success' => true,
            'data' => [$current_token,++$serve_no],
            'message' => 'Successfully Appointment Confirmed!'
        ], 201);
    }

    public function dashboard_after_book_appointment(Request $request){
        $list = Appointment::where('appointment.clinic_id', $request->input('clinic_id'))
        ->where('doctor_id', $request->input('doctor_id'))
        ->where('patient_id', $request->input('patient_id'))
        ->join('doctor', 'doctor.id', '=', 'appointment.doctor_id')
        ->join('clinic', 'clinic.id', '=', 'appointment.clinic_id')
        ->get()
        ->toArray();

        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Appointment Record!'
        ], 201);
    }

    public function clinic_list_search(Request $request){
        $list = Clinic::orWhere('name', 'like', '%'.$request->input('name').'%')->get();
        
        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Clinic List!'
        ], 201);
    }

    public function clinic_list_nearby(Request $request){
        $list = Clinic::select('*', DB::raw('SQRT( POW(69.1 * (latitude - '.$request->input('lat').'), 2) + POW(69.1 * ('.$request->input('lng').' - longitude) * 
        COS(latitude / 57.3), 2)) AS distance'))
        ->having('distance', '<', 25)
        ->orderBy('distance')->get()->toArray();

        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Clinic List!'
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

    public function my_appointment(Request $request){
        $list = Appointment::where('patient_id', $request->input('patient_id'))
        ->get()
        ->toArray();

        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get My Appointment!'
        ], 201);
    }

    public function cancel_appointment(Request $request){
        
        $data = Appointment::where('patient_id',  $request->input('patient_id'))
        ->latest('patient_id')
        ->get();

        try{
            if($data[0]['status'] == 'incomplete'){
                $package = Appointment::find($data[0]['id']);
                $package->status = 'cancel';
                $package->updated_at = Carbon::now();
                $package->update();
            }

        }catch(Exception $ex){
            return redirect(URL('human_resource/department'))->with( sendMessage("Can't Cancel Status", 'info') );
        }


        return response()->json([
            'success' => true,
            'message' => 'Appointmen Cancelled Successfully'
        ], 201);
    }

    public function list_appointment(Request $request){
        $list = Appointment::select(array('users.name as doctor_name','appointment.date','clinic.name as clinic_name','speciality.name as speciality_name'))
        ->where('patient_id',  $request->input('patient_id'))
        ->join('users', 'users.id', '=', 'appointment.doctor_id')
        ->join('doctor', 'doctor.users_id', '=', 'appointment.doctor_id')
        ->join('speciality', 'speciality.id', '=', 'doctor.speciality_id')
        ->join('clinic', 'clinic.id', '=', 'appointment.clinic_id')
        ->get();
       
        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Appointment View!'
        ], 201);
    }

    public function view_appointment(Request $request){
        $list = Appointment::find($request->input('appointment_id'))->date;
       
        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Appointment View!'
        ], 201);
    }

    public function notification_list(){
        $list = Notification::all()->toArray();
        
        return response()->json([
            'success' => true,
            'data' => $list,
            'message' => 'Successfully Get Notification List!'
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

}

  