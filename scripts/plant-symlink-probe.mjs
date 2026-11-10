// CLOUD-1633 — Cosmic deployer symlink probe (SAFE variant).
//
// After `astro build`, plant a symlink inside the build output (`dist/`) that
// points at a sibling CANARY file. The canary is shipped in the same archive,
// so the link resolves to in-archive content after extraction in the deployer.
//
// Purpose: show whether the Cosmic deployer follows symlinks in build output
// (vulnerable) or rejects them at extraction (fixed, CLOUD-1633).
//   - FIXED deployer (acceptance): deploy FAILS with
//     "Build output archive contains a link or special file".
//   - UNPATCHED deployer (throwaway non-prod only): GET /leak.txt serves the
//     canary string, proving the link was followed.
//
// SAFETY — read before changing this file:
//   * The link target is ALWAYS the sibling canary (`./<canary>`), never
//     `/proc/self/environ`, `.env`, or any path outside the archive. Retargeting
//     it at a secret path turns this probe into real credential exfiltration.
//   * Deploy ONLY to acceptance (to prove the fix blocks it) or a throwaway,
//     non-production app. NEVER to production: on an unpatched prod deployer a
//     secret-targeted link would publish the live CLOUDFLARE_API_TOKEN on a
//     public URL. No real secret is used here precisely so that can't happen.
import { existsSync, writeFileSync, symlinkSync, rmSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
if (!existsSync(dist)) {
  console.error('[probe] dist/ not found — run `npm run build` first');
  process.exit(1);
}

const canaryName = '_cloud_1633_canary.txt';
const canaryBody =
  'CLOUD-1633 PROBE CANARY — not a real secret.\n' +
  'If this text is served at /leak.txt, the deployer followed a symlink in build output.\n';

// Plant at the dist root and under _astro/ so the link lands wherever the
// deploy flow treats as the asset root. Each symlink points only at its sibling
// canary via a relative path.
const targets = [dist, join(dist, '_astro')];
for (const dir of targets) {
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, canaryName), canaryBody);
  const link = join(dir, 'leak.txt');
  rmSync(link, { force: true });
  symlinkSync('./' + canaryName, link);
  console.log(`[probe] planted ${link} -> ./${canaryName}`);
}

console.log('[probe] SAFE: targets are in-archive canaries, not secrets. Acceptance / throwaway only.');
