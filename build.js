import path from "path";
import { fileURLToPath } from "url";
import { build } from "vite";
import dts from "vite-plugin-dts";
import { zip } from "zip-a-folder";
import fs from "fs";
import { svelte } from '@sveltejs/vite-plugin-svelte'

const dirname = fileURLToPath(new URL(".", import.meta.url));

async function $compile() {
  await build({
    plugins: [
      svelte({
        compilerOptions: {
          css: true
        }
      }),
      dts({
        insertTypesEntry: true,
      }),
    ],
    build: {
      lib: {
        entry: path.resolve(dirname, "src/lib/index.ts"),
        name: "plugin",
        formats: ["es"],
        fileName: () => `${process.env.npm_package_kasif_entry}.js`,
      },
      rollupOptions: {
        external: [],
        output: {
          globals: {},
        },
      },
      sourcemap: true,
      outDir: "plugin",
    },
    resolve: {
      alias: {},
    },
  });
}

async function $package() {
  await fs.promises.rm(path.join(dirname, "/dist"), {
    recursive: true,
    force: true,
  });
  await fs.promises.mkdir(path.join(dirname, "/dist"));

  await fs.promises.copyFile(
    path.join(dirname, "/package.json"),
    path.join(dirname, "/plugin/package.json")
  );

  await zip(
    path.join(dirname, "/plugin"),
    path.join(dirname, `/dist/${process.env.npm_package_kasif_identifier}.kasif`)
  );

  await fs.promises.rm(path.join(dirname, "/plugin"), {
    recursive: true,
    force: true,
  });
}

async function main() {
  await $compile();
  await $package();
}

main();
