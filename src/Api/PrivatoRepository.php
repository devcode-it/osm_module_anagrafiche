<?php

namespace Openstamanager\Anagrafiche\Api;

use App\Restify\Repository;
use Binaryk\LaravelRestify\Fields\HasOne;
use Binaryk\LaravelRestify\Http\Requests\RestifyRequest;
use Openstamanager\Anagrafiche\Models\Anagrafica;
use Openstamanager\Anagrafiche\Models\Privato;

class PrivatoRepository extends Repository
{
    public static string $model = Privato::class;
    public static string $uriKey = 'anagrafiche__privati';
    public static string $type = 'anagrafiche__privati';
    public function fields(RestifyRequest $request): array
    {
        return [
            field('nome')->rules('string')->required(),
            field('cognome')->rules('string'),
            field('codice_fiscale')->label('codiceFiscale')->rules(['string', 'codfisc'])->required(),
            field('created_at')->label('createdAt')->readOnly(),
            field('updated_at')->label('updatedAt')->readOnly()
        ];
    }

    public static function related(): array
    {
        return [
            HasOne::make('anagrafica', AnagraficaRepository::class),
        ];
    }
}
