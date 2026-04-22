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
        Schema::create('product_ai', function (Blueprint $table) {
            $table->id('product_ai_id');

            $table->foreignId('product_id')
                ->constrained('products', 'product_id')
                ->cascadeOnDelete();

            $table->string('model_used', 100);
            $table->string('framework', 100);
            $table->string('language', 50)->nullable();
            $table->string('dataset_used', 100);
            $table->decimal('accuracy_score', 5, 2)->nullable();

            $table->string('github_link', 255)->nullable();
            $table->string('demo_link', 255)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('product_ai');
    }
};
