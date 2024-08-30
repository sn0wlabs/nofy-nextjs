import { Options, defineConfig } from "tsup";

const cfg: Options = {
    splitting: false,
    sourcemap: true,
    clean: true,
    treeshake: false,
    dts: true,
    format: ["cjs", "esm"],
};

export default defineConfig([
    {
        ...cfg,
        entry: {
            index: "src/server/index.ts",
        },
        outDir: "dist/server",
    },
    {
        ...cfg,
        entry: {
            index: "src/index.ts",
        },
        outDir: "dist",
        esbuildOptions: (options) => {
            options.banner = {
                js: '"use client";',
            };
        },
    },
]);
