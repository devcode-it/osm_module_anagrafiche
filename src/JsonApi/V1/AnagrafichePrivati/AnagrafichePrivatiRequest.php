<?php

namespace Openstamanager\Anagrafiche\JsonApi\V1\AnagrafichePrivati;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class AnagrafichePrivatiRequest extends ResourceRequest
{

    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'nome' => ['required', 'string'],
            'cognome' => ['required', 'string'],
            'codice_fiscale' => ['required', 'string'],
        ];
    }

}
