# GB Career Pilot - Frontend

React PWA for university guidance platform.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
copy .env.example .env
# Edit .env with API URLs
```



3. pre commit tester :
```bash

uv pip install pre-commit

```
create file .pre-commit-config.yaml in root of this folder and add this:
```bash
repos:
  - repo: https://github.com/pre-commit/pre-commit-hooks
    rev: v4.5.0
    hooks:
      - id: trailing-whitespace  # Cleans up messy spaces
      - id: end-of-file-fixer    # Ensures files end with a newline
      - id: check-yaml           # Validates your .yml files
      - id: check-added-large-files # Prevents pushing huge images

  - repo: https://github.com/astral-sh/ruff-pre-commit
    rev: v0.1.6
    hooks:
      - id: ruff                 # Runs the linter
        args: [ --fix ]          # Automatically fixes what it can
      - id: ruff-format          # Runs the formatter
```

Run this:
```bash
uv run pre-commit install
```

This make sure all tests passes everytime you commit locally.


4. Run development server:
```bash
npm run dev
```

App runs at: http://localhost:5173

## Project Structure
## Tech Stack

- React 18
- Vite
- Tailwind CSS
- Zustand (state management)
- React Router