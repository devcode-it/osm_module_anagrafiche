<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use MenaraSolutions\Geographer\Earth;

Route::inertia('anagrafiche', 'openstamanager/anagrafiche::Records')
    ->name('anagrafiche.index');

Route::inertia('anagrafica/{id}', 'openstamanager/anagrafiche::Record')
    ->name('anagrafiche.show');
