// VELORA — hero 3D carousel + scroll story. three.js r160 (vendored, no build step).
import * as THREE from './vendor/three.module.js';
import { GLTFLoader } from './vendor/GLTFLoader.js';
import { RoomEnvironment } from './vendor/RoomEnvironment.js';

/* ------------------------------------------------------------------ data */
const MODELS = {
  noir: 'assets/models/velora-eau-de-parfum.glb',
  blue: 'assets/models/velora-blue-elegance.glb',
  green: 'assets/models/velora-green-parfum.glb',
  purple: 'assets/models/velora-purple-elegance.glb',
};
// every product has its own notes (used by the feature steps below) + detail info
const PRODUCTS = [
  { name: ['NOIR', 'ÉCLAT'], model: 'noir', c1: '#c9973f', c2: '#3a2608', family: 'Amber Woody', text: 'Our signature eau de parfum. Smoked amber, black vanilla and warm oud wrapped in a midnight glass flacon with gold accents.',
    notes: ['Pink pepper, bergamot, cardamom', 'Black vanilla, iris, leather', 'Oud, smoked amber, benzoin'], intensity: 5, longevity: '10–12 h', sillage: 'Strong', season: 'Autumn · Winter', mood: 'Evening', price: '$165' },
  { name: ['BLUE', 'ELEGANCE'], model: 'blue', c1: '#2f63ff', c2: '#0a1a55', family: 'Fresh Aquatic', text: 'A fresh, luminous fragrance. Sea salt, bergamot and white musk — the calm confidence of a deep blue evening.',
    notes: ['Sea salt, bergamot, grapefruit', 'Lavender, geranium, sage', 'White musk, ambergris, cedar'], intensity: 3, longevity: '7–9 h', sillage: 'Moderate', season: 'Spring · Summer', mood: 'Day · Office', price: '$140' },
  { name: ['VERDE', 'IMPÉRIAL'], model: 'green', c1: '#2fbf6a', c2: '#06371b', family: 'Green Aromatic', text: 'Crushed fig leaf, galbanum and vetiver. A bright green signature with the depth of an emerald forest after rain.',
    notes: ['Galbanum, lime, crushed fig leaf', 'Green tea, basil, violet leaf', 'Vetiver, oakmoss, white cedar'], intensity: 3, longevity: '8–10 h', sillage: 'Moderate', season: 'Spring · Summer', mood: 'Day · Casual', price: '$150' },
  { name: ['VIOLET', 'ROYAL'], model: 'purple', c1: '#9b4dff', c2: '#2a0a55', family: 'Floral Oriental', text: 'Velvet plum, Bulgarian rose and purple orchid over a warm base of tonka and suede. Regal, sensual, unforgettable.',
    notes: ['Black plum, blackcurrant, saffron', 'Purple orchid, Bulgarian rose, violet', 'Tonka bean, suede, patchouli'], intensity: 4, longevity: '10–12 h', sillage: 'Strong', season: 'Autumn · Winter', mood: 'Night · Special', price: '$175' },
  { name: ['AMBRE', 'NUIT'], model: 'noir', c1: '#ff7a2c', c2: '#4a1604', family: 'Warm Spicy', text: 'Golden amber, saffron and tonka bean. A warm, magnetic trail that lingers long after the night has ended.',
    notes: ['Saffron, mandarin, cinnamon', 'Golden amber, rose, honey', 'Tonka bean, labdanum, sandalwood'], intensity: 4, longevity: '10–12 h', sillage: 'Strong', season: 'Autumn · Winter', mood: 'Evening', price: '$155' },
  { name: ['AZUR', 'SILK'], model: 'blue', c1: '#22c4ff', c2: '#03354d', family: 'Soft Powdery', text: 'Iris, cool lavender and soft cashmere woods. Silky, airy and clean — elegance you can wear every day.',
    notes: ['Lemon, aldehydes, neroli', 'Iris, cool lavender, peony', 'Cashmere woods, musk, heliotrope'], intensity: 2, longevity: '6–8 h', sillage: 'Soft', season: 'All year', mood: 'Everyday', price: '$130' },
  { name: ['OCÉAN', 'PRIVÉ'], model: 'green', c1: '#19d3b5', c2: '#033f36', family: 'Citrus Fresh', text: 'Mint, green tea and driftwood. A private escape to turquoise waters, bottled.',
    notes: ['Mint, lime, sea breeze', 'Green tea, jasmine, sea fennel', 'Driftwood, musk, ambrette'], intensity: 2, longevity: '6–8 h', sillage: 'Soft', season: 'Summer', mood: 'Holiday · Day', price: '$135' },
  { name: ['ROSE', 'OBSCURE'], model: 'noir', c1: '#e8417f', c2: '#4d0a24', family: 'Dark Floral', text: 'Dark Turkish rose, patchouli and black pepper. A bold floral with a mysterious, velvet-dark heart.',
    notes: ['Black pepper, raspberry, pink pepper', 'Turkish rose, geranium, clove', 'Patchouli, oud, dark musk'], intensity: 4, longevity: '9–11 h', sillage: 'Strong', season: 'Autumn · Winter', mood: 'Night', price: '$160' },
  { name: ['ROYAL', 'MARINE'], model: 'purple', c1: '#7b54ff', c2: '#1d0d58', family: 'Modern Aquatic', text: 'Violet leaf, marine accord and vetiver. A regal, modern aquatic for those who make waves.',
    notes: ['Violet leaf, marine accord, bergamot', 'Lavender, orris, cypress', 'Vetiver, ambroxan, cedar'], intensity: 3, longevity: '8–10 h', sillage: 'Moderate', season: 'All year', mood: 'Day · Evening', price: '$145' },
  { name: ['OR', 'SAUVAGE'], model: 'noir', c1: '#e3c25a', c2: '#3d3208', family: 'Fruity Leather', text: 'Wild fig, gold leather and cedar. Raw, radiant and untamed — luxury with an edge.',
    notes: ['Wild fig, pear, elemi', 'Gold leather, orange blossom, tobacco', 'Cedar, vetiver, castoreum accord'], intensity: 5, longevity: '12 h+', sillage: 'Very strong', season: 'Autumn · Winter', mood: 'Night · Statement', price: '$185' },
];
// feature steps: tag/title/icon fixed, text comes from the active product's notes
const FEATURES = [
  { tag: 'TOP NOTES', title: ['BRIGHT', 'FIRST IMPRESSION'], icon: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/>',
    text: (p) => `<b>${p.notes[0]}</b> open ${p.name.join(' ').toLowerCase().replace(/(^|\s)\S/g, (m) => m.toUpperCase())} — the first seconds that make people turn around.` },
  { tag: 'HEART NOTES', title: ['THE', 'HEART OF IT'], icon: '<path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z"/>',
    text: (p) => `After a few minutes <b>${p.notes[1]}</b> reveal the true ${p.family.toLowerCase()} character of the scent.` },
  { tag: 'BASE NOTES', title: ['DEEP &', 'LONG LASTING'], icon: '<path d="M12 3l3 6 6 .9-4.5 4.3 1 6.3L12 17.6 6.5 20.5l1-6.3L3 9.9 9 9z"/>',
    text: (p) => `<b>${p.notes[2]}</b> anchor the composition for ${p.longevity} of ${p.sillage.toLowerCase()}, elegant trail.` },
  { tag: 'CRAFTSMANSHIP', title: ['MADE IN', 'SMALL BATCHES'], icon: '<path d="M9 3h6M10 3v4l-4 5v8h12v-8l-4-5V3"/>',
    text: (p) => `Each ${p.name.join(' ')} flacon is filled, sealed and finished by hand in our atelier — 20% pure perfume oils, 100 ml, ${p.price}.` },
];
const FAQ = [
  ['How long does a Velora perfume last on the skin?', 'Our eaux de parfum contain 18–20% perfume oils and last 8–12 hours on skin, even longer on clothes.'],
  ['Are Velora fragrances vegan and cruelty free?', 'Yes. We never test on animals and all our formulas are free from animal-derived ingredients.'],
  ['What size are the bottles?', 'Every fragrance comes in a 100 ml refillable glass flacon. A 10 ml travel spray is available too.'],
  ['How should I store my perfume?', 'Keep it away from direct sunlight and heat, ideally in its box at room temperature.'],
  ['Do you ship internationally?', 'We ship to more than 40 countries. Delivery takes 2–7 working days depending on destination.'],
  ['Can I return a fragrance?', 'Unopened bottles can be returned within 30 days. Opened bottles can be exchanged once.'],
];

/* ------------------------------------------------------------------ helpers */
const $ = (s) => document.querySelector(s);
const clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lerp = (a, b, t) => a + (b - a) * t;
const ease = (t) => (t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const range = (v, a, b) => clamp((v - a) / (b - a));
// frame-rate independent smoothing factor: k(rate, dt) == rate at 60fps
const k = (rate, dt) => 1 - Math.pow(1 - rate, dt * 60);
const N = PRODUCTS.length;
const wrap = (o) => { o = ((o % N) + N) % N; return o > N / 2 ? o - N : o; };
const isTouch = matchMedia('(pointer:coarse)').matches;
if (isTouch) document.body.classList.add('touch');
// MOBILE ONLY (<=760px wide): every `isMobile` / `mob()` branch below changes nothing on desktop
const mob = () => innerWidth <= 760;
const isMobile = mob();
if (isMobile) document.body.classList.add('mob');

/* ------------------------------------------------------------------ renderer */
const canvas = $('#gl');
const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, isMobile ? 1.5 : 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.05;
renderer.setClearColor(0x000000, 0);

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

const camera = new THREE.PerspectiveCamera(26, innerWidth / innerHeight, 0.1, 100);
camera.position.set(0, 0.25, 11);

// lights: the hanging ring lamp = top spot, plus coloured rims
scene.add(new THREE.AmbientLight(0xffffff, 0.15));
const spot = new THREE.SpotLight(0xffffff, 140, 20, 0.36, 0.7, 1.6);
spot.position.set(0, 6.5, 1.2); spot.target.position.set(0, 0, 0);
scene.add(spot, spot.target);
const key = new THREE.DirectionalLight(0xffffff, 0.9); key.position.set(2, 2, 6); scene.add(key);
const rimL = new THREE.PointLight(0xffffff, 18, 12, 1.5); rimL.position.set(-3.2, 1.2, -1); scene.add(rimL);
const rimR = new THREE.PointLight(0xffffff, 18, 12, 1.5); rimR.position.set(3.2, -0.6, -1); scene.add(rimR);
const under = new THREE.PointLight(0xffffff, 10, 8, 1.5); under.position.set(0, -2.6, 2.4); scene.add(under);

/* ------------------------------------------------------------------ build carousel */
const items = []; // {pivot, tilt, spin, mats[]}
const BASE_ROT_Y = 0; // TODO(agent): adjust if model front faces wrong way
function prepModel(gltf) {
  const root = gltf.scene;
  const box = new THREE.Box3().setFromObject(root);
  const size = box.getSize(new THREE.Vector3()), c = box.getCenter(new THREE.Vector3());
  root.position.sub(c);
  const g = new THREE.Group(); g.add(root);
  g.scale.setScalar(1.55 / size.y);
  return g;
}
function buildItems(templates) {
  PRODUCTS.forEach((p, i) => {
    const model = templates[p.model].clone(true);
    const mats = [];
    model.traverse((o) => {
      if (o.isMesh) {
        o.material = o.material.clone();
        o.material.envMapIntensity = 1;
        mats.push(o.material);
      }
    });
    const pivot = new THREE.Group(), tilt = new THREE.Group(), spin = new THREE.Group();
    spin.rotation.y = BASE_ROT_Y; spin.add(model); tilt.add(spin); pivot.add(tilt); scene.add(pivot);
    items.push({ pivot, tilt, spin, mats, seed: i * 1.7 });
  });
}

/* ------------------------------------------------------------------ state */
let pos = 0, target = 0, vel = 0;   // carousel position in item units
let active = 0;
let dragging = false, lastX = 0, dragMoved = 0;
const mouse = { x: 0, y: 0, sx: 0, sy: 0 };
let scrollS = 0, smoothS = 0;       // scroll in viewport heights

const root = document.documentElement;
const colA = new THREE.Color(), colB = new THREE.Color();
function setAccent(i) {
  const p = PRODUCTS[i];
  root.style.setProperty('--accent', p.c1);
  root.style.setProperty('--accent2', p.c2);
  const set = (el) => { el.innerHTML = `<span>${p.name[0]}</span><span>${p.name[1]}</span>`; };
  const pn = $('#pname'); set(pn); pn.classList.remove('swap'); void pn.offsetWidth; pn.classList.add('swap');
  set($('#dtitle'));
  $('#dtext').textContent = p.text;
  $('#dnum').textContent = 'N° ' + String(i + 1).padStart(2, '0') + ' / ' + String(N).padStart(2, '0');
  $('#dfam').textContent = p.family.toUpperCase();
  $('#dnotes').innerHTML = ['TOP', 'HEART', 'BASE'].map((l, k) => `<li><span>${l}</span>${p.notes[k]}</li>`).join('');
  const dots = '<i class="on"></i>'.repeat(p.intensity) + '<i></i>'.repeat(5 - p.intensity);
  $('#dspecs').innerHTML = [['INTENSITY', `<span class="dots5">${dots}</span>`], ['LONGEVITY', p.longevity], ['SILLAGE', p.sillage], ['SEASON', p.season], ['WEAR', p.mood], ['CONCENTRATION', 'EDP · 20%']]
    .map(([a, b]) => `<div><dt>${a}</dt><dd>${b}</dd></div>`).join('');
  $('#dprice').textContent = p.price;
  document.querySelectorAll('.feat').forEach((el, k) => { el.querySelector('p').innerHTML = FEATURES[k].text(p); el.querySelector('.fprod').textContent = p.name.join(' '); });
  colA.set(p.c1);
  rimL.color.set(p.c1); rimR.color.set(p.c1); under.color.set(p.c1);
}

/* ------------------------------------------------------------------ UI build */
$('#feats').innerHTML = FEATURES.map((f, i) => `<div class="feat" data-i="${i}"><span class="tag"><b></b>${f.tag}</span><span class="fstep">0${i + 1} / 04 · <span class="fprod"></span></span><h3>${f.title.join('<br>')}</h3><p></p></div>`).join('');
$('#icons').innerHTML = FEATURES.map((f, i) => `<li data-i="${i}" aria-label="${f.tag}"><svg viewBox="0 0 24 24">${f.icon}</svg></li>`).join('');
$('#faqList').innerHTML = FAQ.map(([q, a]) => `<div class="qa"><button>${q}</button><div class="ans"><div><p>${a}</p></div></div></div>`).join('');
document.querySelectorAll('.qa button').forEach((b) => b.addEventListener('click', () => b.parentElement.classList.toggle('open')));
document.querySelectorAll('#icons li').forEach((li) => li.addEventListener('click', () => {
  scrollTo({ top: (2 + +li.dataset.i + 0.5) * (mob() ? viewH : innerHeight), behavior: 'smooth' });
}));

/* ------------------------------------------------------------------ input */
const cursor = $('#cursor');
const inHero = () => scrollS < 0.25;
addEventListener('pointermove', (e) => {
  mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1;
  cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px';
  const overUI = e.target.closest('button,a,.qa,#icons');
  cursor.classList.toggle('drag', inHero() && !overUI && e.clientY > innerHeight * .18 && e.clientY < innerHeight * .8);
  if (dragging) {
    const dx = e.clientX - lastX; lastX = e.clientX; dragMoved += Math.abs(dx);
    const d = -dx / (innerWidth * (mob() ? 0.3 : 0.14));
    target += d; vel = d;
  }
});
canvas.addEventListener('pointerdown', (e) => {
  if (!inHero()) return;
  dragging = true; lastX = e.clientX; dragMoved = 0; vel = 0; cursor.classList.add('down');
  canvas.setPointerCapture?.(e.pointerId);
});
const endDrag = () => {
  if (!dragging) return;
  dragging = false; cursor.classList.remove('down');
  target = Math.round(target + vel * 6); // inertia then snap
};
addEventListener('pointerup', endDrag); addEventListener('pointercancel', endDrag);
canvas.style.touchAction = 'pan-y';
// horizontal wheel / trackpad swipe rotates carousel
addEventListener('wheel', (e) => {
  if (!inHero() || Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;
  target += e.deltaX / 400; clearTimeout(endDrag.t); endDrag.t = setTimeout(() => (target = Math.round(target)), 140);
}, { passive: true });
$('#prev').addEventListener('click', () => (target = Math.round(target) - 1));
$('#next').addEventListener('click', () => (target = Math.round(target) + 1));
addEventListener('keydown', (e) => {
  if (!inHero()) return;
  if (e.key === 'ArrowLeft') target = Math.round(target) - 1;
  if (e.key === 'ArrowRight') target = Math.round(target) + 1;
});
// click on a side product -> go to it
canvas.addEventListener('click', (e) => {
  if (!inHero() || dragMoved > 6) return;
  const ray = new THREE.Raycaster();
  ray.setFromCamera(new THREE.Vector2((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1), camera);
  const hit = ray.intersectObjects(items.map((it) => it.pivot), true)[0];
  if (!hit) return;
  const idx = items.findIndex((it) => { let o = hit.object; while (o) { if (o === it.pivot) return true; o = o.parent; } return false; });
  if (idx >= 0) target = Math.round(target) + wrap(idx - Math.round(target));
});
let viewH = innerHeight; // mobile: = CSS 100vh (stable while the address bar hides/shows)
const measureVH = () => { viewH = mob() ? ($('#spacer').offsetHeight / 8 || innerHeight) : innerHeight; };
measureVH();
addEventListener('scroll', () => { scrollS = scrollY / (isMobile ? viewH : innerHeight); }, { passive: true });

// sound toggle (soft ambient pad generated with WebAudio — no audio file needed)
let actx, gain, soundOn = true;
function startAudio() {
  if (actx) return;
  actx = new (window.AudioContext || window.webkitAudioContext)();
  gain = actx.createGain(); gain.gain.value = 0; gain.connect(actx.destination);
  const lp = actx.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 700; lp.connect(gain);
  [110, 164.8, 220, 277.2].forEach((f, i) => {
    const o = actx.createOscillator(); o.type = i % 2 ? 'sine' : 'triangle'; o.frequency.value = f; o.detune.value = i * 4;
    const g = actx.createGain(); g.gain.value = 0.05; o.connect(g); g.connect(lp); o.start();
  });
  if (soundOn) gain.gain.linearRampToValueAtTime(0.35, actx.currentTime + 2);
}
addEventListener('pointerdown', startAudio, { once: true });
$('#sound').addEventListener('click', () => {
  soundOn = !soundOn;
  $('#sound').classList.toggle('off', !soundOn);
  $('.sound-label').textContent = soundOn ? 'ON' : 'OFF';
  if (gain) gain.gain.linearRampToValueAtTime(soundOn ? 0.35 : 0, actx.currentTime + 0.6);
});

/* ------------------------------------------------------------------ layout per frame */
const heroUI = $('#heroUI'), detailUI = $('#detailUI'), ring = $('#ring'), intro = $('#intro');
const bgColor = $('.bg-color'), bgFlash = $('.bg-flash'), statement = $('#statement'), dline = $('#dline');
const feats = [...document.querySelectorAll('.feat')], icons = [...document.querySelectorAll('#icons li')];
let featOn = -1;
const MOB_DY = 1.05, MOB_DZ = 2.2, MOB_DS = 1.3; // mobile detail pose: bottle in the top half, card below
const tmpDark = new THREE.Color(0x0b0b0d), white = new THREE.Color(1, 1, 1);

function layout(t, dt) {
  const s = smoothS;
  const p1 = ease(range(s, 0, 1));          // hero -> detail
  const pF = range(s, 1.6, 6);               // features progress
  const pS = range(s, 5.6, 7);               // statement
  const p3 = ease(range(s, 6.6, 7.8));       // detail -> dark (faq)
  const wide = innerWidth / innerHeight;
  const narrow = wide < 1;
  const M = mob();

  // carousel item placement
  items.forEach((it, i) => {
    const o = wrap(i - pos);
    const ao = Math.abs(o);
    const sp = M ? 1.22 : narrow ? 0.95 : 1.28;
    // centre item sits higher (under the ring light), side items spread evenly across the width
    let x = Math.sign(o) * (Math.min(ao, 1) * (sp + 0.12) + Math.max(0, ao - 1) * sp);
    let y = lerp(M ? 0.2 : 0.32, -0.12 + Math.sin(it.seed * 2.3) * 0.12, clamp(ao)) + Math.sin(t * 0.9 + it.seed) * 0.04;
    let z = -Math.pow(ao, 1.1) * 0.55;
    let sc = M ? lerp(1.85, 1.2, clamp(ao)) : lerp(1.36, 0.96, clamp(ao));
    let tiltZ = -0.24 + (ao > 0.5 ? Math.sin(it.seed * 3.1) * 0.12 : 0);
    let rotY = -o * 0.32 + Math.sin(t * 0.5 + it.seed) * 0.08;
    // mouse parallax on active
    if (ao < 0.5) { rotY += mouse.sx * 0.25; tiltZ += -mouse.sx * 0.05; }

    const isActive = i === active;
    if (isActive) {
      // detail pose
      const dx = narrow ? 0.0 : lerp(0.75, 0.15, ease(pF));
      x = lerp(x, dx, p1);
      y = lerp(y, M ? MOB_DY : narrow ? 0.5 : -0.1, p1);
      z = lerp(z, M ? MOB_DZ : 3.6, p1);
      sc = lerp(sc, M ? MOB_DS : 1.55, p1);
      tiltZ = lerp(tiltZ, -0.42 + pF * 0.42, p1);
      rotY = lerp(rotY, Math.sin(pF * Math.PI * 3) * 0.55 + mouse.sx * 0.15, p1); // keep label facing camera (full spin showed blank back)
      // back to dark: product floats right, behind FAQ title
      x = lerp(x, narrow ? 0 : 2.65, p3); y = lerp(y, 0.15, p3); z = lerp(z, 0.6, p3);
      sc = lerp(sc, 0.9, p3); tiltZ = lerp(tiltZ, -0.12, p3); rotY = lerp(rotY, 0.3, p3);
      if (M) y += p3 * 4.5; // mobile: bottle floats up out of view so it never covers the FAQ
    } else {
      y -= p1 * (2.6 + ao * 0.4); z -= p1 * 2; sc *= 1 - p1 * 0.3;
    }
    it.pivot.position.set(x, y, z);
    it.pivot.scale.setScalar(sc);
    it.pivot.visible = M ? (isActive ? p3 < 0.99 : p1 < 0.99 && ao < 2.6) : (isActive || p1 < 0.99);
    it.tilt.rotation.z = tiltZ;
    it.spin.rotation.y = BASE_ROT_Y + rotY;
    // darken side products (silhouettes like the reference)
    const lit = isActive ? 1 : clamp(1 - ao * 1.25);
    it.mats.forEach((m) => { m.color.copy(tmpDark).lerp(white, lit * 0.9 + 0.1 * (1 - ao > 0 ? 1 : 0) * 0); m.envMapIntensity = 0.25 + lit * 0.9; });
  });

  camera.position.x = lerp(mouse.sx * 0.25, 0, p1);
  camera.position.y = 0.25 + lerp(-mouse.sy * 0.12, 0, p1);
  camera.lookAt(0, 0.05, 0);
  spot.intensity = lerp(140, 60, p1);
  rimL.intensity = rimR.intensity = lerp(18, 30, p1);

  // overlays
  heroUI.style.opacity = 1 - range(s, 0, .35);
  heroUI.style.visibility = s > .4 ? 'hidden' : 'visible';
  ring.style.opacity = 1 - range(s, 0, .5);
  bgColor.style.opacity = range(s, 0.2, 1) * (1 - p3);
  const dOp = range(s, .6, 1) * (1 - range(s, 6.6, 7.1));
  detailUI.style.opacity = dOp; detailUI.style.pointerEvents = dOp > .5 ? 'auto' : 'none';
  intro.style.opacity = 1 - range(s, 1.5, 1.9);
  intro.style.transform = M ? `translateY(${-range(s, 1.5, 1.9) * 30}px)` : `translateY(calc(-50% - ${range(s, 1.5, 1.9) * 30}px))`;
  const fi = s < 1.9 ? -1 : Math.min(3, Math.floor((s - 1.9) / 1.0));
  if (fi !== featOn) { featOn = fi; feats.forEach((f, i) => f.classList.toggle('on', i === fi)); icons.forEach((f, i) => f.classList.toggle('on', i === fi)); }
  dline.style.setProperty('--p', pF.toFixed(3));
  const flash = Math.sin(Math.PI * pS);
  bgFlash.style.opacity = flash * 0.85;
  statement.style.opacity = flash;
  statement.style.transform = `scale(${lerp(1.15, 0.95, pS)})`;
  if (!M) statement.style.filter = `blur(${lerp(14, 3, flash)}px)`; // mobile: animated blur is too heavy
  feats.forEach((f) => (f.style.visibility = pS > .35 ? 'hidden' : 'visible'));
}

/* ------------------------------------------------------------------ loop */
const clock = new THREE.Clock();
function frame() {
  const dt = Math.min(clock.getDelta(), 0.1), t = clock.elapsedTime;
  if (!dragging) vel *= Math.pow(0.9, dt * 60);
  pos += (target - pos) * k(dragging ? 0.35 : 0.085, dt);
  const a = ((Math.round(pos) % N) + N) % N;
  if (a !== active && smoothS < 0.3) { active = a; setAccent(active); }
  mouse.sx += (mouse.x - mouse.sx) * k(0.06, dt); mouse.sy += (mouse.y - mouse.sy) * k(0.06, dt);
  smoothS += (scrollS - smoothS) * k(isMobile ? 0.3 : 0.12, dt); // mobile: follow native scroll closely
  if (Math.abs(scrollS - smoothS) > 2) smoothS = scrollS - Math.sign(scrollS - smoothS) * 2; // never lag more than 2 screens
  // slider dot: position within collection
  const prog = ((pos % N) + N) % N / (N - 1);
  $('#sliderDot').style.left = (clamp(prog) * 100) + '%';
  layout(t, dt);
  renderer.render(scene, camera);
  requestAnimationFrame(frame);
}
let lastW = -1, lastH = -1;
function resize() {
  // mobile: ignore height-only changes from the address bar hiding/showing (re-allocating the canvas = stutter)
  if (isMobile && innerWidth === lastW && Math.abs(innerHeight - lastH) < 200 && renderer.domElement.width) return;
  lastW = innerWidth; lastH = innerHeight; measureVH();
  renderer.setSize(innerWidth, innerHeight, false);
  camera.aspect = innerWidth / innerHeight;
  camera.fov = camera.aspect < 1 ? 42 : 26;
  camera.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

/* ------------------------------------------------------------------ load */
const manager = new THREE.LoadingManager();
manager.onProgress = (u, l, tot) => ($('#loadBar').style.width = (l / tot) * 100 + '%');
const loader = new GLTFLoader(manager);
const load = (url) => new Promise((res, rej) => loader.load(url, res, (e) => {
  if (e.total) $('#loadBar').style.width = Math.round((e.loaded / e.total) * 100) + '%';
}, rej));
const keys = Object.keys(MODELS);
Promise.all(keys.map((k) => load(MODELS[k]))).then((gl) => {
  const tpl = {}; keys.forEach((k, i) => (tpl[k] = prepModel(gl[i])));
  buildItems(tpl);
  setAccent(0);
  $('#loader').classList.add('done');
  window.__ready = true;
  frame();
}).catch((e) => { console.error(e); $('#loader').innerHTML = '<span style="font-size:12px">Could not load 3D models — serve the folder over http (see README).</span>'; });
