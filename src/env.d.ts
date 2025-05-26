interface ImportMetaEnv {
  readonly PUBLIC_CONTACT_ENDPOINT: string;
  readonly PUBLIC_CAPTCHA_ENDPOINT: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}