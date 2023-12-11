<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Openstamanager\Anagrafiche\Models\Anagrafica;

return new class extends Migration {
    public function up(): void
    {
        // Disable foreign checks
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Schema::table('anagrafiche_privati', static function (Blueprint $table) {
            if (!Schema::hasColumn('anagrafiche_privati', 'anagrafica_id')) {
                $table->foreignId('anagrafica_id')->constrained('anagrafiche')->cascadeOnDelete();
            }
        });

        Schema::table('anagrafiche_aziende', static function (Blueprint $table) {
            if (!Schema::hasColumn('anagrafiche_aziende', 'anagrafica_id')) {
                $table->foreignId('anagrafica_id')->constrained('anagrafiche')->cascadeOnDelete();
            }
        });

        // Move IDs from anagrafiche to anagrafiche_privati and anagrafiche_aziende
        foreach (Anagrafica::all() as $anagrafica) {
            // @phpstan-ignore-next-line
            $privato_id = $anagrafica->privato_id;
            // @phpstan-ignore-next-line
            $azienda_id = $anagrafica->azienda_id;

            // Update tables to reference anagrafica_id
            DB::table('anagrafiche_privati')->where('id', $privato_id)->update(['anagrafica_id' => $anagrafica->id]);
            DB::table('anagrafiche_aziende')->where('id', $azienda_id)->update(['anagrafica_id' => $anagrafica->id]);
        }

        Schema::table('anagrafiche', static function (Blueprint $table) {
            $table->dropForeign(['privato_id']);
            $table->dropForeign(['azienda_id']);
            $table->dropColumn(['privato_id', 'azienda_id']);
        });

        // Re-enable foreign checks
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');
    }

    public function down(): void
    {
        Schema::table('anagrafiche', static function (Blueprint $table) {
            $table->foreignId('privato_id')->nullable()->constrained('anagrafiche_privati')->cascadeOnDelete();
            $table->foreignId('azienda_id')->nullable()->constrained('anagrafiche_aziende')->cascadeOnDelete();
        });

        // Move IDs from anagrafiche_privati and anagrafiche_aziende to anagrafiche
        foreach (Anagrafica::all() as $anagrafica) {
            // @phpstan-ignore-next-line
            $privato_id = $anagrafica->privato_id;
            // @phpstan-ignore-next-line
            $azienda_id = $anagrafica->azienda_id;

            // Update tables to reference anagrafica_id
            DB::table('anagrafiche')->where('id', $anagrafica->id)->update(compact('privato_id', 'azienda_id'));
        }

        Schema::table('anagrafiche_privati', static function (Blueprint $table) {
            $table->dropForeign(['anagrafica_id']);
            $table->dropColumn(['anagrafica_id']);
        });

        Schema::table('anagrafiche_aziende', static function (Blueprint $table) {
            $table->dropForeign(['anagrafica_id']);
            $table->dropColumn(['anagrafica_id']);
        });
    }
};
