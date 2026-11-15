<?php

namespace App\Mail;

use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Address;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Mail\Mailables\Headers;

class ContactMessageMail extends Mailable
{
    /**
     * @param  array<string, mixed>  $payload
     */
    public function __construct(public array $payload) {}

    public function envelope(): Envelope
    {
        $name = trim($this->payload['firstName'].' '.$this->payload['lastName']);

        return new Envelope(
            from: new Address((string) config('mail.from.address'), $name),
            subject: 'Contact message from '.$name,
            replyTo: [
                new Address($this->payload['email'], $name),
            ],
        );
    }

    public function content(): Content
    {
        return new Content(
            text: 'emails.contact-message',
        );
    }

    public function headers(): Headers
    {
        return new Headers(
            text: [
                'X-Mailer' => 'JuHenContactForm',
            ],
        );
    }
}
