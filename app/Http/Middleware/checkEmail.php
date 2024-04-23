<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class checkEmail
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->user()->email_verified_at == null && $request->user()->verified == 0){
            return response()->json([
                'status' => false,
                'message' => 'Email belum di verify'
            ], 401);
        }
        return $next($request);
    }
}
