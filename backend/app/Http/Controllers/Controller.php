<?php

namespace App\Http\Controllers;

use App\Enums\HttpStatus;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\JsonResource;

abstract class Controller
{
    protected function successResponse(array|JsonResource $data,
                                       HttpStatus         $status = HttpStatus::OK): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => $data,
        ], $status->value);
    }
}
