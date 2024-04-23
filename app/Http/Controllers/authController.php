<?php

namespace App\Http\Controllers;

use App\Mail\KodeVerifikasiMail;
use App\Models\MailVerification;
use App\Models\role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use App\Models\PasswordResetToken;
use Illuminate\Support\Str;

class authController extends Controller
{
    // public function getData(string $id){
    //     $token = MailVerification::where('user_id', $id)->first();
        
    //     // $data = User::with('roles', 'emailVerified')->get()->toArray();
    //     if($token == null){
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'data user tidak ditemukan'
    //         ], 404);
    //     }

    //     $idtoken = $token->token;
        


    //     return response()->json([
    //         'status' => true,
    //         'message' => 'data user',
    //         // 'data' => $data,
    //         'token' => $idtoken
    //     ], 200);
    // }

    public function refreshVerificationToken(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'idtoken' => 'required|string|min:10',
            'email' => 'required|email',
        ], [
            'idtoken.required' => 'Token tidak boleh kosong',
            'email.email' => 'Masukan email yang valid',
            'idtoken.min' => 'Token terlalu pendek :min characters.',
            'email.required' => 'Email tidak boleh kosong'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses validasi gagal',
                'data' => $validator->errors()
            ], 401);
        }

        $idtokenbaru = Crypt::decrypt($request->idtoken); //$request->idtoken;
        // dd($idtoken);

        // $datauser = new User();
        // $datamail = new MailVerification();

        

        $data = MailVerification::where('user_id', $idtokenbaru)->where('email', $request->email)->first();


        // dd($data);
        if($data == null || $data->user_id == null){
            return response()->json([
                'status' => false,
                'message' => 'data user tidak ditemukan'
            ], 404);
        }

        if($data->expires_at > now()){
            return response()->json([
                'status' => false,
                'message' => 'token aktif'
            ], 403);
        }

        $refreshtoken = rand(100000, 999999);

        $data->user_id = $idtokenbaru;
        $data->token = $refreshtoken;
        $data->email = $request->email;
        $data->expires_at = now()->addMinutes(2);
        $data->update();

        $idtoken = Crypt::encrypt($data->user_id);

        Mail::to($request->email)->send(new KodeVerifikasiMail($refreshtoken));

        return response()->json([
            'status' => true,
            'message' => 'berhasil refresh data baru',
            'idtoken' => $idtoken,

        ], 201);
        
    }

    public function verificationToken(Request $request) 
    {
        // dd($request);
        
        $validator = Validator::make($request->all(), [
            'idtoken' => 'required|string|min:10',
            'token' => 'required|string',
        ], [
            'idtoken.required' => 'ID Token tidak boleh kosong',
            'idtoken.min' => 'ID Token terlalu pendek :min characters.',
            'token.required' => 'Token tidak boleh kosong'
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses validasi gagal',
                'data' => $validator->errors()
            ], 401);
        }

        $id = Crypt::decrypt($request->idtoken);
        $token = $request->token;
        
        $datamail = MailVerification::where('token', $token)->first();

        // dd($datamail);

        if($datamail == null || $id != $datamail->user_id){
            return response()->json([
                'status' => false,
                'message' => 'data user tidak ditemukan'
            ], 404);
        }

        if($datamail->expires_at <= now()){
            return response()->json([
                'status' => false,
                'message' => 'token expired'
            ], 401);

        }

        $user = User::find($id);
        if($user == null){
            return response()->json([
                'status' => false,
                'message' => 'data user tidak ditemukan'
            ], 404);
        }

        $user->email_verified_at = now();
        $user->verified = 1;
        $user->update();

        $datamail->delete();

        return response()->json([
            'status' => true,
            'message' => 'email terverifikasi',
        ], 200);

    }

    
    public function registerUser(Request $request)
    {
        $datauser = new User();
        $datamail = new MailVerification();
    

        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
        ], [
            'name.required' => 'Nama tidak boleh kosong.',
            'email.required' => 'Email tidak boleh kosong.',
            'email.email' => 'Masukan email yang valid.',
            'email.unique' => 'Email sudah terdaftar.',
            'password.required' => 'Password tidak boleh kosong.',
            'password.min' => 'Password terlalu pendek :min characters.',
            'password.confirmed' => 'Password tidak sama.',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses validasi gagal',
                'data' => $validator->errors()
            ], 401);
        }

        $datauser->name = $request->name;
        $datauser->email = $request->email;
        $datauser->password = Hash::make($request->password);
        $datauser->save();

        $tokenregis = rand(100000, 999999);
        
        $datamail->user_id = $datauser->id;
        $datamail->token = $tokenregis;
        $datamail->email = $request->email;
        $datamail->expires_at = now()->addMinutes(2);
        $datamail->save();

        $idtoken = Crypt::encrypt($datauser->id);

        $datasendmail = [
            'name' => $request->name,
            'token' => $tokenregis,
            'idtoken' => $idtoken,
            'email' => $request->email
        ];

        Mail::to($request->email)->send(new KodeVerifikasiMail($datasendmail));

        return response()->json([
            'status' => true,
            'message' => 'berhasil memasukan data baru',
            'data' => $datauser,
            'idtoken' => $idtoken

        ], 201);
    }


    public function loginUser(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
        ], [
            'email.required' => 'Email tidak boleh kosong.',
            'email.email' => 'Masukan email yang valid.',
            'password.required' => 'Password tidak boleh kosong.',
            'password.min' => 'Password terlalu pendek :min characters.',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses validasi gagal',
                'data' => $validator->errors()
            ], 401);
        }

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses login gagal!!!',
                'data' => $validator->errors()
            ], 401);
        }

        if(!Auth::attempt($request->only(['email','password'])))
        {
            return response()->json([
                'status' => false,
                'message' => 'email dan password dimasukan salah'
            ], 401);
        }


       
        // $role = role::join("user_role","user_role.role_id","=","roles.id")
        //             ->join("users","users.id","=","user_role.user_id")
        //             ->where("user_id", $datauser->id)
        //             ->pluck('roles.role_name')
        //             ->toArray();

        // if (User::where('email', $request->email)->first()) {
        // return response()->json(['message' => 'You are already logged in'], 403);
        // }

        


        $datauser = User::where('email', $request->email)->first();
        $user = User::find($datauser->id);
        $roles = $user->roles()->pluck('role_name')->toArray();
        $user->tokens()->delete();
        

        if(empty($roles)) {
            $roles = ["user"];
        }

        // $token = $user->createToken('api_token', $roles);
        // $personalAccessToken = PersonalAccessToken::findToken($token->plainTextToken);
        // $personalAccessToken->expires_at = now()->addMinutes(60); // Token akan kedaluwarsa dalam 60 menit
        // $personalAccessToken->save();


        return response()->json([
            'status' => true,
            'message' => 'berhasil proses login',
            // 'token' => $token->plainTextToken
            'token' => $user->createToken('access_token', $roles, now()->addMinutes(60))->plainTextToken
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();

        // dd($user->id);

        $user->tokens()->delete();

        return response()->json([
            'status' => true,
            'message' => 'berhasil proses logout',
        ], 200);
    }

    public function refreshToken(Request $request)
    {
        $datauser = $request->user();
        $user = User::find($datauser->id);
        $roles = $user->roles()->pluck('role_name')->toArray();
        $user->tokens()->delete();

        if(empty($roles)) {
            $roles = ["user"];
        }

        return response()->json([
            'status' => true,
            'message' => 'token berhasil dirfresh',
            'token' => $user->createToken('access_token', $roles, now()->addMinutes(60))->plainTextToken
        ], 200);
    }

    public function me(){
        $user = Auth::user();
        return response()->json([
            'status' => true,
            'message' => 'data ditemukan',
            'data' => $user
        ], 200);
    }

    public function validasiForgotPassword(Request $request)
    {
        // dd($request);
        $validator = Validator::make($request->all(), [
            'password' => 'required|string|min:6|confirmed',
        ], [
            'password.required' => 'Password tidak boleh kosong.',
            'password.min' => 'Password terlalu pendek :min characters.',
            'password.confirmed' => 'Password tidak cocok.',
        ]);

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses validasi gagal',
                'data' => $validator->errors()
            ], 401);
        }

        $data = PasswordResetToken::where('token', $request->token)->first();

        if (!$data) {
            return response()->json([
                'status' => false,
                'message' => 'Token tidak valid'
            ], 401);
        } else if ($data->expires_at < now()) {
            $data->delete();
            return response()->json([
                'status' => false,
                'message' => 'Token expired'
            ], 401);
        }

        $user = User::where('email', $data->email)->first();
        $user->password = Hash::make($request->password);
        $user->update();

        $data->delete();

        return response()->json([
            'status' => true,
            'message' => 'berhasil proses reset password',
        ], 200);
    }
    
}
