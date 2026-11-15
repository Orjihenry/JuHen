<?php

namespace Tests\Feature;

use App\Mail\ContactMessageMail;
use Illuminate\Support\Facades\Mail;
use Tests\TestCase;

class ContactMessageTest extends TestCase
{
    /**
     * @return array<string, mixed>
     */
    private function payload(array $overrides = []): array
    {
        return array_replace_recursive([
            'website' => '',
            'firstName' => 'Ada',
            'lastName' => 'Bartlett',
            'email' => 'ada@example.com',
            'phone' => '555-120-3480',
            'message' => 'Can you clean a downtown office next week?',
        ], $overrides);
    }

    public function test_it_sends_a_contact_message_email(): void
    {
        Mail::fake();

        $this->postJson('/api/contact', $this->payload())
            ->assertOk()
            ->assertJson(['ok' => true]);

        Mail::assertSent(ContactMessageMail::class, function (ContactMessageMail $mail) {
            return $mail->hasTo(config('mail.contact.to'))
                && $mail->hasFrom(config('mail.from.address'), 'Ada Bartlett')
                && $mail->hasReplyTo('ada@example.com', 'Ada Bartlett');
        });
    }

    public function test_it_ignores_honeypot_submissions(): void
    {
        Mail::fake();

        $this->postJson('/api/contact', $this->payload([
            'website' => 'https://spam.example',
        ]))
            ->assertOk()
            ->assertJson(['ok' => true]);

        Mail::assertNothingSent();
    }

    public function test_it_rejects_invalid_messages(): void
    {
        Mail::fake();

        $this->postJson('/api/contact', $this->payload([
            'email' => 'not-an-email',
            'message' => '',
        ]))
            ->assertUnprocessable();

        Mail::assertNothingSent();
    }
}
