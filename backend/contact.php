<?php

require_once __DIR__ . '/vendor/autoload.php';

use AltchaOrg\Altcha\Altcha;
// Set CORS headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST,GET,OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Handle OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    http_response_code(200);
    exit();
}

// Check if request method is POST or GET
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
    exit();
}

// Parse the incoming form data
try {
    $body = json_decode(file_get_contents('php://input'), true);
    $firstname = $body['firstname'] ?? null;
    $lastname = $body['lastname'] ?? null;
    $email = $body['email'] ?? null;
    $message = $body['message'] ?? null;
    $altcha_payload = $body['altcha'] ?? null;
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid form data']);
    exit();
}

$altchaHmacKey = $_ENV['ALTCHA_HMAC_KEY'] ?? 'altcha-hmac-key';
$altcha = new Altcha($altchaHmacKey);


try {
    $ok = $altcha->verifySolution($altcha_payload, true);

    if (!$ok) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid Altcha payload']);
        exit();
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to process Altcha payload: ' . $e->getMessage()]);
    exit();
}

// Email configuration
$sender_email = $_ENV['MAIL_USER'];
$sender_password = $_ENV['MAIL_PASSWORD'];
$recipient_email = $_ENV['RECIPIENT_EMAIL'];
$smtp_server = $_ENV['MAIL_SMTP_SERVER'];
$smtp_port = $_ENV['MAIL_SMTP_PORT'];

if (!$sender_email || !$sender_password || !$recipient_email || !$smtp_server || !$smtp_port) {
    http_response_code(500);
    echo json_encode(['error' => 'Email configuration is missing']);
    exit();
}

// Create the email
$subject = "Nouvelle demande de contact depuis le formulaire jonathanmourier.fr";
$email_body = "Nom: $firstname $lastname\nEmail: $email\nMessage: $message";

$headers = array(
    'From' => $sender_email,
    'Reply-To' => $email,
    'X-Mailer' => 'PHP/' . phpversion()
);

// Send the email
try {
    $mail_sent = mail($recipient_email, $subject, $email_body, $headers);

    if (!$mail_sent) {
        throw new Exception('Failed to send email');
    }

    http_response_code(200);
    echo json_encode(['message' => 'Email sent successfully']);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email: ' . $e->getMessage()]);
}