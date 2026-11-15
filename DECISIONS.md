# DECISIONS

### 1. Brand
Decision: brand name "VELORA" (from GLB file names "Velora Eau de Parfum" / "Velora Blue Elegance").
Why: user gave no brand name; models already carry it.

### 2. Tech
Decision: static site, plain HTML/CSS/JS + three.js (vendored in repo, no build step).
Why: easy to host (GitHub Pages/Vercel), no npm needed by user.

### 3. Only 2 models but carousel needs many items
Decision: carousel of 6 fragrances alternating the 2 GLBs, each with own name + accent colour (glow/bg).
Why: video carousel shows ~7 items; user has 2 models.

### 4. Fonts
Decision: Archivo Italic, width 125%, weight 900 for big titles; Inter for small UI text.
Why: video uses heavy wide italic caps (Ciao Energy style); Archivo expanded black italic is the closest free match.

### S11-1. Where progress logs go
Decision: Session #11 mirrors PROGRESS/COMMANDS/DECISIONS into the WEBSITE repo folder `agent-progress/` (script scripts/sync.sh).
Why: both tokens get HTTP 403 when pushing to progress-save (read-only now); token #2 can push to velora-luxury-perfume.

### S26-1. Progress repo push restored
Decision: push logs to progress-save again (not only website agent-progress/).
Why: user explicitly asked (Session #26); token #1 is invalid, token #2 got 403 here; user provided a new progress-save token (Session #26).
