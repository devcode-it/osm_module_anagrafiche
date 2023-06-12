<?php /** @noinspection PhpUnusedParameterInspection */

namespace Openstamanager\Anagrafiche\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Openstamanager\Anagrafiche\Models\Anagrafica;
use Openstamanager\Anagrafiche\Models\Azienda;
use Openstamanager\Anagrafiche\Models\Privato;

class AnagraficaPolicy
{
    use HandlesAuthorization;

    public function allowRestify(?User $user = null): bool
    {
        return true;
    }

    public function show(User $user, Anagrafica $model): bool
    {
        return true;
    }

    public function store(User $user): bool
    {
        return true;
    }

    public function storeBulk(User $user): bool
    {
        return true;
    }

    public function update(User $user, Anagrafica $model): bool
    {
        return true;
    }

    public function updateBulk(User $user, Anagrafica $model): bool
    {
        return true;
    }

    public function delete(User $user, Anagrafica $model): bool
    {
        return true;
    }

    public function restore(User $user, Anagrafica $model): bool
    {
        return true;
    }

    public function forceDelete(User $user, Anagrafica $model): bool
    {
        return true;
    }

    public function attachPrivato(User $user, Anagrafica $anagrafica, Privato $privato): bool
    {
        return true;
    }

    public function detachPrivato(User $user, Anagrafica $anagrafica, Privato $privato): bool
    {
        return true;
    }

    public function attachAzienda(User $user, Anagrafica $anagrafica, Azienda $azienda): bool
    {
        return true;
    }

    public function detachAzienda(User $user, Anagrafica $anagrafica, Azienda $azienda): bool
    {
        return true;
    }
}
