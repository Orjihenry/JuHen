<?php

use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\QuoteRequestController;
use Illuminate\Support\Facades\Route;

Route::get('/health', function () {
    return ['ok' => true];
});

Route::post('/estimates', [QuoteRequestController::class, 'store'])
    ->middleware('throttle:quotes');

Route::post('/contact', [ContactMessageController::class, 'store'])
    ->middleware('throttle:contact');
