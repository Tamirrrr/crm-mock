<?php

namespace App\Providers;

use App\Services\AuthService;
use App\Services\JwtService;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{

    public function register(): void
    {
        $this->app->singleton(AuthService::class, function ($app) {
            return new AuthService($app->make(JwtService::class));
        });

        $this->app->singleton(JwtService::class, function ($app) {
            return new JwtService();
        });
    }


    public function boot(): void
    {
    }
}
