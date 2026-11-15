A new quote request was submitted on the website.

CONTACT
Name: {{ $payload['contact']['firstName'] }} {{ $payload['contact']['lastName'] }}
Email: {{ $payload['contact']['email'] }}
Phone: {{ $payload['contact']['phone'] }}
Address: {{ $payload['contact']['address'] }}
City: {{ $payload['contact']['city'] }}
Postal code: {{ $payload['contact']['postalCode'] }}

JOB
Service: {{ $payload['details']['service'] }}
Type: {{ $payload['details']['cleaningType'] }}
Space: {{ $payload['details']['space'] ?? '' }}
Bathrooms: {{ $payload['details']['bathrooms'] ?? '' }}
Square footage: {{ $payload['details']['squareFootage'] ?? '' }}
Pets: {{ $payload['details']['pets'] ?? '' }}
Add-ons: {{ $payload['details']['addons'] ?? '' }}
Preferred date: {{ $payload['details']['preferredDate'] ?? '' }}
Time window: {{ $payload['details']['timeWindow'] ?? '' }}
Notes: {{ $payload['details']['additionalInfo'] ?? '' }}

QUOTE
@forelse ($payload['quote']['lines'] ?? [] as $line)
{{ $line['label'] }}: ${{ number_format((float) $line['amount'], 2) }} CAD
@empty
No priced lines yet
@endforelse
Estimated total: ${{ number_format((float) ($payload['quote']['total'] ?? 0), 2) }} CAD

Confirm this price with the client before the visit.
