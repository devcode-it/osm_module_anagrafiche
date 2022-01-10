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
    protected $with = ['privato', 'azienda'];

    public function privato(): BelongsTo
    {
        return $this->belongsTo(Privato::class);
    }

    public function azienda(): BelongsTo
    {
        return $this->belongsTo(Azienda::class);
    }
}
