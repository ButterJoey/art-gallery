#!/bin/bash
# Run this before pushing: checks art.js for syntax errors and image path problems.
#
#   ./check-art.sh
#
# Usage note: run it from inside the "Art Gallery Website" folder.

set -euo pipefail
DIR="$(cd "$(dirname "$0")" && pwd)"
export CHECK_DIR="$DIR"

osascript -l JavaScript <<'EOF'
ObjC.import('Foundation');
ObjC.import('stdlib');

function readFile(path) {
  const str = $.NSString.stringWithContentsOfFileEncodingError(path, $.NSUTF8StringEncoding, null);
  return str ? str.js : null;
}

function fileExistsExact(dirPath, relPath) {
  // Case-sensitive existence check regardless of the underlying filesystem's
  // own case sensitivity, by listing the directory and comparing names exactly.
  const parts = relPath.split("/");
  let currentDir = dirPath;
  for (let i = 0; i < parts.length; i++) {
    const fm = $.NSFileManager.defaultManager;
    const error = Ref();
    const contents = fm.contentsOfDirectoryAtPathError(currentDir, error);
    if (!contents) return false;
    const names = [];
    for (let j = 0; j < contents.count; j++) names.push(contents.objectAtIndex(j).js);
    if (!names.includes(parts[i])) return false;
    currentDir = currentDir + "/" + parts[i];
  }
  return true;
}

function main() {
  const dir = $.NSProcessInfo.processInfo.environment.objectForKey("CHECK_DIR").js;
  const artJsPath = dir + "/art.js";
  const src = readFile(artJsPath);
  if (!src) {
    console.log("FAIL: could not read art.js");
    $.exit(1);
  }

  let ARTWORKS;
  try {
    // Evaluate art.js in a sandboxed function scope, then grab ARTWORKS.
    const fn = new Function(src + "\nreturn typeof ARTWORKS !== 'undefined' ? ARTWORKS : null;");
    ARTWORKS = fn();
  } catch (e) {
    console.log("FAIL: art.js has a syntax error:");
    console.log("  " + e.toString());
    $.exit(1);
  }

  if (!Array.isArray(ARTWORKS)) {
    console.log("FAIL: ARTWORKS is not defined as an array in art.js");
    $.exit(1);
  }

  let problems = [];
  const requiredFields = ["title", "artist", "image", "description"];

  ARTWORKS.forEach((art, i) => {
    const label = art.title ? `"${art.title}"` : `entry #${i + 1}`;
    requiredFields.forEach((field) => {
      if (!art[field] || String(art[field]).trim() === "") {
        problems.push(`${label}: missing or empty "${field}"`);
      }
    });
    if (art.image) {
      const exists = fileExistsExact(dir, art.image);
      if (!exists) {
        problems.push(`${label}: image path "${art.image}" does not exactly match a file on disk (check spelling/case/extension)`);
      }
    }
  });

  console.log(`Checked ${ARTWORKS.length} artwork${ARTWORKS.length === 1 ? "" : "s"}.`);

  if (problems.length === 0) {
    console.log("PASS: no problems found. Safe to push.");
  } else {
    console.log(`FOUND ${problems.length} PROBLEM(S):`);
    problems.forEach((p) => console.log("  - " + p));
    $.exit(1);
  }
}

main();
EOF
