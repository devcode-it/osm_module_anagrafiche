<?php

namespace Openstamanager\Anagrafiche\Http\Controllers\Api;

use App\Http\Controllers\Api\ApiController;
use Illuminate\Database\Eloquent\Model;
use Openstamanager\Anagrafiche\Models\Azienda;

class AziendeController extends ApiController
{
    protected string|Model $model = Azienda::class;
}
