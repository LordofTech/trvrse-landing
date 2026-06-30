/**
 * Commit, push to GitHub, and deploy to Vercel production.
 * Usage: npm run ship -- "Commit message"
 */
import { execSync } from "child_process";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const message =
  process.argv.slice(2).join(" ").trim() || "Update Trvrse landing page.";

function run(cmd) {
  console.log(`\n> ${cmd}`);
  execSync(cmd, { cwd: root, stdio: "inherit" });
}

const status = execSync("git status --porcelain", { cwd: root, encoding: "utf8" });

if (!status.trim()) {
  console.log("No changes to ship.");
  process.exit(0);
}

run("git add -A");
run(`git commit -m "${message.replace(/"/g, '\\"')}"`);
run("git push origin HEAD");
run("npx vercel deploy --prod --yes");

console.log("\nShipped.");
console.log("GitHub: https://github.com/LordofTech/trvrse-landing");
console.log("Live:   https://trvrse.app");
