/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_API_URL: string,
    FUCK_DE_BUG: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}