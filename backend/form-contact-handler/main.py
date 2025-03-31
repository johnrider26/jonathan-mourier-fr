import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import json

def handler(event, context):
    # Parse the incoming form data
    try:
        body = json.loads(event['body'])
        firstname = body.get('firstname')
        lastname = body.get('lastname')
        email = body.get('email')
        message = body.get('message')
    except (KeyError, ValueError):
        return {
            "statusCode": 400,
            "body": json.dumps({"error": "Invalid form data"})
        }

    # Email configuration
    sender_email = os.getenv("GMAIL_USER")
    sender_password = os.getenv("GMAIL_PASSWORD")
    recipient_email = os.getenv("RECIPIENT_EMAIL")
    smtp_server = os.getenv("MAIL_SMTP_SERVER")
    smtp_port = int(os.getenv("MAIL_SMTP_PORT"))

    if not sender_email or not sender_password or not recipient_email or not smtp_server or not smtp_port:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": "Email configuration is missing"})
        }

    # Create the email
    subject = "Nouvelle demande de contact depuis le formulaire jonathanmourier.fr"
    email_body = f"Nom: {firstname} {lastname}\nEmail: {email}\nMessage: {message}"

    msg = MIMEMultipart()
    msg['From'] = sender_email
    msg['To'] = recipient_email
    msg['Subject'] = subject
    msg.attach(MIMEText(email_body, 'plain'))

    # Send the email
    try:
        with smtplib.SMTP(smtp_server, smtp_port) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.sendmail(sender_email, recipient_email, msg.as_string())
    except Exception as e:
        return {
            "statusCode": 500,
            "body": json.dumps({"error": f"Failed to send email: {str(e)}"})
        }

    return {
        "statusCode": 200,
        "body": json.dumps({"message": "Email sent successfully"})
    }