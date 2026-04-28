<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('product_graphic_color_palette', function (Blueprint $table) {
            $table->id('product_graphic_color_palette_id');

            $table->foreignId('product_graphic_id')
                ->constrained('product_graphic', 'product_graphic_id')
                ->cascadeOnDelete();

            $table->string('color_palette_name', 100);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_graphic_color_palette');
    }
};
