<?php

namespace Openstamanager\Anagrafiche\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Database\Eloquent\Model;
use Openstamanager\Anagrafiche\Models\Anagrafica;
use Openstamanager\Anagrafiche\Models\Azienda;
use Openstamanager\Anagrafiche\Models\Privato;

class AnagraficheController extends ApiController
{
    protected string|Model $model = Anagrafica::class;
    protected array $relationships = [
        'azienda' => Azienda::class,
        'privato' => Privato::class,
    ];
}
