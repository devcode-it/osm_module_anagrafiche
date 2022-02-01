<?php /** @noinspection UnusedFunctionResultInspection */

use Illuminate\Support\Facades\Route;
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
