<?php

namespace Openstamanager\Anagrafiche;

use Illuminate\Support\ServiceProvider;
use JetBrains\PhpStorm\ArrayShape;

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
        $this->loadRoutesFrom(__DIR__ . '/routes.php');

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
}
