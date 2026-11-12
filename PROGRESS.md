# PROGRESS

## Task (copied exactly from the user)
ei vdo te dekho website ta Kemon. mouse jokhon niche name tar interaction dekhso? mouse diye carousel kora jay , ar color change hoy niche, ar upore akta light ache dekhso aigula? ami tomake 3d glb file ditesi, tumi amake oirokom website baniye dao, ar choto akta task shesh korei sathe sathe repo te push kore dibe, mone rakhba same to same website chai vdo te jemon dekhesile. ei 2 ta file e ache amar kache, but tumi same to same premium website er motoi baniye diba. amar github er access token to diyechi, oikhane push korba simple choto choto task complete korar por e bar bar push korba, abar dilam token ar repo link: https://github.com/nomanrafi/no-2-perfume-website

Extra chat instruction (Session #1): "Glb file 'no 2 perfume website er repo te ache'. Progress save korba progress repo te ar website er kaj korba no 2 perfume website er repo te. vdo te jeno text button agular size font size jemon dekhteso temon e thakbe, same to same hobe."

## Two repos
- PROGRESS repo (this one): https://github.com/nomanrafi/progress-save → logs, plan, previews.
- WEBSITE repo: https://github.com/nomanrafi/no-2-perfume-website → all website code + the 2 GLB files.
  - GLBs (in website repo root originally): Meshy_AI_Velora_Eau_de_Parfum_1112110251_texture.glb, Meshy_AI_Velora_Blue_Elegance_1112110455_texture.glb
- Reference video (not in repo, 1.7MB mp4 in chat): "Ciao Energy" site recorded on a laptop. Contact sheets: output/preview/video_contact_sheet_*.jpg

## Reference video breakdown (what must be copied 1:1)
1. HERO: black bg, dark grey vignette. Products float in a horizontal arc carousel (centre product big + coloured, side ones dark/silhouette, tilted). Drag with mouse / wheel to rotate carousel.
2. Top-centre: brand logo sitting on a glowing ring-light disc (hanging light) that lights the centre product from above.
3. Header: top-left tiny "ON" sound toggle with bars; top-right "⁙ MENU" + small white pill button "CONTACT". Thin corner marks on viewport.
4. Bottom-centre: product name in heavy italic condensed/wide caps, 2 lines (e.g. "KIWI / CONCOMBRE"), under it a thin gradient line slider with a dot (progress), tiny caps text "SCROLLER POUR DÉCOUVRIR". Bottom glow colour changes with active product.
5. SCROLL → detail section: bg turns to product colour gradient, big tilted product on right/centre, left text: title heavy italic + paragraph; right side vertical column of 4 round icons (feature nav). Scrolling steps through features (small tag pill + title + text), product rotates.
6. Big blurred statement text ("ZERO BULLSHIT") with bright colour flash.
7. Product goes back to dark bg, then "FOIRE AUX QUESTIONS" huge heavy italic title + FAQ accordion list (thin lines, chevrons).

## Status
- Overall: IN PROGRESS
- Current step: Step 6/8 (test + polish)
- Last updated: 2026-11-12 18:35 (Asia/Dhaka) by Session #9

## Plan
- [x] Step 0: Setup progress repo, analyse video, plan
- [x] Step 1: Website repo scaffold (vendor three.js r160, fonts, GLBs moved to assets/models) — pushed to website repo
- [x] Step 2: Hero 3D carousel (code written in js/main.js, untested)
- [x] Step 3: Hero UI overlay (index.html + css/style.css, vw sizes)
- [x] Step 4: Scroll detail section (code written, untested)
- [x] Step 5: Statement + FAQ section (code written, untested)
- [ ] Step 6: Screenshot test (headless chromium) + polish  ← IN PROGRESS (Session #4)
- [ ] Step 7: Final check, README, summary

## Done so far (details)
- Step 1: website repo layout: index.html, css/{fonts,style}.css, js/{main.js,vendor/three.module.js,GLTFLoader.js,BufferGeometryUtils.js,RoomEnvironment.js}, assets/models/velora-eau-de-parfum.glb (black+gold), velora-blue-elegance.glb (blue+gold), assets/fonts/archivo-italic-var.woff2 (Archivo italic, wdth 125, wght 800-900 = heavy wide italic like video), inter-var.woff2.
- Step 0: frames extracted (ffmpeg fps=2, crop of laptop screen), design breakdown above.

## NEXT STEP (exact instructions for the next agent)
- Session #7 found: (a) detail bottle full-spun showing blank back -> now sways (pushed 33cb076); (b) scroll smoothing was frame-rate dependent -> lagged badly on slow GPUs (statement/FAQ appeared late) -> fixed with dt-based k(); (c) FAQ bottle moved up/right so questions are readable.
- Session #8: (b)+(c) re-applied and pushed (website 0815772).
- Then: verify with `CHROME=/usr/local/bin/chromium NODE_PATH=/data/node_modules node scripts/shot.js /tmp/s 0,2.5,4.5,6.3,7.4,8.9` (site served on :8123), then Step 7 README.

- Session #9: verified 0815772 (all sections render, output/preview/s9_sections.jpg). Pushed 6f0956d: name block raised (video has name right under product), ring bigger, FAQ bottle moved right. NEXT: check /tmp-style shots 0,1.2,8.9 then write README.md in website repo (Step 7).

## Problems / Notes
- (none yet)

## Environment setup (run these on a fresh computer)
- git clone both repos (token in URL, never in files). NOTE: the instruction file has TWO tokens: the 1st works for progress-save, the 2nd works for no-2-perfume-website. Website is static: serve with `python3 -m http.server` in website repo.

## External actions (not in code)
- None.

## Session History
- Session #1: started new task. Did step 0 only (stopped by usage limit while scaffolding; scaffold was NOT pushed).
- Session #2 (2026-11-12): started, resuming from step 1 (website scaffold). Stopped by usage policy; scaffold again NOT pushed.
- Session #3 (2026-11-12 17:45): started, resuming from step 1. Website repo still only GLBs. Later pushed to website repo: scaffold, index.html, style.css, WIP main.js (steps 2-5 untested) but did NOT update this PROGRESS file. Stopped while writing screenshot test script.
- Session #4 (2026-11-12 17:52): started, resuming: test + fix WIP main.js (steps 2-5), then step 6 screenshot test. Got first hero screenshot; was tuning carousel layout when stopped (tuning NOT pushed).
- Session #5 (2026-11-12 18:00): started, resuming step 6 (carousel layout tuning + test all sections). Pushed carousel tuning to website repo (c79e1a7). Stopped while fixing scroll smoothing / testing desktop.
- Session #6 (2026-11-12 18:10): started, resuming step 6 (verify scroll sections, smooth scroll, match video sizes).
- Session #7 (2026-11-12 18:25): started, resuming step 6 (verify scroll sections, polish to match video 1:1).
- Session #8 (2026-11-12 18:35): started, resuming step 6. Found Session #7 fixes (b) dt-based smoothing and (c) FAQ bottle move were NOT pushed (website HEAD 33cb076). Redoing them.
- Session #9 (2026-11-12 18:40): started, resuming step 6 (verify 0815772 with screenshots, then polish + Step 7 README).
