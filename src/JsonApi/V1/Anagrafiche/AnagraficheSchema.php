<?php

namespace Openstamanager\Anagrafiche\JsonApi\V1\Anagrafiche;

use LaravelJsonApi\Eloquent\Contracts\Paginator;
use LaravelJsonApi\Eloquent\Fields\DateTime;
use LaravelJsonApi\Eloquent\Fields\ID;
use LaravelJsonApi\Eloquent\Fields\Relations\HasOne;
use LaravelJsonApi\Eloquent\Fields\Str;
use LaravelJsonApi\Eloquent\Filters\WhereIdIn;
use LaravelJsonApi\Eloquent\Pagination\PagePagination;
use LaravelJsonApi\Eloquent\Schema;
use Openstamanager\Anagrafiche\Models\Anagrafica;

class AnagraficheSchema extends Schema
{

    /**
     * The model the schema corresponds to.
     *
     * @var string
     */
    public static string $model = Anagrafica::class;

    /**
     * Get the resource fields.
     *
     * @return array
     */
    public function fields(): array
    {
        return [
            ID::make(),
            Str::make('tipo'),
            Str::make('tipologia'),
            Str::make('indirizzo'),
            Str::make('cap'),
            Str::make('citta'),
            Str::make('provincia'),
            Str::make('nazione'),
            Str::make('telefono'),
            Str::make('cellulare'),
            Str::make('email'),
            Str::make('pec'),
            Str::make('sito_web'),
            HasOne::make('privato'),
            HasOne::make('azienda'),
            DateTime::make('createdAt')->sortable()->readOnly(),
            DateTime::make('updatedAt')->sortable()->readOnly(),
        ];
    }

    /**
     * Get the resource filters.
     *
     * @return array
     */
    public function filters(): array
    {
        return [
            WhereIdIn::make($this),
        ];
    }

    /**
     * Get the resource paginator.
     *
     * @return Paginator|null
     */
    public function pagination(): ?Paginator
    {
        return PagePagination::make();
    }

    /**
     * Get the JSON:API resource type.
     *
     * @return string
     */
    public static function type(): string
    {
        return 'anagrafiche';
    }
}
