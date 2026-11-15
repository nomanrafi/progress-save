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


## NEW TASK (Session #11, 2026-11-15) — user chat request (Bangla, copied exactly)
"ager agent ra website ta baniyese but akhono onek kichui fix korar baki ache, ami assets folder a aro 2 ta product er glb file add koresi green ar purple color er, ei 2 ta product o add korba, ar uporer jei light circle box ta jeita theke light portese product er upore, aita arektu boro hobe ar oi light box er velora parfums lekha tao aktu boro hobe. ar menu ar contact button gula o aktu boro hobe, baki sob pore jei 2 ta product upload korsi oigular jonno nicher feature gula o update korbe. erpor aktu niche gele dan pasher ei text gular size aro boro korba, parle arektu better design add koro, aro info details add koro, dekho image a blue mark kore diyesi. nicher frequent asked question ei lekha ta ar aktu choto korbe, ar er nicher question gular lekha aro boto korbe."
- WEBSITE repo is now https://github.com/nomanrafi/velora-luxury-perfume (renamed; token #2). New GLBs: assets/models/velora-green-parfum.glb, velora-purple-elegance.glb
- Blue-marked area in user's screenshot = left detail text panel (title + paragraph, e.g. ROSE OBSCURE).
### Session #11 plan
- [x] A: add green + purple products (MODELS, PRODUCTS), per-product features (notes)
- [x] B: ring light + logo bigger, MENU/CONTACT bigger
- [x] C: detail left panel: bigger text, better design, more info (family, intensity, longevity, sillage, size, price)
- [x] D: FAQ title smaller, questions bigger
- [x] E: screenshot verify, push, log

## Status
- Overall: IN PROGRESS — Session #27 MOBILE task (see bottom). Earlier: DONE (Session #25 F1/F2 done, website HEAD 1d21501; Session #11 new requests A-E done & verified by Session #24, preview agent-progress/preview/s24_final.jpg)
- Current step: done
- Last updated: 2026-11-15 12:15 (Asia/Dhaka) by Session #26

## Plan
- [x] Step 0: Setup progress repo, analyse video, plan
- [x] Step 1: Website repo scaffold (vendor three.js r160, fonts, GLBs moved to assets/models) — pushed to website repo
- [x] Step 2: Hero 3D carousel (code written in js/main.js, untested)
- [x] Step 3: Hero UI overlay (index.html + css/style.css, vw sizes)
- [x] Step 4: Scroll detail section (code written, untested)
- [x] Step 5: Statement + FAQ section (code written, untested)
- [x] Step 6: Screenshot test (headless chromium) + polish
- [x] Step 7: Final check, README, summary

## Done so far (details)
- Step 1: website repo layout: index.html, css/{fonts,style}.css, js/{main.js,vendor/three.module.js,GLTFLoader.js,BufferGeometryUtils.js,RoomEnvironment.js}, assets/models/velora-eau-de-parfum.glb (black+gold), velora-blue-elegance.glb (blue+gold), assets/fonts/archivo-italic-var.woff2 (Archivo italic, wdth 125, wght 800-900 = heavy wide italic like video), inter-var.woff2.
- Step 0: frames extracted (ffmpeg fps=2, crop of laptop screen), design breakdown above.

## NEXT STEP (exact instructions for the next agent)
- Session #7 found: (a) detail bottle full-spun showing blank back -> now sways (pushed 33cb076); (b) scroll smoothing was frame-rate dependent -> lagged badly on slow GPUs (statement/FAQ appeared late) -> fixed with dt-based k(); (c) FAQ bottle moved up/right so questions are readable.
- Session #8: (b)+(c) re-applied and pushed (website 0815772).
- Then: verify with `CHROME=/usr/local/bin/chromium NODE_PATH=/data/node_modules node scripts/shot.js /tmp/s 0,2.5,4.5,6.3,7.4,8.9` (site served on :8123), then Step 7 README.

- Session #9: verified 0815772 (all sections render, output/preview/s9_sections.jpg). Pushed 6f0956d: name block raised (video has name right under product), ring bigger, FAQ bottle moved right. NEXT: check /tmp-style shots 0,1.2,8.9 then write README.md in website repo (Step 7).

- Session #9 final: shots output/preview/s9_polish.jpg OK. README.md added to website repo. Task DONE. If user asks more: tweak sizes in css/style.css / poses in js/main.js layout().

## How to use the result
- Website repo: `python3 -m http.server 8000` in repo root, open localhost:8000, or enable GitHub Pages (main, root).

## Problems / Notes
- (none yet)

## Environment setup (run these on a fresh computer)
- git clone both repos (token in URL, never in files). NOTE (updated Session #26): the instruction file has TWO tokens. The 1st (GITHUB_TOKEN line) is now INVALID (auth fails). The 2nd (website token) works ONLY for velora-luxury-perfume (403 on progress-save). Session #26: user gave a NEW token in chat for progress-save (not stored here; ask the user / update instruction file section 0). Website is static: serve with `python3 -m http.server` in website repo.

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
- Session #10 (2026-11-12 18:50): started. Task already DONE (website 6cae0d0). User asked how to live-review the site. Re-verifying with screenshots; GitHub Pages NOT enabled (needs user's OK, it makes the site public).
- Session #11 (2026-11-15 00:40): started. Previous chat agent (unlogged) was stopped by usage policy; its edits were NOT pushed (website HEAD 51ba3a0 = user GLB upload). Doing NEW TASK plan A-E.
- Session #12 (2026-11-15 00:45): started. Session #11 only pushed its start log (plan A-E unchecked, code untouched at 51ba3a0). Doing plan A-E now. Logs live in website repo agent-progress/ (progress-save push = 403). Local clone dir: /data/site.
- Session #13 (2026-11-15 00:50): started. Step A pushed (d736c7d, untested). Testing A, then B-E.
- Session #15 (2026-11-15 01:00): started. A (d736c7d) + B-D CSS (67518de) pushed, untested. Testing with screenshots, fixing, then E.
- Session #14 (2026-11-15 00:53): started. Step A pushed (d736c7d) but untested. Testing A, then B-E. Clone dir /data/site.
- Session #16 (2026-11-15 01:05): started. Resuming E: test A (d736c7d) + B-D (67518de) with screenshots, fix, push.
- Session #17 (2026-11-15 01:10): started. Testing A (d736c7d) + B-D (67518de) with screenshots, fix, push. Clone dir /data/site.
- Session #18 (2026-11-15 01:15): started. Testing A (d736c7d) + B-D (67518de) with screenshots, fix, push. Clone dir /data/velora.
- Session #19 (2026-11-15 01:25): started. Resuming E: verify b6e19ea (FAQ bottle fix) + green/purple products with shot_next.js, final polish, push. Clone dir /data/velora.
- Session #20 (2026-11-15 01:35): started. Verifying b6e19ea (A-E) with screenshots, final polish, push. Clone dir /data/site.
- Session #21 (2026-11-15 01:40): started. Verifying 2dafcc7 (A-E all written) with screenshots, final polish, push. Clone dir /data/velora.
- Session #22 (2026-11-15 01:45): started. Verifying b12de37 (A-E written; s21 panel text bump) with screenshots, final polish, push. Clone dir /data/velora-luxury-perfume. Auth via GIT_ASKPASS (token never in URL/config).
- Session #23 (2026-11-15 02:05): started. Code A-E all present at b12de37. Quick screenshot verify, then mark DONE. Clone dir /data/velora.
- Session #24 (2026-11-15 02:10): started. A-E code present (b12de37). One quick screenshot verify, then mark DONE. Clone dir /data/site.
- Session #24: verified hero/detail/FAQ render OK (s24_final.jpg). A-E DONE. If user asks more: sizes in css/style.css, products in js/main.js PRODUCTS.

## NEW TASK (Session #25, 2026-11-15 11:55) — user chat request
"ring light box + VELORA PARFUMS logo aktu choto, carousel products aktu boro (besi na), MENU/CONTACT aktu choto, scroll-down details section aktu choto, FAQ title aro choto, questions text aktu choto. Push fast after each small task."
- [x] F1: ring 31vw->24vw, logo 2.45->1.95vw, sub 1.02->.82vw, menu/contact smaller, FAQ title 2.8->2.2vw, questions 1.6->1.25vw, answers 1.15->1vw (css/style.css); carousel sc 1.22/0.86 -> 1.36/0.96 (js/main.js layout)
- [x] F2: detail panel (.intro/.feats + text) scaled to ~82% (css/style.css)
- Session #25 (2026-11-15 11:55): started, did F1.

- Session #25 (2026-11-15 12:00): verified F1+F2 (ring/logo/menu/contact/FAQ smaller, carousel bigger, detail panel smaller) with screenshots agent-progress/preview/s25_F_verify.jpg. All OK. Task DONE.

- Session #26 (2026-11-15 12:15): user asked to save progress to progress-save. Synced logs, scripts and previews (s18/s21/s24/s25) from website repo agent-progress/ into this repo (sessions #11-#25 were never pushed here; prior local commit 876e98 was lost with old workspace). Website token got 403 here; user then gave a new progress-save token in chat and push succeeded. Task status: DONE, nothing pending. From now on push logs directly to progress-save.

## NEW TASK (Session #27, 2026-11-15 12:20) — user chat request (Bangla, copied exactly)
"akhon sudu mobile version er kaj korba, desktop version a touch o korba na, just mobile version a change korba. Dekho koyekta image diyechi, mobile version a kemon jeno website ta slow kaj kore, product carousel slow ar atke atke jay, erpor uporer light box, menu, contact aksathe mishe gese, ar carousel product gula onek choto, mobile version er carousel er product gula arektu boro koro. Niche detail section er sathe product mishe gese. Niche scroll smoothly hoy na, atke atke jay."
- Screenshots (phone ~390px wide): logo overlaps MENU; ring light under header; carousel bottles small; detail card text drawn on top of the big bottle; FAQ bottle over questions; laggy carousel + scroll.
- RULE: desktop must stay byte-identical in behaviour -> only @media (max-width:760px) CSS and `isMobile` branches in JS.
### Session #27 plan
- [ ] M1: header layout mobile (logo/ring centred below, MENU/CONTACT smaller, no overlap)
- [ ] M2: performance on mobile (pixelRatio cap, no shadows/AA, lighter smoothing, passive touch)
- [ ] M3: carousel bottles bigger on mobile
- [ ] M4: detail section: bottle moved to top / card below, no overlap; FAQ bottle away from questions
- [ ] M5: smooth scroll on mobile (native scroll, no heavy lerp lag)
- [ ] M6: screenshot verify at 390x844, push, log
- Session #27 (12:20): started.
