<?php

namespace Openstamanager\Anagrafiche\Api;

use App\Restify\Repository;
use Binaryk\LaravelRestify\Fields\BelongsTo;
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
            field('created_at')->label('createdAt')->readOnly(),
            field('updated_at')->label('updatedAt')->readOnly(),
            BelongsTo::make('privato', PrivatoRepository::class),
            BelongsTo::make('azienda', AziendaRepository::class)
        ];
    }

    public static function related(): array
    {
        return [
            BelongsTo::make('privato', PrivatoRepository::class)->rules('required_without:azienda'),
            BelongsTo::make('azienda', AziendaRepository::class)->rules('required_without:privato')
        ];
    }
}
