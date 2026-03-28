# my-project

> Built with [Refract](https://github.com/Brunvelop/refract) + [Autocode](https://github.com/Brunvelop/autocode)

---

## 🚀 Quick start (from template)

```bash
# 1. Clone (without fork history)
git clone https://github.com/Brunvelop/new_project_template.git my_project
cd my_project

# 2. Initialize — renames everything, resets git, installs deps
./init.sh my_project

# 3. Activate the virtual environment
source .venv/bin/activate

# 4. Go!
my-project serve           # → http://localhost:8000
```

> **GitHub tip:** Use **"Use this template"** instead of fork — no fork badge on your repo.

---

## 📁 Structure

```
my_project/
├── app.py              ← Refract entry point (views, discover, static)
└── core/
    ├── __init__.py
    └── example.py      ← Example functions — replace with your logic

templates/
├── index.html          ← Landing page  (served at /)
└── about.html          ← About page    (served at /about)

static/
└── style.css           ← Shared styles

pyproject.toml          ← UV project config + dependencies
init.sh                 ← One-time setup script (self-deletes after use)
```

---

## ⚡ Adding a function

Create a file in `my_project/core/` and decorate with `@register_function`:

```python
from pydantic import BaseModel
from refract import register_function

class MyResult(BaseModel):
    value: str

@register_function(http_methods=["GET", "POST"])
def my_function(input: str) -> MyResult:
    """Does something useful.

    Args:
        input: The input string
    """
    return MyResult(value=input.upper())
```

No extra wiring — it automatically appears in the **API**, **CLI**, **MCP**, and **Web UI**.

---

## 🛠 Commands

Activate the venv once per session:

```bash
source .venv/bin/activate
```

Then:

```bash
# Project (port 8000)
my-project serve          # API + MCP + Web UI  →  http://localhost:8000
my-project serve-api      # REST API only
my-project serve-mcp      # MCP only
my-project list           # List all registered functions

# Autocode — dev tooling (port 8001, avoids collision)
autocode serve --port 8001     # Autocode dashboard  →  http://localhost:8001
autocode health-check          # Code quality gates

# Advanced (uvicorn with reload)
# Expose fastapi_app = app.api() in app.py, then:
# uvicorn my_project.app:fastapi_app --reload
```

---

## 🌐 Routes

| Path | Description |
|------|-------------|
| `/` | Custom landing page (`templates/index.html`) |
| `/about` | About page (`templates/about.html`) |
| `/functions` | Auto-generated function UI (Refract built-in) |
| `/docs` | Swagger / OpenAPI docs |
| `/health` | Health check |
| `/static/*` | Static files from `static/` |

---

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| [refract](https://github.com/Brunvelop/refract) | REST API + CLI + MCP + Web UI from one function |
| [autocode](https://github.com/Brunvelop/autocode) | Code quality, git tools, AI dev assistant |
