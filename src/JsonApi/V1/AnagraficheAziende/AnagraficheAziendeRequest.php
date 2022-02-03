<?php

namespace Openstamanager\Anagrafiche\JsonApi\V1\AnagraficheAziende;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class AnagraficheAziendeRequest extends ResourceRequest
{

    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'denominazione' => ['required', 'string'],
            'partita_iva' => ['required', 'string'],
            'codice_destinatario' => ['required', 'string', 'size:7'],
        ];
    }

}
