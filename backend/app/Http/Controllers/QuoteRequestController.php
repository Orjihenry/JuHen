<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreQuoteRequest;
use App\Mail\QuoteRequestMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class QuoteRequestController extends Controller
{
    public function store(StoreQuoteRequest $request): JsonResponse
    {
        if (filled($request->input('website'))) {
            return response()->json(['ok' => true]);
        }

        $to = config('mail.quote.to');

        if (! is_string($to) || $to === '' || filter_var($to, FILTER_VALIDATE_EMAIL) === false) {
            throw new ServiceUnavailableHttpException;
        }

        try {
            Mail::to($to)->sendNow(new QuoteRequestMail($request->validated()));
        } catch (\Throwable $exception) {
            report($exception);
            abort(500);
        }

        return response()->json(['ok' => true]);
    }
}
