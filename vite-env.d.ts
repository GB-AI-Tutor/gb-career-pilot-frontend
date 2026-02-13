interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  // Add other variables here as you add them to .env
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}