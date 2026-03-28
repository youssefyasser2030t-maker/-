const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const root = path.resolve(__dirname, "..");
const zipPath = path.join(root, "mahsoulak-github.zip");

const SKIP_DIRS = new Set([
  "node_modules",
  "dist",
  ".git",
  ".cursor",
  ".svn",
  ".husky",
  ".idea",
  ".vscode",
  "coverage",
  ".vite",
]);

function shouldSkipFile(baseName, relPosix) {
  if (baseName === ".DS_Store" || baseName === "Thumbs.db") return true;
  if (baseName.endsWith(".zip")) return true;
  if (baseName.endsWith("-log.txt") || baseName === "zip-out.txt") return true;
  if (baseName === ".env" || baseName.startsWith(".env.")) return true;
  return false;
}

function walk(dir, rel = "") {
  const out = [];
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return out;
  }
  for (const e of entries) {
    const relPath = rel ? `${rel}/${e.name}` : e.name;
    const relPosix = relPath.split(path.sep).join("/");
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue;
      out.push(...walk(path.join(dir, e.name), relPath));
    } else {
      if (shouldSkipFile(e.name, relPosix)) continue;
      out.push({ abs: path.join(dir, e.name), name: relPosix });
    }
  }
  return out;
}

if (fs.existsSync(zipPath)) fs.unlinkSync(zipPath);

const files = walk(root);
if (files.length === 0) {
  console.error("No files to zip.");
  process.exit(1);
}

const output = fs.createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

output.on("close", () => {
  console.log(`OK: ${zipPath}`);
  console.log(`Files: ${files.length}, size: ${archive.pointer()} bytes`);
});

archive.pipe(output);
for (const f of files) {
  archive.file(f.abs, { name: f.name });
}
archive.finalize();
