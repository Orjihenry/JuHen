<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    protected function prepareForValidation(): void
    {
        $fields = ['firstName', 'lastName', 'email', 'phone'];

        foreach ($fields as $field) {
            $value = $this->input($field);

            if (is_string($value)) {
                $this->merge([
                    $field => str_replace(["\r", "\n", "\0"], '', $value),
                ]);
            }
        }
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
            'firstName' => ['required', 'string', 'max:80'],
            'lastName' => ['required', 'string', 'max:80'],
            'email' => ['required', 'email', 'max:200'],
            'phone' => ['required', 'string', 'max:40'],
            'message' => ['required', 'string', 'max:2000'],
        ];
    }
}
