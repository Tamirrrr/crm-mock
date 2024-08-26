<?php

namespace App\Http\Middleware;

use App\Enums\HttpStatus;
use App\Exceptions\HttpException;
use App\Models\User;
use App\Services\JwtService;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class JwtMiddleware
{
    private JwtService $jwtService;

    public function __construct(JwtService $jwtService)
    {
        $this->jwtService = $jwtService;
    }

    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();
        if (!$token) {
            throw new HttpException(HttpStatus::UNAUTHORIZED, 'Invalid or missing JWT token.');
        }

        $payload = $this->jwtService->validateToken($token);
        if (!$payload) {
            throw new HttpException(HttpStatus::UNAUTHORIZED, 'Invalid or missing JWT token.');
        }

        $user = User::find($payload['id']);
        if (!$user) {
            throw new HttpException(HttpStatus::UNAUTHORIZED, 'Invalid or missing JWT token.');
        }

        $request->merge(['user' => $user]);
        return $next($request);
    }
}
