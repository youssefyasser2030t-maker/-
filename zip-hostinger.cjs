const fs = require("fs");
const path = require("path");
const archiver = require("archiver");

const root = path.resolve(__dirname, "..");
const dist = path.join(root, "dist");
const zipPath = path.join(root, "hostinger-site.zip");

if (!fs.existsSync(dist)) {
  console.error("Missing dist/. Run: npm run build");
  process.exit(1);
}

if (fs.existsSync(zipPath)) {
  fs.unlinkSync(zipPath);
}

const output = fs.createWriteStream(zipPath);
const archive = archiver("zip", { zlib: { level: 9 } });

archive.on("error", (err) => {
  console.error(err);
  process.exit(1);
});

output.on("close", () => {
  const bytes = archive.pointer();
  console.log(`OK: ${zipPath}`);
  console.log(`Size: ${bytes} bytes`);
});

archive.pipe(output);
archive.directory(dist + path.sep, false);
archive.finalize();
