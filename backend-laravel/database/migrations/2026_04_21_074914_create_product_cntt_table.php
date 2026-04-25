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
        Schema::create('product_cntt', function (Blueprint $table) {
            $table->id('product_cntt_id');

            $table->foreignId('product_id')
                ->constrained('products', 'product_id')
                ->cascadeOnDelete();

            $table->string('programming_language', 50);
            $table->string('framework', 100);
            $table->string('database_used', 100);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_cntt');
    }
};
