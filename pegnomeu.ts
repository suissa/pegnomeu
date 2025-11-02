#!/usr/bin/env bun
/**
 * pegnomeu.ts v1.3.0
 * CLI global de gerenciamento de dependências e mini-workspaces
 * Autor: Suissa 🧠
 */

import { execSync } from "child_process";
import {
  existsSync,
  mkdirSync,
  rmSync,
  cpSync,
  symlinkSync,
  readFileSync,
  readdirSync,
  statSync,
  writeFileSync,
} from "fs";
import { join } from "path";
import * as os from "os";
import kleur from "kleur";
import readline from "readline";

// ---------------------
// Configurações globais
// ---------------------
const WORKSPACE = process.env.pegnomeu_WORKSPACE || join(os.homedir(), ".pegnomeu_workspace/js");
const TMPDIR = join(os.tmpdir(), `pegnomeu_install_${Date.now()}`);
const PRESET_DIR = join(WORKSPACE, "..", "presets");
ensureDir(PRESET_DIR);

const args = process.argv.slice(2);
const COPY_MODE = args.includes("--copy");
const VERBOSE = args.includes("--verbose");
const SYNC_MODE = args.includes("sync");
const HELP = args.includes("--help");
const IS_DEV = args.includes("--dev");

// ---------------------
// Funções de logging
// ---------------------
function log(...msg: any[]) {
  if (VERBOSE) console.log(kleur.cyan("[pegnomeu]"), ...msg);
}
function info(...msg: any[]) {
  console.log(kleur.blue("[pegnomeu]"), ...msg);
}
function warn(...msg: any[]) {
  console.warn(kleur.yellow("[AVISO]"), ...msg);
}
function error(...msg: any[]) {
  console.error(kleur.red("[ERRO]"), ...msg);
}

// ---------------------
// Utilitários
// ---------------------
function ensureDir(path: string) {
  if (!existsSync(path)) mkdirSync(path, { recursive: true });
}
function pkgDirname(pkg: string, ver: string) {
  const clean = pkg.replace(/[@/:]/g, "-");
  return `${clean}__${ver}`;
}
function exec(cmd: string, cwd?: string) {
  try {
    execSync(cmd, { cwd, stdio: "ignore" });
  } catch {
    error(`Falha ao executar: ${cmd}`);
    process.exit(1);
  }
}
function listDirs(path: string): string[] {
  if (!existsSync(path)) return [];
  return readdirSync(path).filter((f) => statSync(join(path, f)).isDirectory());
}

// ---------------------
// Atualiza package.json
// ---------------------
function addToPackageJSON(name: string, version: string, isDev = false) {
  const pkgPath = "package.json";
  let pkg: any = {};

  if (existsSync(pkgPath)) {
    pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  } else {
    pkg = { name: "my-project", version: "1.0.0" };
  }

  const key = isDev ? "devDependencies" : "dependencies";
  if (!pkg[key]) pkg[key] = {};
  pkg[key][name] = version;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2));
  info(`🧾 Adicionado ${kleur.cyan(name)}@${kleur.gray(version)} em ${kleur.yellow(key)}`);
}

// ---------------------
// Instala pacote único
// ---------------------
function handlePkg(raw: string) {
  let name = raw;
  let version = "latest";

  if (raw.startsWith("@")) {
    const parts = raw.split("@");
    if (parts.length > 2) {
      version = parts.pop() || "latest";
      name = "@" + parts.slice(1).join("@");
    }
  } else if (raw.includes("@")) {
    [name, version] = raw.split("@");
  }

  const dir = pkgDirname(name, version);
  const target = join(WORKSPACE, dir);
  ensureDir(WORKSPACE);

  if (existsSync(target)) {
    log(`✅ Encontrado no workspace: ${name}@${version}`);
  } else {
    info(`⬇️  Baixando ${name}@${version} com Bun...`);
    ensureDir(TMPDIR);
    exec(`bun add "${name}@${version}" --no-save`, TMPDIR);
    const pkgPath = join(TMPDIR, "node_modules", name);
    if (!existsSync(pkgPath)) {
      error(`Pacote ${name} não encontrado após bun add.`);
      process.exit(1);
    }
    cpSync(pkgPath, target, { recursive: true });
    info(`📦 Copiado para ${kleur.green(target)}`);
  }

  ensureDir("node_modules");
  const nodePath = join("node_modules", name);
  rmSync(nodePath, { recursive: true, force: true });

  if (COPY_MODE) {
    cpSync(target, nodePath, { recursive: true });
    info(`📁 Copiado ${kleur.magenta(name)} → node_modules`);
  } else {
    symlinkSync(target, nodePath, "dir");
    info(`🔗 Vinculado ${kleur.magenta(nodePath)} → ${kleur.gray(target)}`);
  }

  addToPackageJSON(name, version, IS_DEV);
}

// ---------------------
// Salvar miniworkspace
// ---------------------
async function askSavePreset() {
  const pkgPath = "package.json";
  if (!existsSync(pkgPath)) return;
  const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  return new Promise<void>((resolve) => {
    rl.question("Deseja salvar estas dependências como miniworkspace? (y/n) ", (ans) => {
      if (ans.toLowerCase() !== "y") return rl.close(), resolve();
      rl.question("Nome do miniworkspace: ", (name) => {
        const path = join(PRESET_DIR, `${name}.json`);
        const data = {
          name,
          dependencies: pkg.dependencies || {},
          devDependencies: pkg.devDependencies || {},
        };
        writeFileSync(path, JSON.stringify(data, null, 2));
        info(`✅ Miniworkspace "${name}" salvo em ${kleur.gray(path)}`);
        rl.close();
        resolve();
      });
    });
  });
}

// ---------------------
// Usar miniworkspace
// ---------------------
function usePreset(name: string) {
  const path = join(PRESET_DIR, `${name}.json`);
  if (!existsSync(path)) return error(`Miniworkspace "${name}" não encontrado.`);
  const preset = JSON.parse(readFileSync(path, "utf8"));
  info(`🧠 Aplicando miniworkspace "${preset.name}"...`);
  const all = { ...preset.dependencies, ...preset.devDependencies };
  for (const [pkg, ver] of Object.entries(all)) handlePkg(`${pkg}@${ver}`);
  info(kleur.green(`🚀 Miniworkspace "${preset.name}" aplicado!`));
}

// ---------------------
// Listar miniworkspaces
// ---------------------
function listPresets() {
  const files = readdirSync(PRESET_DIR).filter((f) => f.endsWith(".json"));
  if (!files.length) return info("Nenhum miniworkspace salvo ainda.");
  info("📂 Miniworkspaces disponíveis:");
  files.forEach((f) => console.log("  -", f.replace(".json", "")));
}

// ---------------------
// Instalar tudo do pkg
// ---------------------
function installAll() {
  ensureDir(WORKSPACE);
  if (!existsSync("package.json")) {
    error("Nenhum package.json encontrado neste diretório.");
    process.exit(1);
  }

  const pkg = JSON.parse(readFileSync("package.json", "utf8"));
  const all = { ...pkg.dependencies, ...pkg.devDependencies };
  const deps = Object.entries(all).map(([k, v]) => `${k}@${v}`);

  if (!deps.length) return warn("Nenhuma dependência encontrada em package.json.");

  info(`📁 Workspace: ${kleur.gray(WORKSPACE)}`);
  for (const dep of deps) handlePkg(dep);
  info(kleur.green("🚀 Instalação concluída!"));
}

// ---------------------
// Ajuda
// ---------------------
function showHelp() {
  console.log(kleur.bold("pegnomeu CLI 1.3.0"));
  console.log(`
  Uso:
    pegnomeu axios@latest       → Instala pacote direto
    pegnomeu --dev vitest       → Instala como devDependency
    pegnomeu use api            → Usa miniworkspace salvo
    pegnomeu list               → Lista miniworkspaces
    pegnomeu --copy             → Copia ao invés de linkar
    pegnomeu sync               → Copia todos do workspace para node_modules
    pegnomeu --verbose          → Logs detalhados
    pegnomeu --help             → Mostra esta ajuda
  `);
}

// ---------------------
// Execução principal
// ---------------------
(async () => {
  if (HELP) return showHelp();
  if (args[0] === "list") return listPresets();
  if (args[0] === "use" && args[1]) return usePreset(args[1]);
  if (SYNC_MODE) return syncWorkspace();

  const pkgs = args.filter((a) => !a.startsWith("--"));
  if (pkgs.length) {
    for (const dep of pkgs) handlePkg(dep);
    await askSavePreset();
  } else {
    installAll();
  }
})();

// ---------------------
// Sincronizar workspace
// ---------------------
function syncWorkspace() {
  ensureDir(WORKSPACE);
  const all = listDirs(WORKSPACE);
  if (!all.length) return warn("Nenhum pacote encontrado no workspace global.");
  ensureDir("node_modules");
  for (const dir of all) {
    const src = join(WORKSPACE, dir);
    const name = dir.split("__")[0];
    const dest = join("node_modules", name);
    rmSync(dest, { recursive: true, force: true });
    exec(`cp -R "${src}" "${dest}"`);
    log(`📁 Sincronizado ${name}`);
  }
  info(kleur.green("✨ Workspace sincronizado com sucesso!"));
}
