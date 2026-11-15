<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Mail\ContactMessageMail;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Mail;
use Symfony\Component\HttpKernel\Exception\ServiceUnavailableHttpException;

class ContactMessageController extends Controller
{
    public function store(StoreContactRequest $request): JsonResponse
    {
        if (filled($request->input('website'))) {
            return response()->json(['ok' => true]);
        }

        $to = config('mail.contact.to');

        if (! is_string($to) || $to === '' || filter_var($to, FILTER_VALIDATE_EMAIL) === false) {
            throw new ServiceUnavailableHttpException;
        }

        try {
            Mail::to($to)->sendNow(new ContactMessageMail($request->validated()));
        } catch (\Throwable $exception) {
            report($exception);
            abort(500);
        }

        return response()->json(['ok' => true]);
    }
}
