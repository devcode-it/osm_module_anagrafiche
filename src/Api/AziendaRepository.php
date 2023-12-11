<?php

namespace Openstamanager\Anagrafiche\Api;

use App\Restify\Repository;
use Binaryk\LaravelRestify\Fields\BelongsTo;
use Binaryk\LaravelRestify\Http\Requests\RestifyRequest;
use Openstamanager\Anagrafiche\Models\Azienda;

class AziendaRepository extends Repository
{
    public static string $model = Azienda::class;
    public static string $uriKey = 'anagrafiche__aziende';
    public static string $type = 'anagrafiche__aziende';
    public function fields(RestifyRequest $request): array
    {
        return [
            field('denominazione')->rules('string')->required(),
            field('partita_iva')->rules('string')->required(),
            field('codice_destinatario')->rules(['string', 'size:7'])->required(),
            field('created_at')->readOnly(),
            field('updated_at')->readOnly()
        ];
    }

    public static function related(): array
    {
        return [
            BelongsTo::make('anagrafica', AnagraficaRepository::class)
        ];
    }
}
