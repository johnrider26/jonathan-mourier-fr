terraform {
  required_providers {
    scaleway = {
      source = "scaleway/scaleway"
    }
  }
  required_version = ">= 0.13"
}

resource "scaleway_tem_domain" "main" {
  name       = var.contact_domain_name
  accept_tos = true
}

resource "scaleway_domain_record" "dkim" {
  dns_zone = scaleway_tem_domain.main.name
  type     = "TXT"
  name     = "${scaleway_tem_domain.main.project_id}._domainkey"
  data     = scaleway_tem_domain.main.dkim_config
}

resource "scaleway_domain_record" "spf" {
  dns_zone = scaleway_tem_domain.main.name
  type     = "TXT"
  name     = ""
  data     = "v=spf1 ${scaleway_tem_domain.main.spf_config} -all"
}

resource "scaleway_domain_record" "mx" {
  dns_zone = scaleway_tem_domain.main.name
  type     = "MX"
  name     = ""
  data     = "."
  priority = 0
}

/**
 * IAM Key
 */
data "scaleway_account_project" "default" {
  name = "default"
}

resource "scaleway_iam_application" "handler" {
  name = "tem-demo"
}

resource "scaleway_iam_policy" "object_read_only" {
  name           = "Emails Sender"
  application_id = scaleway_iam_application.handler.id

  rule {
    project_ids = [data.scaleway_account_project.default.id]
    permission_set_names = [
      "TransactionalEmailFullAccess",
      "DomainsDNSReadOnly"
    ]
  }
}

resource "scaleway_iam_api_key" "main" {
  application_id = scaleway_iam_application.handler.id
}

/**
 * Function
 */
resource "scaleway_function_namespace" "handler" {
  name = "contact-form-jonathanmourierfr"
}

data "archive_file" "handler" {
  type        = "zip"
  source_dir  = "${path.module}/../form-contact-handler"
  output_path = "${path.module}/.functions/form-contact-handler.zip"
}

resource "scaleway_function" "handler" {
  name         = "contact-form"
  namespace_id = scaleway_function_namespace.handler.id
  runtime      = "python313"
  handler      = "main.handler"
  privacy      = "public"
  zip_file     = data.archive_file.handler.output_path
  zip_hash     = data.archive_file.handler.output_sha
  deploy       = true
  min_scale    = 1

  environment_variables = {
    "MAIL_SMTP_SERVER"       = var.mail_smtp
    "MAIL_SMTP_PORT"         = var.mail_smtp_port
    "MAIL_USER"              = var.mail_user
    "MAIL_PASSWORD"          = var.mail_password
    "RECIPIENT_EMAIL"        = var.recipient_email
    "SCW_DEFAULT_PROJECT_ID" = scaleway_iam_api_key.main.default_project_id
    "SCW_DEFAULT_REGION"     = "fr-par"
  }

  secret_environment_variables = {
    "SCW_ACCESS_KEY" = scaleway_iam_api_key.main.access_key
    "SCW_SECRET_KEY" = scaleway_iam_api_key.main.secret_key
  }
}

output "handler_url" {
  value = "https://${scaleway_function.handler.domain_name}"
}

/**
 * Website
 */
resource "scaleway_object_bucket" "main" {
  name = "jonathanmourier-fr-website"
}

resource "scaleway_object_bucket_acl" "main" {
  bucket = scaleway_object_bucket.main.name
  acl    = "public-read"
}

resource "scaleway_object_bucket_website_configuration" "main" {
  bucket = scaleway_object_bucket.main.name
  index_document {
    suffix = "index.html"
  }
}

resource "scaleway_object" "index" {
  bucket     = scaleway_object_bucket.main.name
  key        = "index.html"
  visibility = "public-read"
}

resource "scaleway_object" "dist_files" {
  for_each   = fileset("${path.module}/../dist", "**/*")
  bucket     = scaleway_object_bucket.main.name
  key        = each.value
  visibility = "public-read"

  file = "${path.module}/../dist/${each.value}"
}

output "url" {
  value = "https://${scaleway_object_bucket_website_configuration.main.website_endpoint}"
}
