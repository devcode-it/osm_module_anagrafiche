<?php /** @noinspection UnusedFunctionResultInspection */

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use MenaraSolutions\Geographer\Earth;

Inertia::share('nazioni', array_map(
    static fn (array $nazione) => [
        'label' => $nazione['name'],
        'value' => $nazione['code'],
    ],
    (new Earth())
        ->getCountries()
        ->setLocale(app()->getLocale())
        ->toArray()
));

Route::inertia('anagrafiche', 'openstamanager/anagrafiche::Records')
    ->name('anagrafiche');
