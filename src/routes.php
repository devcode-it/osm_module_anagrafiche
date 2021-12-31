<?php /** @noinspection UnusedFunctionResultInspection */

// Le route possono essere definite qui
use Illuminate\Support\Facades\Route;
use Openstamanager\Anagrafiche\Http\Controllers\Api\AnagraficheController;
use Openstamanager\Anagrafiche\Http\Controllers\Api\AziendeController;
use Openstamanager\Anagrafiche\Http\Controllers\Api\PrivatiController;

Route::inertia('anagrafiche', 'openstamanager/anagrafiche::Records')
    ->name('anagrafiche');

Route::prefix('api')->group(function () {
    Route::apiResource('anagrafiche', AnagraficheController::class);
    Route::apiResource('privati', PrivatiController::class);
    Route::apiResource('aziende', AziendeController::class);
});
