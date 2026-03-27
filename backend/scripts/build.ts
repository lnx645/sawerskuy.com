import { build } from "bun";

async function runBuild() {
  console.log("🚧 Starting build...\n");

  const start = Date.now();

  const result = await build({
    entrypoints: ["index.ts"],
    outdir: "dist",
    compile: true,
    minify: true,
    sourcemap: "linked",
    target: "bun",
  });
   
  const duration = Date.now() - start;

  // ❌ kalau gagal
  if (!result.success) {
    console.error("❌ Build failed!\n");

    for (const log of result.logs) {
      console.error(
        `[${log.level.toUpperCase()}] ${log.message}`
      );
    }

    console.log(`⏱ Duration: ${duration}ms`);
    process.exit(1);
  }

  // ✅ kalau sukses
  console.log("✅ Build success!\n");

  // tampilkan output file
  for (const output of result.outputs) {
    console.log("📦 Output:", output.path);
  }

  // tampilkan warning (kalau ada)
  const warnings = result.logs.filter(l => l.level === "warning");

  if (warnings.length > 0) {
    console.log("\n⚠️ Warnings:");
    for (const warn of warnings) {
      console.log(`- ${warn.message}`);
    }
  }

  console.log(`\n⏱ Build time: ${duration}ms`);
}

runBuild().catch((err) => {
  console.error("💥 Fatal build error:", err);
});