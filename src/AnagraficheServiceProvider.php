<?php

namespace Openstamanager\Anagrafiche;

use App\ModuleServiceProvider;
use Illuminate\Support\Facades\Route;

class AnagraficheServiceProvider extends ModuleServiceProvider
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
