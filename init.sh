#!/usr/bin/env bash
# ─────────────────────────────────────────────────────────────────────────────
# init.sh — Initialize a new project from this template
#
# Usage:
#   ./init.sh <project_name>
#
# Example:
#   ./init.sh cool_app
#
# What it does:
#   1. Renames the package directory  my_project/ → <project_name>/
#   2. Replaces all references to  my_project / my-project  in every file
#   3. Resets git history (rm -rf .git + git init + first commit)
#   4. Runs uv sync
#   5. Activates the virtual environment
#   6. Self-deletes
# ─────────────────────────────────────────────────────────────────────────────
set -euo pipefail

# ── 0. Validate input ─────────────────────────────────────────────────────────
if [[ $# -lt 1 ]]; then
  echo "Usage: ./init.sh <project_name>"
  echo "Example: ./init.sh cool_app"
  exit 1
fi

PROJECT_SNAKE="$1"                              # e.g. cool_app
PROJECT_KEBAB="${PROJECT_SNAKE//_/-}"           # e.g. cool-app

# Basic validation: only letters, numbers and underscores
if [[ ! "$PROJECT_SNAKE" =~ ^[a-z][a-z0-9_]*$ ]]; then
  echo "❌  Project name must start with a lowercase letter and contain only [a-z0-9_]"
  exit 1
fi

echo ""
echo "🚀  Initializing project: ${PROJECT_SNAKE} (${PROJECT_KEBAB})"
echo ""

# ── 1. Rename package directory ───────────────────────────────────────────────
if [[ -d "my_project" ]]; then
  echo "📁  Renaming my_project/ → ${PROJECT_SNAKE}/"
  mv my_project "${PROJECT_SNAKE}"
else
  echo "⚠️   Directory my_project/ not found — skipping rename"
fi

# ── 2. Replace text in all files ──────────────────────────────────────────────
echo "✏️   Replacing references in files..."

# Files to process (all text files, excluding .git and .venv)
FILES=$(find . \
  -not -path './.git/*' \
  -not -path './.venv/*' \
  -not -path './__pycache__/*' \
  -not -name 'init.sh' \
  -type f \
  \( -name "*.py" -o -name "*.toml" -o -name "*.html" -o -name "*.css" \
     -o -name "*.js" -o -name "*.md" -o -name "*.txt" -o -name "*.json" \
     -o -name "*.yaml" -o -name "*.yml" -o -name "*.cfg" -o -name "*.ini" \))

for FILE in $FILES; do
  if grep -qE "my_project|my-project" "$FILE" 2>/dev/null; then
    sed -i \
      -e "s/my_project/${PROJECT_SNAKE}/g" \
      -e "s/my-project/${PROJECT_KEBAB}/g" \
      "$FILE"
    echo "   ✅  $FILE"
  fi
done

# ── 3. Reset git history ───────────────────────────────────────────────────────
echo ""
echo "🔄  Resetting git history..."
rm -rf .git
git init -q
git add -A
git commit -q -m "chore: init ${PROJECT_KEBAB} from template"
echo "   ✅  New git repository initialized"

# ── 4. Install dependencies ───────────────────────────────────────────────────
echo ""
echo "📦  Running uv sync (this may take a minute on first install)..."
uv sync
echo "   ✅  Dependencies installed"

# ── 5. Self-delete ────────────────────────────────────────────────────────────
echo ""
SCRIPT_PATH="$(realpath "$0")"
rm -- "$SCRIPT_PATH"
echo "🧹  init.sh removed"

# ── Done ──────────────────────────────────────────────────────────────────────
echo ""
echo "─────────────────────────────────────────────────"
echo "✅  ${PROJECT_KEBAB} is ready!"
echo ""
echo "Activate the virtual environment:"
echo ""
echo "   source .venv/bin/activate"
echo ""
echo "Then run:"
echo ""
echo "   ${PROJECT_KEBAB} serve            →  http://localhost:8000"
echo "   ${PROJECT_KEBAB} list             →  list registered functions"
echo "   autocode serve --port 8001        →  http://localhost:8001"
echo "   autocode health-check             →  code quality gates"
echo "─────────────────────────────────────────────────"
echo ""
