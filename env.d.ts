/// <reference types="vite/client" />
interface ImportMetaEnv {
    VITE_API_URL: string,
    fuck_deBug: boolean
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}