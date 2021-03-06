<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use MenaraSolutions\Geographer\Earth;

class CreateAnagraficheTable extends Migration
{
    public function up(): void
    {
        Schema::create('anagrafiche', static function (Blueprint $table) {
            $nazioni = (new Earth())->getCountries()->pluck('code');

            $table->id();
            $table->string('tipo');
            $table->string('tipologia');
            $table->string('indirizzo')->nullable();
            $table->char('cap', 10)->nullable();
            $table->string('citta')->nullable();
            $table->char('provincia', 10)->nullable();
            $table->enum('nazione', $nazioni)->nullable();
            $table->string('telefono')->nullable();
            $table->string('cellulare')->nullable();
            $table->string('email')->nullable();
            $table->string('pec')->nullable();
            $table->string('sito_web')->nullable();
            $table->foreignId('privato_id')->nullable()->constrained('anagrafiche_privati')->cascadeOnUpdate()->cascadeOnDelete();
            $table->foreignId('azienda_id')->nullable()->constrained('anagrafiche_aziende')->cascadeOnUpdate()->cascadeOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anagrafiche');
    }
}
