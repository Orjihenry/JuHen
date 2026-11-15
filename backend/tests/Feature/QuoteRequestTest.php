<?php

namespace Tests\Feature;

use App\Mail\QuoteRequestMail;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class QuoteRequestTest extends TestCase
{
    /**
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_replace_recursive([
            'website' => '',
            'contact' => [
                'firstName' => 'Ada',
                'lastName' => 'Bartlett',
                'email' => 'ada@example.com',
                'phone' => '555-120-3480',
                'address' => '12 Water St',
                'city' => "St. John's",
                'postalCode' => 'A1A 1A1',
            ],
            'details' => [
                'service' => 'Residential cleaning',
                'cleaningType' => 'Standard cleaning',
                'space' => '3 bedrooms',
                'bathrooms' => '2 bathrooms',
                'squareFootage' => '1,001–2,000 sq ft',
                'pets' => 'No pets',
                'addons' => 'Oven',
                'additionalInfo' => '',
                'preferredDate' => 'Sat, Nov 15',
                'timeWindow' => 'Morning (8am–12pm)',
            ],
            'quote' => [
                'lines' => [
                    ['label' => '3 bedrooms visit', 'amount' => 190],
                ],
                'total' => 190,
            ],
        ], $overrides);
    }

    public function test_it_sends_a_quote_request_email(): void
    {
        Mail::fake();

        $this->postJson('/api/estimates', $this->payload())
            ->assertOk()
            ->assertJson(['ok' => true]);

        Mail::assertSent(QuoteRequestMail::class, function (QuoteRequestMail $mail) {
            return $mail->hasTo(config('mail.quote.to'))
                && $mail->hasFrom(config('mail.from.address'), 'Ada Bartlett')
                && $mail->hasReplyTo('ada@example.com', 'Ada Bartlett');
        });
    }

    public function test_it_ignores_honeypot_submissions(): void
    {
        Mail::fake();

        $this->postJson('/api/estimates', $this->payload([
            'website' => 'https://spam.example',
        ]))
            ->assertOk()
            ->assertJson(['ok' => true]);

        Mail::assertNothingSent();
    }

    public function test_it_rejects_invalid_contact_details(): void
    {
        Mail::fake();

        $this->postJson('/api/estimates', $this->payload([
            'contact' => ['email' => 'not-an-email'],
        ]))
            ->assertUnprocessable();

        Mail::assertNothingSent();
    }
}
