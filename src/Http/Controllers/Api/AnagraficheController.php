<?php

namespace Openstamanager\Anagrafiche\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Database\Eloquent\Model;
use Openstamanager\Anagrafiche\Models\Anagrafica;

class AnagraficheController extends ApiController
{
    protected string|Model $model = Anagrafica::class;
}
