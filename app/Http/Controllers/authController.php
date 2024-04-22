<?php

namespace App\Http\Controllers;

use App\Models\role;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Laravel\Sanctum\PersonalAccessToken;

class authController extends Controller
{
    
    public function registerUser(Request $request)
    {
        $datauser = new User();
        $rules = [
            'name' => 'required',
            'email' => 'required|email|unique:users,email',
            'password' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

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

        return response()->json([
            'status' => true,
            'message' => 'berhasil memasukan data baru',
        ], 201);
    }


    public function loginUser(Request $request)
    {
        $rules = [
            'email' => 'required|email',
            'password' => 'required',
        ];

        $validator = Validator::make($request->all(), $rules);

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
}
