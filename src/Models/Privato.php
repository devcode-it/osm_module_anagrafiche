<?php /** @noinspection PhpUnused */

namespace Openstamanager\Anagrafiche\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Privato extends Model
{
    protected $table = 'anagrafiche_privati';
    protected $fillable = [
        'nome',
        'cognome',
        'codice_fiscale'
    ];

    public function anagrafica(): HasOne
    {
        return $this->hasOne(Anagrafica::class, 'istanza', 'anagrafica');
    }
}
