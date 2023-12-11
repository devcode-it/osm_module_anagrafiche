<?php

namespace Openstamanager\Anagrafiche\Api;

use App\Restify\Repository;
use Binaryk\LaravelRestify\Fields\HasOne;
use Binaryk\LaravelRestify\Http\Requests\RestifyRequest;
use Openstamanager\Anagrafiche\Models\Anagrafica;

class AnagraficaRepository extends Repository
{
    public static string $model = Anagrafica::class;
    public static string $uriKey = 'anagrafiche';

    public function fields(RestifyRequest $request): array
    {
        return [
            field('tipo')->rules('string')->required(),
            field('tipologia')->rules('string')->required(),
            field('indirizzo')->rules(['string', 'nullable']),
            field('cap')->rules(['string', 'nullable']),
            field('citta')->rules(['string', 'nullable']),
            field('provincia')->rules(['string', 'nullable']),
            field('nazione')->rules(['string', 'nullable']),
            field('telefono')->rules(['string', 'nullable']),
            field('cellulare')->rules(['string', 'nullable']),
            field('email')->rules(['string', 'nullable']),
            field('pec')->rules(['string', 'nullable']),
            field('sito_web')->rules(['string', 'nullable']),
            field('created_at')->readOnly(),
            field('updated_at')->readOnly()
        ];
    }

    public static function related(): array
    {
        return [
            HasOne::make('privato', PrivatoRepository::class),
            HasOne::make('azienda', AziendaRepository::class)
        ];
    }
}
