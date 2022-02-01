<?php /** @noinspection UnusedFunctionResultInspection */

use Illuminate\Support\Facades\Route;
use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use MenaraSolutions\Geographer\Earth;

Route::inertia('anagrafiche', 'openstamanager/anagrafiche::Records', [
    'nazioni' => array_map(
        static fn (array $nazione) => [
            'label' => $nazione['name'],
            'value' => $nazione['code'],
        ],
        (new Earth())
            ->getCountries()
            ->setLocale(app()->getLocale())
            ->toArray()
    ),
])
    ->name('anagrafiche');

JsonApiRoute::server('v1')
    ->prefix('v1')
    ->resources(function ($server) {
        $server->resource('anagrafiche', JsonApiController::class);
        $server->resource('anagrafiche-privati', JsonApiController::class);
        $server->resource('anagrafiche-aziende', JsonApiController::class);
    });
