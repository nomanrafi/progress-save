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
