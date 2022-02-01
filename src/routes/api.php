<?php

use LaravelJsonApi\Laravel\Facades\JsonApiRoute;
use LaravelJsonApi\Laravel\Http\Controllers\JsonApiController;
use LaravelJsonApi\Laravel\Routing\Relationships;
use LaravelJsonApi\Laravel\Routing\ResourceRegistrar;

JsonApiRoute::server('v1')
    ->prefix('v1')
    ->resources(function (ResourceRegistrar $server) {
        $server->resource('anagrafiche', JsonApiController::class)
            ->relationships(function (Relationships $relationships) {
                $relationships->hasOne('privato');
                $relationships->hasOne('azienda');
            });
        $server->resource('anagrafiche-privati', JsonApiController::class)
            ->relationships(function (Relationships $relationships) {
                $relationships->hasOne('anagrafica');
            });
        $server->resource('anagrafiche-aziende', JsonApiController::class)
            ->relationships(function (Relationships $relationships) {
                $relationships->hasOne('anagrafica');
            });
    });
