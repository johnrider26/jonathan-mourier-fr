<?php

require_once __DIR__ . '/vendor/autoload.php';

use AltchaOrg\Altcha\Altcha;
use AltchaOrg\Altcha\ChallengeOptions;

// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Check if request method is GET
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Get HMAC key from environment
$altchaHmacKey = $_ENV['ALTCHA_HMAC_KEY'] ?? 'altcha-hmac-key';
$altcha = new Altcha($altchaHmacKey);

try {

    $challenge = new ChallengeOptions(
        maxNumber: 100000, // the maximum random number
        expires: (new \DateTimeImmutable())->add(new \DateInterval('PT10S')),
);

    http_response_code(200);
    echo json_encode($altcha->createChallenge($challenge));
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to create challenge: ' . $e->getMessage()]);
}