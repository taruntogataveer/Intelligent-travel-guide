import { readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const envPath = resolve(__dirname, "..", ".env");

function parseEnv(content) {
  const env = {};
  for (const line of content.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
  return env;
}

function mask(val) {
  if (!val || val.length < 8) return "(missing or too short)";
  return `${val.slice(0, 6)}...${val.slice(-4)} (${val.length} chars)`;
}

async function testGemini(key) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${encodeURIComponent(key)}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Reply with only: OK" }] }],
    }),
  });
  const body = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, error: body?.error?.message };
}

async function testPlaces(key) {
  const res = await fetch("https://places.googleapis.com/v1/places:searchText", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "places.displayName",
    },
    body: JSON.stringify({ textQuery: "Paris" }),
  });
  const body = await res.json().catch(() => ({}));
  return {
    ok: res.ok,
    status: res.status,
    error: body?.error?.message || body?.error?.status,
    placeCount: body?.places?.length ?? 0,
  };
}

function validateOAuthClientId(id) {
  const pattern = /^\d+-[a-z0-9]+\.apps\.googleusercontent\.com$/i;
  return {
    formatOk: pattern.test(id),
    hint: pattern.test(id)
      ? "Format looks valid (browser sign-in still needs authorized origins in Google Cloud)"
      : "Invalid OAuth client ID format",
  };
}

function validateGeminiKeyFormat(key) {
  if (!key) return { looksLikeAiStudio: false, note: "Missing" };
  if (key.startsWith("AIza")) return { looksLikeAiStudio: true, note: "Typical Google AI Studio key prefix" };
  if (key.startsWith("AQ.")) return { looksLikeAiStudio: false, note: "Starts with AQ. — not a standard Gemini API key (AI Studio keys usually start with AIza)" };
  return { looksLikeAiStudio: false, note: "Unusual prefix for Gemini" };
}

const env = parseEnv(readFileSync(envPath, "utf8"));
const gemini = env.VITE_GOOGLE_GEMINI_AI_API_KEY;
const places = env.VITE_GOOGLE_PLACE_API_KEY;
const oauth = env.VITE_GOOGLE_AUTH_CLIENT_ID;

console.log("=== Key format check ===\n");
console.log("Gemini:", mask(gemini), "—", validateGeminiKeyFormat(gemini).note);
console.log("Places:", mask(places));
console.log("OAuth: ", mask(oauth), "—", validateOAuthClientId(oauth).hint);

console.log("\n=== Live API tests ===\n");

if (gemini) {
  const g = await testGemini(gemini);
  console.log(
    g.ok ? "✓ Gemini API: OK" : `✗ Gemini API: FAILED (${g.status}) — ${g.error || "unknown"}`
  );
} else {
  console.log("✗ Gemini: key missing");
}

if (places) {
  const p = await testPlaces(places);
  console.log(
    p.ok
      ? `✓ Places API: OK (${p.placeCount} result(s) for test query)`
      : `✗ Places API: FAILED (${p.status}) — ${p.error || "unknown"}`
  );
} else {
  console.log("✗ Places: key missing");
}

console.log("\nOAuth client ID cannot be fully verified from CLI; test Sign In in the browser after Places/Gemini pass.");
