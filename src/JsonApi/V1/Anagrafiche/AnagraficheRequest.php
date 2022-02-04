<?php

namespace Openstamanager\Anagrafiche\JsonApi\V1\Anagrafiche;

use Illuminate\Validation\Rule;
use LaravelJsonApi\Laravel\Http\Requests\ResourceRequest;
use LaravelJsonApi\Validation\Rule as JsonApiRule;

class AnagraficheRequest extends ResourceRequest
{

    /**
     * Get the validation rules for the resource.
     *
     * @return array
     */
    public function rules(): array
    {
        return [
            'tipo' => ['required', 'string'],
            'tipologia' => ['required', 'string'],
            'indirizzo' => ['nullable', 'string'],
            'cap' => ['nullable', 'string'],
            'citta' => ['nullable', 'string'],
            'provincia' => ['nullable', 'string'],
            'nazione' => ['nullable', 'string'],
            'telefono' => ['nullable', 'string'],
            'cellulare' => ['nullable', 'string'],
            'email' => ['nullable', 'string'],
            'pec' => ['nullable', 'string'],
            'sito_web' => ['nullable', 'string'],
            'privato' => ['required_without:azienda', JsonApiRule::toOne()],
            'azienda' => ['required_without:privato', JsonApiRule::toOne()],
        ];
    }

}
