import { Compiler } from "@kasif-apps/plugin-compiler";
import { fileURLToPath } from "url";

const compiler = new Compiler({
  root: fileURLToPath(new URL(".", import.meta.url)),
  metaIdentifier: "kasif",
  remoteIdentifier: "backend",
  extension: "kasif",
  manfiestFile: "package.json",
  tmpPath: "plugin",
  framework: "svelte",
});

compiler.compile();
