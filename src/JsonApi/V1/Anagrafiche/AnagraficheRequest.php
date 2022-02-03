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
            'indirizzo' => ['string'],
            'cap' => ['string'],
            'citta' => ['string'],
            'provincia' => ['string'],
            'nazione' => ['string'],
            'telefono' => ['string'],
            'cellulare' => ['string'],
            'email' => ['string'],
            'pec' => ['string'],
            'sito_web' => ['string'],
            'privato' => ['required_without:azienda', JsonApiRule::toOne()],
            'azienda' => ['required_without:privato', JsonApiRule::toOne()],
        ];
    }

}
