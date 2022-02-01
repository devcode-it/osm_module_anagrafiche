<?php

use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;

JsonApiRoute::server('v1')
    ->prefix('v1')
    ->resources(function ($server) {
        $server->resource('anagrafiche', JsonApiController::class);
        $server->resource('anagrafiche-privati', JsonApiController::class);
        $server->resource('anagrafiche-aziende', JsonApiController::class);
    });
