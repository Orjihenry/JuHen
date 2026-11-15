<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreQuoteRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $contact = $this->input('contact');

        if (! is_array($contact)) {
            return;
        }

        foreach ($contact as $key => $value) {
            if (is_string($value)) {
                $contact[$key] = str_replace(["\r", "\n", "\0"], '', $value);
            }
        }

        $this->merge(['contact' => $contact]);
    }

    public function rules(): array
    {
        if (filled($this->input('website'))) {
            return [
                'website' => ['string', 'max:200'],
            ];
        }

        return [
            'website' => ['nullable', 'string', 'max:200'],
            'contact.firstName' => ['required', 'string', 'max:80'],
            'contact.lastName' => ['required', 'string', 'max:80'],
            'contact.email' => ['required', 'email', 'max:200'],
            'contact.phone' => ['required', 'string', 'max:40'],
            'contact.address' => ['required', 'string', 'max:200'],
            'contact.city' => ['required', 'string', 'max:200'],
            'contact.postalCode' => ['required', 'string', 'max:20'],
            'details.service' => ['required', 'string', 'max:200'],
            'details.cleaningType' => ['required', 'string', 'max:200'],
            'details.space' => ['nullable', 'string', 'max:200'],
            'details.bathrooms' => ['nullable', 'string', 'max:200'],
            'details.squareFootage' => ['nullable', 'string', 'max:200'],
            'details.pets' => ['nullable', 'string', 'max:200'],
            'details.addons' => ['nullable', 'string', 'max:500'],
            'details.additionalInfo' => ['nullable', 'string', 'max:2000'],
            'details.preferredDate' => ['nullable', 'string', 'max:200'],
            'details.timeWindow' => ['nullable', 'string', 'max:200'],
            'quote.lines' => ['nullable', 'array', 'max:50'],
            'quote.lines.*.label' => ['required', 'string', 'max:200'],
            'quote.lines.*.amount' => ['required', 'numeric'],
            'quote.total' => ['required', 'numeric'],
        ];
    }
}
