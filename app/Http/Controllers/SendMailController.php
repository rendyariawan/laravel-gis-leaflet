<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use Illuminate\Http\Request;
use App\Models\PasswordResetToken;
use App\Models\User;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;

class SendMailController extends Controller
{

    public function forgotPassword(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email|exists:users',
        ], [
            'email.required' => 'Email tidak boleh kosong.',
            'email.email' => 'Masukan email yang valid.',
            'email.exists' => 'Email tidak terdaftar.',
        ]);
        

        if($validator->fails()){
            return response()->json([
                'status' => false,
                'message' => 'proses validasi gagal',
                'data' => $validator->errors()
            ], 401);
        }

        $cek = PasswordResetToken::where('email', $request->email)->first();

        if ($cek->expires_at > now()) {
            return response()->json([
                'status' => false,
                'message' => 'Token aktif, silahkan coba kembali setelah 5 menit'
            ], 401);
        }

        $data = User::where('email', $request->email)->first();

        $token = rand(100000, 999999);

        // dd($request->email);

        PasswordResetToken::updateOrCreate(
        [
            'email' => $request->email
        ],
        [
            'name' => $data->name,
            'email' => $request->email,
            'token' => $token,
            'expires_at' => now()->addMinutes(5),
            'created_at' => now()
        ]);

        $datakirim = [
            'name' => $data->name,
            'token' => $token,
            'email' => $request->email
        ];

        // $data->email = $request->email;
        // $data->token = $token;
        // $data->created_at = now();
        // $data->updateOrCreate();

        Mail::to($request->email)->send(new ResetPasswordMail($datakirim));
        
        return response()->json([
            'status' => true,
            'message' => 'email reset password dikirim',
        ], 200);
    }
}
