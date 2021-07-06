<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Schema;
// use Intervention\Image\Facades\Image;
// import the Intervention Image Manager Class
use Intervention\Image\Exception\NotReadableException;
use Intervention\Image\ImageManagerStatic as Image;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Validator;
use Modules\Shift\Entities\Shift;
use Modules\History\Entities\History;
use App\User;
use App\Noticeboard;
use App\UserAssign;
use Carbon\Carbon;
use App\UserShift;

function send_notification_FCM($device_tokens, $message) {
 
    $accesstoken = env('FCM_KEY');
    $URL = 'https://fcm.googleapis.com/fcm/send';
 
	$data = [
		"registration_ids" => $device_tokens, // for multiple device ids
		"data" => $message
	];

		$dataString = json_encode($data);
    
        $headers = [
            'Authorization: key=' . $accesstoken,
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
        return json_decode($response)->success;
}

if ( !function_exists('_getUsers') )
{
	function  _getUsers($role, $userId = false, $type = 'shift') {
        // dd($userId);
		if($role){
			$users = User::role($role)->pluck('id')->toArray();
			if($userId){
                if($type == 'assign'){
                    $assigned = UserAssign::where('user_to_id', $userId)->pluck('user_by_id')->toArray();
				    return User::whereIn('id', $assigned)->user()->get();
                }
				$shift = UserShift::where('user_id', $userId)->pluck('shift_id')->toArray();
				return User::whereIn('id', UserShift::whereIn('shift_id', $shift)->whereIn('user_id', $users)->pluck('user_id')->toArray())->user()->get();
			}
			return User::whereIn('id', $users)->user()->get();
		}
    }
}

if(!function_exists('_getTotalExperience')){
    function _getTotalExperience(){
        return [0=>'Fresh',1=>'1 Year',2=>'2 Years',3=>'3 Years',4=>'4 Years',5=>'5 Years',6=>'6 Years',7=>'7 Years',8=>'8 Years',9=>'9 Years',10=>'10 Years'];
    }
}

if(!function_exists('_getLanguages')){
    function _getLanguages(){
        return ['English'=>'English','Urdu'=>'Urdu','Arabic'=>'Arabic','Pushto'=>'Pushto','Sindhi'=>'Sindhi','Punjabi'=>'Panjabi'];
    }
}


if(!function_exists('_getFiqh')){
    function _getFiqh(){
        return ['Ahle-Hadees'=>'Ahle-Hadees','Dubandi'=>'Dubandi','Barelvi'=>'Barelvi','Ahle-Tashi'=>'Ahle-Tashi'];
    }
}

if(!function_exists('_getRefrence')){
    function _getRefrence(){
        return ['facebook'=>'Facebook','google'=>'Google','jung'=>'Jung Newspaper','ummat'=>'Ummat Newspager','friend'=>'Friend','other'=>'Other'];
    }
}


if ( !function_exists('_userRoles') )
{
	function  _userRoles() {

		return Auth::user()->roles->pluck('name')->toArray();
    }
}

if ( !function_exists('_relationGender') )
{
	function  _relationGender($param) {

		if(!empty($param)){
			switch ($param) {
				case 'father':
					$class = 'male';
					break;
				case 'mother':
					$class = 'female';
					break;
				case 'brother':
					$class = 'male';
					break;
				case 'sister':
					$class = 'female';
					break;
				case 'cousin':
					$class = 'male';
					break;
				case 'uncle':
					$class = 'male';
					break;
				case 'aunt':
					$class = 'female';
					break;
			}

			return $class;
		}
        return false;
    }
}

if ( !function_exists('_status') )
{
	function  _status($param) {

		if(!empty($param)){
			switch ($param) {
				case 'active':
					$class = 'primary';
					break;
                case 'new_lead':
                    $class = 'primary';
                    break;
				case 'drop':
					$class = 'danger';
					break;
				case 'followup':
					$class = 'info';
					break;
				case 'converted':
					$class = 'success';
					break;
                case 'completed':
                    $class = 'success';
                    break;
				default:
					$class = 'warning';
					break;
			}

			return $class;
		}
        return false;
    }
}

if ( !function_exists('_splitName') )
{
    function _splitName($name) {
        $name = trim($name);
        $last_name = (strpos($name, ' ') === false) ? '' : preg_replace('#.*\s([\w-]*)$#', '$1', $name);
        $first_name = trim( preg_replace('#'.preg_quote($last_name,'#').'#', '', $name ) );
        return array($first_name, $last_name);
    }
}

if ( !function_exists('_convertTime') )
{
	function  _convertTime($time, $zone, $from = 'pakistan') {

		if(!empty($time) && !empty($zone)){

			date_default_timezone_set($zone);
			$datetime = new DateTime($time);
			$datetime->setTimezone( new DateTimeZone('Asia/Karachi'));

			return $datetime->format('h:i A');
		}
        return false;
    }
}

if ( !function_exists('_attachScripts') )
{
	function  _attachScripts($param = null) {

		if(!empty($param) && is_array($param)){

			$src = '';
			foreach($param as $script):
				$src .= '<script src="'.asset('js/modules/'.$script).'" type="text/javascript"></script>';
			endforeach;

			return $src;
		}
        return false;
    }
}

if ( !function_exists('_getDefaultValue') )
{
	function  _getDefaultValue($param = null) {

		if(!empty($param) && $param == 'from'){

			return Carbon::now();
		}else if(!empty($param) && $param == 'to'){

			return Carbon::now();
		}

        return false;
    }
}

if ( !function_exists('_weekDays') )
{
	function  _weekDays($param = null, $array = false) {
		$gen_array = array();
		if(!empty($param)){
			$param = $param->toArray();
			foreach($param as $week_day){
				array_push($gen_array, implode(', ', array_keys(Arr::only($week_day, ['monday','tuesday','wednesday','thursday','friday','saturday','sunday']),1)));
			}
			return ($array) ? $gen_array : $gen_array[0];
		}

        return false;
    }
}

if ( !function_exists('_age') )
{
	function  _age($param) {

		if(!empty($param)){
            return Carbon::parse($param)->diff(Carbon::now())->format('%y years old');
		}
        return false;
    }
}


if(!function_exists('_time_range')){
    function _time_range($start, $end, $interval = '30 mins', $format = '12') {
        $startTime = strtotime($start);
        $endTime   = strtotime($end);
        $returnTimeFormat = ($format == '12')?'g:i:s A':'G:i:s';
        $returnTimeFormat1 = ($format == '12')?'g:i:s':'G:i:s';

        $current   = time();
        $addTime   = strtotime('+'.$interval, $current);
        $diff      = $addTime - $current;

        $times = array();
        while ($startTime < $endTime) {
            $times[date($returnTimeFormat1, $startTime)] = date($returnTimeFormat, $startTime);
            $startTime += $diff;
        }
        $times[date($returnTimeFormat1, $startTime)] = date($returnTimeFormat, $startTime);
        return $times;
    }
}

	/**
    * change the case of array-keys
    *
    * use: array_change_key_case_ext(array('foo' => 1, 'bar' => 2), ARRAY_KEY_UPPERCASE);
    * result: array('FOO' => 1, 'BAR' => 2)
    *
    * @param    array
    * @param    int
    * @return     array
	*/
if ( !function_exists('_weeks') )
{
    function _weeks() {
		return ['monday'=>'Monday','tuesday'=>'Tuesday','wednesday'=>'Wednesday','thursday'=>'Thursday','friday'=>'Friday','saturday'=>'Saturday','sunday'=>'Sunday'];
	}
}

if ( !function_exists('_getRoleNameFromUserId') )
{
	function  _getRoleNameFromUserId($id = null) {

		if(!empty(User::find($id)->role_id)){

			return Role::find(User::find($id)->role_id)->name;
		}

        return false;
    }
}

if ( !function_exists('_getShift') )
{
	function  _getShift($id) {

        return UserShift::where('user_id', $id)->get();
    }
}

if ( !function_exists('_generateLogs') )
{
	function  _generateLogs($type = null, $title = null, $description = null,
	$user_by_id = null, $user_for_id = null) {

		// Generate Logs
        History::create([
            'type' => ($type) ? $type : '-',
            'title' => $title,
            'description' => $description,
            'user_by_id' => $user_by_id,
            'user_for_id' => $user_for_id,
            'created_at' =>  Carbon::now(),
            'updated_at' => Carbon::now()
		]);

		return true;
    }
}

if ( !function_exists('_tableExist') )
{
	function  _tableExist($table_name = null) {

		if(Schema::hasTable($table_name)){
			return (object) ['status'=>true];
		}

		return (object) ['status'=>false,'message'=>'Table '.$table_name.' does not exist'];
    }
}

if ( !function_exists('_getNoticeBoard') )
{
	function  _getNoticeBoard($type = null) {
		$table = _tableExist('noticeboards');

		if ($table->status) {
			if(count(Noticeboard::where('type',$type)->where('created', '<', date('Y-m-d H:i:s'))->get()->toArray()) > 0){
				return Noticeboard::where('type',$type)->where('created', '<', date('Y-m-d H:i:s'))->get()->toArray();
			}

			return '';
		}

		dd($table->message);
    }
}

if ( !function_exists('_roleAssignToPermission') )
{
	function  _roleAssignToPermission(Request $request) {

		$validator = Validator::make($request->all(), [
            'role_id' => 'required',
            'permission_names' => 'required'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 201);
        }

		if(Role::where(['id'=>$request->input('role_id')])->exists()){
            // $role->syncRoles(Permission::all());
            // Pass the Permission Names
            // $role->givePermissionTo(array('edit articles','view articles'));
            Role::find($request->input('role_id'))->givePermissionTo($request->input('permission_names'));

            return 'Successfully Insert Multiple Permission';
        }

        return 'Record Not Found';
    }
}

if ( !function_exists('_roleAssignToPermission') )
{
	function  _roleAssignToPermission(Request $request) {

		$validator = Validator::make($request->all(), [
            'permission_id' => 'required',
            'role_id' => 'required'
        ]);

        if ($validator->fails()) {

            return response()->json([
                'success' => false,
                'message' => $validator->messages()->first()
            ], 201);
		}

		try{

			if(Role::where(['id'=>$request->input('role_id')])->exists() &&
			Permission::where(['id'=>$request->input('permission_id')])->exists()){
				Permission::find($request->input('permission_id'))->assignRole(Role::find($request->input('role_id')));
			}else{
				return ('Role or Permission Not Exist');
			}

        }catch(Exception $exception){
            return ('Problem in Database');
		}

    }
}

if ( !function_exists('_getSetting') )
{
	function  _getSetting($branch_id = null) {

        return json_decode(app('Modules\Setting\Http\Controllers\SettingController')->record($branch_id)[0]['options'])	;
    }
}

if ( !function_exists('_getLogo') )
{
	function  _getLogo() {

		return getImgUrl('', '', '');
    }
}

if ( !function_exists('_getRoleNameToId') )
{
	function  _getRoleNameToId($name = null) {

        return Role::where('name',$name)->get()->toArray()[0]['id'];
    }
}

if ( !function_exists('_getPermissionNameToId') )
{
	function  _getPermissionNameToId($name = null) {

        return Permission::where('name',$name)->get()->toArray()[0]['id'];
    }
}

if ( !function_exists('_getRoleName') )
{
    // Currently not using
	function  _getRoleName($role_id = null) {

        return Role::find($role_id)->name;
    }
}

if ( !function_exists('_stringToArrayConversion') )
{
    // Currently not using
	function  _stringToArrayConversion($eliminate,$value) {
        return explode($eliminate,$value);
    }
}

if ( !function_exists('_removeFromString') )
{
    // Currently not using
	function  _removeFromString($value,$eliminate) {
        return rtrim($value,$eliminate);
    }
}

if ( !function_exists('_arrayCount') )
{
    // Currently not using
	function  _arrayCount($value) {
        return count($value);
    }
}

if ( !function_exists('_matchId') )
{
    // Currently not using
	function  _matchId($data,$slug) {
        if( strpos( $data, '_id' ) !== false && $data != $slug.'_id')
            return true;

    }
}

if ( !function_exists('_eliminateId') )
{
    // Currently not using
	function  _eliminateId($data,$slug) {
        if( strpos( $data, '_id' ) !== false && $data != $slug.'_id')
            return str_replace("_id","",$data);

    }
}

if ( !function_exists('_eliminateIdGetColumns') )
{
    // Currently not using
	function  _eliminateIdGetColumns($data,$slug) {
        if( strpos( $data, '_id' ) !== false && $data != $slug.'_id')
            return str_replace("_id","",$data);
        else
            return camelCase($data);
    }
}

if ( !function_exists('_eliminateIdToName') )
{
    // Currently not using
	function  _eliminateIdToName($data,$getField) {
        if( strpos( $data, '_id' ) !== false && $data != $slug.'_id')
            return camelCase(str_replace("_id","",$data));
        else
            return camelCase($data);
    }
}

if ( !function_exists('_getValue') )
{
    // Currently not using
	function  _getValue($data, $defaultData = "Null") {
        if($data != "0"){
		if( $data )

			echo $data;

        else
            echo $defaultData;

		}else{
			echo 0;
		}
    }
}

if ( !function_exists('sendMessage') ) {
    function sendMessage($msg, $type) {
        return array(
            'message' => $msg,
            'alert-type' => $type
        );
    }
}

if ( !function_exists('sendMessageAll') ) {
    function sendMessageAll($messages) {
        $data = [];
        foreach($messages as $msg ) {
            data.push( array(
                'message'       => $msg['message'],
                'alert-type'    => $msg['type']
            ) );
        }
        return $data;
    }
}

if ( !function_exists('getImgUrl') ) {
    function getImgUrl($link = null, $id = null, $img = null) {

		// $local_url		= '/storage/';
		// $default_url	= Storage::url('listing-default.jpg');
		$default_url	= 'images/logo.jpg';

		// create an image manager instance with favored driver
		// $manager = new ImageManager(array('driver' => 'imagick'));

		// to finally create image instances
		// $image = $manager->make(Storage::url('listing-default.jpg'))->resize(300, 200);

		// $image = Image::make('data:image/png;base64,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')->save(public_path("a.png"));

		// If no error ...
		// $image->resize(200, null, function ($constraint)
		// {
		// 	$constraint->aspectRatio();
		// });

		/*
			when image will be null or empty then we don't need to
			check other things, just return the default one.
		*/
		if($img == null) {
			return $default_url;
		}
		/*
			In all the conditions either avatars or property_photos
			linking structure is same, hence don't need conditions
		*/
		$url 	= $link.'/'.$id.'/'.$img;

		$exist	= Storage::disk('public')->exists($url);

		return $exist ? $url : $default_url;

    }
}

if ( !function_exists('camelCase') )
{
    // Currently not using
	function  camelCase($data) {

            return ucwords($data);
    }
}

if ( !function_exists('smallLength') )
{
    // Currently not using
	function  smallLength($data,$startPosition,$endPosition) {

			if(strlen($data) <= 10){
				return substr($data,$startPosition,$endPosition);
			}

            return substr($data,$startPosition,$endPosition).'...';
    }
}


if ( !function_exists('_returnNull') )
{
    // Currently not using
	function  _returnNull($data) {

			if(empty($data)){
				return "Null";
			}
			return $data;
    }
}

if ( !function_exists('_p') )
{
	function  _p($data) {

		print_r($data);
		exit();

	}
}

if ( !function_exists('_makeEmpty') )
{
	function  _makeEmpty($id) {

		echo "<script>function makeEmpty(id) {

			document.getElementById('".$id."').innerHTML = '';
		}</script>";

	}
}


if ( !function_exists('_formatText') )
{
	function  _formatText($str) {
		return camelCase(str_replace("_"," ",$str));
	}
}


if ( !function_exists('_nameToSlug') )
{
	function  _nameToSlug($name) {
		return strtolower(str_replace(" ","_",$name));
	}
}

if ( !function_exists('_getData') )
{
	function  _getData($type) {

		if($type == 'belongs_to') {
			return array(
				'Owner',
				'Investor',
				'Freelancer Agent',
				'Real Estate Business',
				'Builder',
				'Developer'
			);
		}	return false;
	}
}

if ( !function_exists('_br2nl') )
{
	function _br2nl($str) {
		return preg_replace("(\<br /\>)", "", $str);
	}
}

// Using library http://image.intervention.io
if ( !function_exists('_saveImage') )
{
	function _saveImage($file, $fileName, $path) {

		/*
			Making each folder if not exist
		*/
		if( !file_exists(public_path($path)) ) {
			$folder = explode("/", $path);
			// Used to remove the storage folder which is available indeed
			array_shift($folder);

			$is_path = "storage";

			for( $i=0; $i < count($folder); $i++ ) {
				$is_path = $is_path . "/" . $folder[$i];
				if( !file_exists(public_path($is_path)) ) {
					mkdir($is_path, 0755);
				}
			}
		}

		$image = Image::make($file->getRealPath());
		$height = $image->height();


		if($height > 2000) {

			// resize the image to a height of 200 and constrain aspect ratio (auto width)
			$image->resize(null, 860, function ($constraint) {
				$constraint->aspectRatio();
			})->save(public_path($path.'/'.$fileName));

		} else {

			$image->save(public_path($path.'/'.$fileName));

		}

	}
}


// Using library http://image.intervention.io
if ( !function_exists('_saveImageBase64') )
{
	function _saveImageBase64($file, $fileName, $path) {

		/*
			Making each folder if not exist
		*/
		if( !file_exists(public_path($path)) ) {
			$folder = explode("/", $path);
			// Used to remove the storage folder which is available indeed
			array_shift($folder);

			$is_path = "storage";

			for( $i=0; $i < count($folder); $i++ ) {
				$is_path = $is_path . "/" . $folder[$i];
				if( !file_exists(public_path($is_path)) ) {
					mkdir($is_path, 0755);
				}
			}
		}

		$image = Image::make($file)->resize(300, 200);
		exit();
		$height = $image->height();


		if($height > 2000) {

			// resize the image to a height of 200 and constrain aspect ratio (auto width)
			$image->resize(null, 860, function ($constraint) {
				$constraint->aspectRatio();
			})->save(public_path($path.'/'.$fileName));

		} else {

			$image->save(public_path($path.'/'.$fileName));

		}

	}
}

if ( !function_exists('_returnWith') )
{
	function _returnWith($msg) {

		switch ( strtolower($msg) ) {
			case 'permission_denied':
			case 'permission denied':
				return redirect()->to(url()->previous())->with( sendMessage('Permission Denied!', 'error') );

			default:
				return null;

		}
	}
}

if ( !function_exists('_generateCode') )
{
	/*
     * returns SMS verification code
     */

    function _generateCode()
    {
        $code = rand(100000, 999999);
        return $code;
    }
}

if ( !function_exists('_generateAccessToken') )
{
    /*
     * returns unique user ID (Access Token)
     */

    function _generateAccessToken(){

        $uuid = '';
        for( $i=0; $i<5; $i++ ) {
            $uuid .= chr( rand( 65, 90 ));
            $uuid .= rand(10,99);
            $uuid .= chr( rand( 97, 122 ));
        }
        return $uuid;
	}
}
