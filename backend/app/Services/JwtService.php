<?php

namespace App\Services;

use Exception;
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class JwtService
{
    private readonly string $secret;
    private readonly string $algorithm;

    public function __construct()
    {
        $this->secret = config('app.jwt.secret');
        $this->algorithm = config('app.jwt.algorithm');
    }

    /**
     * Creates a JWT token
     * @param array $payload
     * @return string
     */
    public function createToken(array $payload): string
    {
        $this->addExpiration($payload);
        return JWT::encode($payload, $this->secret, $this->algorithm);
    }

    /**
     * Adds expiration to the payload if not present.
     * @param array $payload **Reference**
     */
    private function addExpiration(array &$payload): void
    {
        if (!isset($payload['iat'])) {
            $payload['iat'] = time();
        }
        if (!isset($payload['exp'])) {
            $payload['exp'] = $payload['iat'] + config('app.jwt.ttl');
        }
    }

    /**
     * Validates a JWT token and returns the payload in case of success else null
     * @param string $token
     * @return array|null
     */
    public function validateToken(string $token): ?array
    {
        try {
            return $this->parseToken($token);
        } catch (Exception $e) {
            return null;
        }
    }

    /**
     * Parses a JWT token and returns the payload
     * @param string $token
     * @return array
     */
    private function parseToken(string $token): array
    {
        return (array)JWT::decode($token, new Key($this->secret, $this->algorithm));
    }
}
