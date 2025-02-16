import { defineConfig } from "tsup";

export default defineConfig({
    entry: ["src/index.ts"],
    outDir: "dist",
    format: ["esm"],
    target: "es2020",
    splitting: true,
    bundle: true,
    minify: true,
    sourcemap: true,
    clean: true,
    external: [],
});
