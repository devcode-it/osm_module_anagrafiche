<?php /** @noinspection PhpUnusedParameterInspection */

namespace Openstamanager\Anagrafiche\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Openstamanager\Anagrafiche\Models\Privato;

class PrivatoPolicy
{
    use HandlesAuthorization;

    public function allowRestify(?User $user = null): bool
    {
        return true;
    }

    public function show(User $user, Privato $model): bool
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

    public function update(User $user, Privato $model): bool
    {
        return true;
    }

    public function updateBulk(User $user, Privato $model): bool
    {
        return true;
    }

    public function delete(User $user, Privato $model): bool
    {
        return true;
    }

    public function restore(User $user, Privato $model): bool
    {
        return true;
    }

    public function forceDelete(User $user, Privato $model): bool
    {
        return true;
    }
}
