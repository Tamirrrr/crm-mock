<?php

namespace App\Services;

use App\Enums\HttpStatus;
use App\Exceptions\HttpException;
use App\Http\Resources\UserResource;
use App\Models\User;

class AuthService
{
    public function __construct(private readonly JwtService $jwtService)
    {
    }

    public function login(string $email, string $password): array
    {
        $user = User::where('email', $email)->first();

        if (!$user || !password_verify($password, $user->password)) {
            throw new HttpException(HttpStatus::UNAUTHORIZED,
                'Invalid Credentials');
        }

        $userResource = new UserResource($user);
        $token = $this->createJwtToken($userResource);

        return [
            'user' => $userResource,
            'accessToken' => $token,
        ];
    }

    private function createJwtToken(UserResource $userResource): string
    {
        return $this->jwtService->createToken([
            'id' => $userResource->id,
        ]);
    }

    public function register(string $email, string $password): array
    {
        $user = User::create([
            'email' => $email,
            'password' => password_hash($password, PASSWORD_BCRYPT),
        ]);

        if (!$user) {
            throw new HttpException(HttpStatus::INTERNAL_SERVER_ERROR,
                'Failed to create user');
        }

        $userResource = new UserResource($user);
        $token = $this->createJwtToken($userResource);

        return [
            'user' => new UserResource($user),
            'accessToken' => $token,
        ];
    }
}
