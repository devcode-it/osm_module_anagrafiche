<?php

namespace Openstamanager\Anagrafiche;

use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AnagraficheServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot(): void
    {
        $this->mergeConfigFrom(__DIR__ . '/../config/anagrafiche.php', 'anagrafiche');

        $this->publishConfig();

        $this->loadRoutes();

        $this->publishes([
            __DIR__ . '/../dist' => public_path('build/vendor/openstamanager/anagrafiche')
        ], 'anagrafiche:assets');
        $this->publishes([
            __DIR__ . '/../dist' => resource_path('static/vendor/openstamanager/anagrafiche')
        ], 'anagrafiche:assets-dev');

        $this->loadMigrationsFrom(__DIR__.'/../database/migrations');
    }

    /**
     * Publish Config
     *
     * @return void
     */
    public function publishConfig(): void
    {
        if ($this->app->runningInConsole()) {
            $this->publishes([
                __DIR__ . '/../config/anagrafiche.php' => config_path('anagrafiche.php'),
            ], 'config');
        }
    }

    public function loadRoutes(): void {
        Route::group(['middleware' => 'web'], function () {
            $this->loadRoutesFrom(__DIR__ . '/routes/web.php');
        });

        Route::group(['prefix' => 'api', 'middleware' => 'api'], function () {
            $this->loadRoutesFrom(__DIR__ . '/routes/api.php');
        });
    }
}
