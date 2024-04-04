/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// To use: mport.meta.env.VITE_KEY;