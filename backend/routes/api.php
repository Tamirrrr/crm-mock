<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\CustomerController;
use App\Http\Middleware\JwtMiddleware;
use Illuminate\Support\Facades\Route;

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::prefix('v1')->as('v1.')->group(function () {
        Route::resource('customers', CustomerController::class)
            ->only(['index', 'store', 'show', 'update', 'destroy']);

        Route::prefix('auth')
            ->as('auth.')
            ->group(function () {
                Route::post('login', [AuthController::class, 'login'])
                    ->name('login')
                    ->withoutMiddleware(JwtMiddleware::class);
                Route::post('register', [AuthController::class, 'register'])
                    ->name('register')
                    ->withoutMiddleware(JwtMiddleware::class);
                Route::get('information', [AuthController::class, 'information'])
                    ->name('information');
            });
    });
});
