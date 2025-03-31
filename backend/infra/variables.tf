variable "domain_name" {
  description = "Domain name to use for the demo"
  type        = string
}

variable "contact_domain_name" {
  description = "Function name to use for the demo"
  type        = string
}

variable "mail_user" {
  description = "mail user to use for the demo"
  type        = string
}

variable "mail_password" {
  description = "mail password to use for the demo"
  type        = string
}

variable "recipient_email" {
  description = "Recipient email to use for the demo"
  type        = string
}

variable "mail_smtp" {
  description = "SMTP server to use for the demo"
  type        = string
}

variable "mail_smtp_port" {
  description = "SMTP port to use for the demo"
  type        = string
}
