<?php /** @noinspection PhpUnused */

namespace Openstamanager\Anagrafiche\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

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

    public function privato(): HasOne
    {
        return $this->hasOne(Privato::class);
    }

    public function azienda(): HasOne
    {
        return $this->hasOne(Azienda::class);
    }
}
