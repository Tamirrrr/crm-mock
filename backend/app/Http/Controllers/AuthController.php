<?php

namespace App\Http\Controllers;

use App\Exceptions\HttpException;
use App\Http\Resources\UserResource;
use App\Services\AuthService;
use App\Utils\ArrayUtils;
use App\Validators\AuthValidator;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService   $authService,
        private readonly AuthValidator $authValidator
    )
    {
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws HttpException
     */
    public function login(Request $request): JsonResponse
    {
        $validator = $this->authValidator->baseRulesValidator(ArrayUtils::sanitize($request->input()));
        $this->authValidator->handleValidation($validator);
        $payload = $validator->validated();

        return $this->successResponse($this->authService->login($payload['email'],
            $payload['password']));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     * @throws HttpException
     */
    public function register(Request $request): JsonResponse
    {
        $validator = $this->authValidator->register(ArrayUtils::sanitize($request->input()));
        $this->authValidator->handleValidation($validator);
        $payload = $validator->validated();

        return $this->successResponse($this->authService->register($payload['email'],
            $payload['password']));
    }

    /**
     * @param Request $request
     * @return JsonResponse
     */
    public function information(Request $request): JsonResponse
    {
        return $this->successResponse([
            'user' => new UserResource($request->user),
        ]);
    }
}
