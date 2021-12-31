<?php /** @noinspection PhpUnused */

namespace Openstamanager\Anagrafiche\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Anagrafica extends Model
{
    protected $table = 'anagrafiche';
    protected $fillable = [
        'tipo',
        'tipologia',
        'indirizzo',
        'cap',
        'citta',
        'provincia',
        'nazione',
        'telefono',
        'cellulare',
        'email',
        'pec'
    ];

    public function getTipologiaAttribute(string $value): string
    {
        return match ($value) {
            'AZIENDA' => __('Azienda'),
            'PRIVATO' => __('Privato'),
        };
    }

    public function getTipoAttribute(string $value): string
    {
        return match ($value) {
            'CLIENTE' => __('Cliente'),
            'FORNITORE' => __('Privato'),
            'ENTE' => __('Ente pubblico')
        };
    }

    public function istanza(): BelongsTo
    {
        return $this->belongsTo(match ($this->tipologia) {
            'AZIENDA' => Azienda::class,
            'PRIVATO' => Privato::class
        }, 'anagrafica', 'istanza');
    }
}
