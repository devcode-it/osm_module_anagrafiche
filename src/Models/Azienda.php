<?php /** @noinspection PhpUnused */

namespace Openstamanager\Anagrafiche\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Azienda extends Model
{
    protected $table = 'anagrafiche_aziende';
    protected $fillable = [
        'denominazione',
        'partita_iva',
        'codice_destinatario'
    ];

    public function anagrafica(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Anagrafica::class);
    }
}
