# COMMANDS

### 1. Clone repos
$ git clone https://x-access-token:<TOKEN>@github.com/nomanrafi/progress-save.git ; same for no-2-perfume-website
Result: SUCCESS. progress-save empty; website repo has 2 GLBs (4.9MB, 4.5MB).

### 2. Extract frames from reference video
$ ffmpeg -i video.mp4 -vf "fps=2,crop=600:370:45:425,scale=1200:-1" crops/c%02d.png ; magick montage ...
Result: SUCCESS, 25 frames → output/preview/video_contact_sheet_1/2.jpg

### 3. Session #2: re-clone both repos
$ git clone https://x-access-token:<TOKEN>@github.com/nomanrafi/progress-save.git ; same for no-2-perfume-website
Result: SUCCESS. Website repo still only has 2 GLBs (previous scaffold was lost).

### 4. Session #3: re-clone both repos into /data/progress and /data/site
$ git clone https://x-access-token:<TOKEN>@github.com/nomanrafi/progress-save.git progress ; ...no-2-perfume-website.git site
Result: SUCCESS. Website repo still only 2 GLBs. Added scripts/push.sh (commit+push helper, token read from /tmp/.tok).

### 5. Scaffold website (Step 1)
$ git mv *.glb assets/models/... ; curl three@0.160.0 (three.module.js, GLTFLoader, BufferGeometryUtils, RoomEnvironment) -> js/vendor ; sed imports to relative
$ curl Google Fonts Archivo italic (wdth125, 800-900) + Inter latin woff2 -> assets/fonts
Result: SUCCESS. Push with token #1 -> 403 on website repo; token #2 works (SUCCESS).

### 6. Session #4: re-clone both repos, serve site, screenshot test
$ git clone ... progress ; git clone ... site ; (cd site && python3 -m http.server 8123 &)
$ node progress/scripts/shot.js /tmp/s 0      (Playwright + /usr/local/bin/chromium, swiftshader WebGL, 1440x900)
Result: SUCCESS — site loads, GLBs render, carousel visible. Only a 404 (favicon). Preview: output/preview/s4_hero_v1.png
Observed: bottles too big & overlapping at edges vs video (video: ~7 small items spread across width, centre one higher under ring light).
