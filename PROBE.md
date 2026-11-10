# CLOUD-1633 symlink probe

Proves whether the Webflow Cloud (Cosmic) deployer follows symlinks in build
output. Companion to the fix in `webflow/infrastructure` PR #9181.

## What it does

`npm run build` runs `astro build`, then `postbuild` (`scripts/plant-symlink-probe.mjs`)
plants a symlink in `dist/` that points at a **canary** file shipped in the same
output. No real secret is involved.

## The mechanism

The cosmic *builder* assembles output with `recursiveCopy`, which skips
symlinks — so this probes the **CLI deploy** path, which uploads `dist/`
directly. The deployer then extracts that archive while holding the Cloudflare
deploy token.

## Expected results

| Environment | Deployer state | Expected outcome |
| --- | --- | --- |
| **Acceptance** | fix present | Deploy **fails**: `Build output archive contains a link or special file`. This is the proof the fix works. |
| **Throwaway non-prod app** | unpatched | `GET /leak.txt` serves the canary string — the link was followed. Demonstrates the pre-fix behaviour. Nothing sensitive is exposed because the target is the in-archive canary. |

## Safety rules (do not skip)

- **Acceptance or a throwaway non-prod app only.** Never production.
- **Never** retarget the symlink at `/proc/self/environ`, `.env`, or any path
  outside the archive. That converts this into real token exfiltration. On an
  unpatched prod deployer it would publish the live `CLOUDFLARE_API_TOKEN` on a
  public URL, where rotating afterwards does not undo the exposure.
- Loop in Security (Jason Axley) and RJ before any deploy used as incident
  evidence.

## Run

```bash
npm install
npm run build        # astro build + postbuild plants the probe
# then deploy via the CLI to acceptance, and separately to a throwaway app
```
