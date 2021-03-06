<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnagrafichePrivatiTable extends Migration
{
    public function up(): void
    {
        Schema::create('anagrafiche_privati', static function (Blueprint $table) {
            $table->id();
            $table->string('nome');
            $table->string('cognome')->nullable();
            $table->char('codice_fiscale', 16);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anagrafiche_privati');
    }
}
