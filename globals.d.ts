/// <reference types="webpack-env" />
/// <reference types="vite/client" />

declare module "vite" {
    interface ImportMeta {
        glob: (glob: string) => Record<string, () => Promise<any>>;
    }
}
