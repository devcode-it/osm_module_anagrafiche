<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnagraficheAziendeTable extends Migration
{
    public function up(): void
    {
        Schema::create('anagrafiche_aziende', static function (Blueprint $table) {
            $table->id();
            $table->string('denominazione');
            $table->string('partita_iva');
            $table->char('codice_destinatario', 7);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('anagrafiche_aziende');
    }
}
