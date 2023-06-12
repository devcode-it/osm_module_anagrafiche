<?php /** @noinspection PhpUnusedParameterInspection */

namespace Openstamanager\Anagrafiche\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Openstamanager\Anagrafiche\Models\Azienda;

class AziendaPolicy
{
    use HandlesAuthorization;

    public function allowRestify(?User $user = null): bool
    {
        return true;
    }

    public function show(User $user, Azienda $model): bool
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

    public function update(User $user, Azienda $model): bool
    {
        return true;
    }

    public function updateBulk(User $user, Azienda $model): bool
    {
        return true;
    }

    public function delete(User $user, Azienda $model): bool
    {
        return true;
    }

    public function restore(User $user, Azienda $model): bool
    {
        return true;
    }

    public function forceDelete(User $user, Azienda $model): bool
    {
        return true;
    }
}
