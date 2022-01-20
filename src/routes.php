<?php /** @noinspection UnusedFunctionResultInspection */

// Le route possono essere definite qui
use Illuminate\Support\Facades\Route;
use MenaraSolutions\Geographer\Country;
use MenaraSolutions\Geographer\Earth;
use Openstamanager\Anagrafiche\Http\Controllers\Api\AnagraficheController;
use Openstamanager\Anagrafiche\Http\Controllers\Api\AziendeController;
use Openstamanager\Anagrafiche\Http\Controllers\Api\PrivatiController;

Route::inertia('anagrafiche', 'openstamanager/anagrafiche::Records', [
    'nazioni' => array_map(static fn (Country $nazione) => [
        'label' => $nazione->getName(app()->getLocale()),
        'value' => $nazione->getCode(),
    ], (new Earth())->getCountries()->toArray()),
])
    ->name('anagrafiche');

Route::prefix('api')->group(function () {
    Route::apiResource('anagrafiche', AnagraficheController::class);
    Route::apiResource('anagrafiche-privati', PrivatiController::class);
    Route::apiResource('anagrafiche-aziende', AziendeController::class);
});
