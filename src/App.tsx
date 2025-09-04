import React from "react";
import Beef from "./assets/Beef.jpg";
import Carrot from "./assets/Carrot.jpg";
import Lemonade from "./assets/Lemonade.jpg";
import Banana from "./assets/Banana.jpg";
import Apple from "./assets/Apple.jpg";
import Blubarry from "./assets/Blubarry.jpg";
import Grape from "./assets/Grape.jpg";
import Oreo from "./assets/Oreo.jpg";
import backing from "./assets/backing.jpg";
import me from "./assets/me.jpg";
import game_demo from "./assets/game_demo.mov";
import signal from "./assets/signal.gif";
import tower from "./assets/tower.png";
import butterfly from "./assets/butterfly.gif";
import blueprint from "./assets/blueprint.png";

// --- Types ---
type Photo = { src: string; title: string; desc?: string };
type PhotographySeries = { title: string; idea: string; photos: Photo[] };
type GameWork = { video: string; poster?: string; caption: string };
type Sprite = { src: string; title: string; desc?: string };
type Baking = { image: string; blurb: string };

type SectionProps = {
  title: string;
  id: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

type LightboxProps = {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

// ---------------------------
//             DATA 
// ---------------------------
const PROFILE = {
  name: "Zihui (Aurora) Weng",
  role: "Indie Game Developer",
  headshot: me , 
  bio: "I’m an indie game developer (in progress)",
};

const PHOTOGRAPHY_SERIES: PhotographySeries = {
  title: "Electric Food",
  idea:
    "One day, as I ate and scrolled through my phone, I realized I was being fed twice. Once by the meal in front of me, and once by the endless stream of digital information.This series grows out of that moment. A steak with wired rosemary, a banana bound in cables, grapes shaped into lungs — each piece reimagines nourishment through the lens of technology. For me, it’s about exploring the strange balance between what sustains our bodies and what sustains our digital lives.",
  photos: [
    { src: Beef, title: "Stake & Rosemary Circuit", desc: "" },
    { src: Carrot, title: "Carrot Clock", desc: "" },
    { src: Lemonade, title: "High Voltage Lemonade", desc: "" },
    { src: Banana, title: "\"The $120000 Banana\"", desc: "" },
    { src: Apple, title: "Fruit Spectrum", desc: "" },
    { src: Blubarry, title: "Blue Electroberry", desc: "" },
    { src: Grape, title: "Grape Lungs", desc: "" },
    { src: Oreo, title: "Binary Oreos", desc: "" },
  ],
};

const GAME_WORK: GameWork = {
  video: game_demo,
  poster: tower,
  caption:
    "Quickly go over the part of the game where the player gathers resources—picking berries, chopping trees, and mining stone and following the butterfly guide into the dungeon to fight against the boss.",
};

const SPRITES: Sprite[] = [
  { src: signal, title: "Signal" },
  { src: tower, title: "Tower (Repaired & Broken)" },
  { src: butterfly, title: "Butterfly Guide" },
  { src: blueprint, title: "Blue Print" },
];

const BAKING: Baking = {
  image: backing,
  blurb:
    "Here is the most recent gift (six flavor biscuits) I made for my neighbor and new friends when I moved to Providence.",
};

// ---------------------------
// Small UI helpers (pure React)
// ---------------------------
function Section({ title, icon, id, children }: SectionProps) {
  return (
    <section id={id} className="section">
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <span className="icon" aria-hidden>{icon}</span>
            {title}
          </div>
        </div>
        <div className="card-content">{children}</div>
      </div>
    </section>
  );
}

// ---------------------------
// Lightbox (overlay) for photos
// ---------------------------
function Lightbox({ photos, index, onClose, onPrev, onNext }: LightboxProps) {
  const photo = photos[index];

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onNext();
      if (e.key === "ArrowLeft") onPrev();
    };
    document.addEventListener("keydown", onKey);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  return (
    <div className="lb" role="dialog" aria-modal="true" aria-label={`${photo.title} – enlarged`}>
      <button className="lb-close" onClick={onClose} aria-label="Close viewer">✕</button>

      <button className="lb-nav lb-prev" onClick={onPrev} aria-label="Previous image">‹</button>
      <button className="lb-nav lb-next" onClick={onNext} aria-label="Next image">›</button>

      {/* Use currentTarget === target instead of target.classList */}
      <div
        className="lb-stage"
        onClick={(e: React.MouseEvent<HTMLDivElement>) => {
          if (e.currentTarget === e.target) onClose();
        }}
      >
        <figure className="lb-figure">
          <img className="lb-img" src={photo.src} alt={photo.title} />
          <figcaption className="lb-caption">
            <div className="lb-title">{photo.title}</div>
            {photo.desc && <div className="lb-desc">{photo.desc}</div>}
            <div className="lb-count">{index + 1} / {photos.length}</div>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}


// ---------------------------
// MAIN COMPONENT
// ---------------------------
export default function App() {
const [lightboxIndex, setLightboxIndex] = React.useState<number | null>(null);

const open = (i: number) => setLightboxIndex(i);
const close = () => setLightboxIndex(null);

const next = () =>
  setLightboxIndex((i) => ((i ?? 0) + 1) % PHOTOGRAPHY_SERIES.photos.length);

const prev = () =>
  setLightboxIndex((i) => ((i ?? 0) - 1 + PHOTOGRAPHY_SERIES.photos.length) % PHOTOGRAPHY_SERIES.photos.length);

  return (
    <div className="page">
      <style>{css}</style>

      {/* Header */}
      <header className="header">
        <div className="header-inner">
          <div className="brand">
            <div className="brand-mark">A</div>
            <div className="brand-text">
              <div className="brand-name">{PROFILE.name}</div>
              <div className="brand-role">{PROFILE.role}</div>
            </div>
          </div>
          <nav className="nav">
            <a href="#about" className="nav-link">About</a>
            <a href="#photo" className="nav-link">Photography</a>
            <a href="#game" className="nav-link">Game</a>
            <a href="#baking" className="nav-link">Baking</a>
          </nav>
        </div>
      </header>

      {/* Content */}
      <main className="container gap">
        {/* ABOUT */}
        <Section title="About Me" id="about">
          <div className="about">
            <img src={PROFILE.headshot} alt={`${PROFILE.name} headshot`} className="avatar" />
            <div>
              <h1 className="h1">{PROFILE.name}</h1>
              <p className="muted">{PROFILE.bio}</p>
            </div>
          </div>
        </Section>

        {/* PHOTOGRAPHY */}
        <Section title="Photography Series" icon="📷" id="photo">
          <div className="stack">
            <h2 className="h2">{PHOTOGRAPHY_SERIES.title}</h2>
            <p className="muted">{PHOTOGRAPHY_SERIES.idea}</p>
            <div className="grid grid-photos">
              {PHOTOGRAPHY_SERIES.photos.map((p, i) => (
                <figure key={i} className="photo-card" onClick={() => open(i)}>
                  <div className="photo-wrap" aria-label={`Open ${p.title}`}>
                    <img src={p.src} alt={p.title} className="photo" />
                  </div>
                  <figcaption className="fig">
                    <div className="fig-title">{p.title}</div>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </Section>

        {/* GAME + SPRITES */}
        <Section title="Game Project & Sprites" icon="🎮" id="game">
          <div className="grid grid-game">
            <div className="video-wrap">
              <video className="video" src={GAME_WORK.video} poster={GAME_WORK.poster} controls />
              <div className="muted small pad">{GAME_WORK.caption}</div>
            </div>
            <div className="grid grid-sprites">
              {SPRITES.map((s, i) => (
                <div key={i} className="sprite-card">
                  <div className="sprite-canvas">
                    <img src={s.src} alt={s.title} className="sprite" />
                  </div>
                  <div className="pad">
                    <div className="fig-title">{s.title}</div>
                    {s.desc && <div className="fig-desc small">{s.desc}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* BAKING */}
        <Section title="Baking Gift" icon="🍪" id="baking">
          <div className="baking">
            <img src={BAKING.image} alt="Baking cookies" className="baking-img" />
            <div className="stack">
              <p className="muted">{BAKING.blurb}</p>
            </div>
          </div>
        </Section>
      </main>

      {/* Footer */}
      <footer className="container">
        <div className="footer">
          <div className="muted small">© {new Date().getFullYear()} {PROFILE.name}. Built for a Computer Animation course application:)</div>
        </div>
      </footer>

      {lightboxIndex !== null && (
        <Lightbox
          photos={PHOTOGRAPHY_SERIES.photos}
          index={lightboxIndex}
          onClose={close}
          onPrev={prev}
          onNext={next}
        />
      )}
    </div>
  );
}

// ---------------------------
// Minimal CSS (light theme) + photo hover + lightbox
// ---------------------------
const css = `
:root{--bg:#fafafa;--card:#fff;--text:#0b0b0c;--muted:#5f6368;--line:#e5e7eb;--ring:#d1d5db;--radius:16px;--shadow:0 8px 20px rgba(0,0,0,.12)}
*{box-sizing:border-box}
html,body,#root{height:100%}
body{margin:0;background:var(--bg);color:var(--text);font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Noto Sans, Ubuntu, Cantarell, Helvetica Neue, Arial, "Apple Color Emoji","Segoe UI Emoji"}
.page{min-height:100%;}
.container{max-width:1080px;margin:0 auto;padding:16px}
.gap{display:grid;gap:16px}
.header{position:sticky;top:0;z-index:40;background:rgba(255,255,255,.7);backdrop-filter: blur(8px);border-bottom:1px solid var(--line)}
.header-inner{max-width:1080px;margin:0 auto;padding:10px 16px;display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;gap:10px;align-items:center}
.brand-mark{width:32px;height:32px;border-radius:10px;background:#111;color:#fff;display:grid;place-items:center;font-weight:700;font-size:12px}
.brand-text{line-height:1}
.brand-name{font-weight:600}
.brand-role{font-size:12px;color:var(--muted)}
.nav{display:flex;gap:6px}
.nav-link{font-size:14px;padding:6px 10px;border-radius:999px;text-decoration:none;color:inherit}
.nav-link:hover{background:#f2f2f3}
.section{scroll-margin-top:80px}
.card{background:var(--card);border:1px solid var(--line);border-radius:var(--radius);box-shadow:0 1px 2px rgba(0,0,0,.04)}
.card-header{padding:12px 14px;border-bottom:1px solid var(--line)}
.card-title{font-weight:600;display:flex;align-items:center;gap:8px}
.icon{opacity:.9}
.card-content{padding:12px 14px}
.h1{margin:0 0 6px;font-size:24px}
.h2{margin:0 0 4px;font-size:18px}
.muted{color:var(--muted)}
.small{font-size:12px}
.pad{padding:8px 0}
.about{display:grid;grid-template-columns:120px 1fr;gap:12px;align-items:center}
.avatar{width:112px;height:112px;object-fit:cover;border-radius:14px;border:1px solid var(--line);box-shadow:0 1px 2px rgba(0,0,0,.04)}
.stack{display:grid;gap:8px}
.grid{display:grid;gap:12px}
.grid-photos{grid-template-columns:repeat(2,1fr); gap: 0px; }
@media(min-width:800px){.grid-photos{grid-template-columns:repeat(4,1fr)}; gap: 0px;}

/* PHOTO CARDS: hover depth + tilt */
.photo-card{margin:15px; background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.04);transform:translateZ(0);transition:transform .25s ease, box-shadow .25s ease, border-color .25s ease;cursor:zoom-in}
.photo-card:hover{transform:translateY(-6px) scale(1.02) rotateX(0.5deg) rotateY(-0.5deg);box-shadow:var(--shadow);border-color:#d9dde3}
.photo-wrap{position:relative;overflow:hidden}
.photo{width:100%;aspect-ratio:1/1;object-fit:cover;display:block;transition:transform .35s ease}
.photo-card:hover .photo{transform:scale(1.06)}
.fig{padding:8px}
.fig-title{font-size:14px;font-weight:600}
.fig-desc{font-size:12px;color:var(--muted)}

.grid-game{grid-template-columns:1fr;align-items:start}
@media(min-width:1000px){.grid-game{grid-template-columns:2fr 1fr}}
.video-wrap{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.video{width:100%;aspect-ratio:16/9;display:block}
.grid-sprites{grid-template-columns:repeat(2,1fr)}
.sprite-card{background:#fff;border:1px solid var(--line);border-radius:14px;overflow:hidden;box-shadow:0 1px 2px rgba(0,0,0,.04)}
.sprite-canvas{display:grid;place-items:center;background:#fafafa;border-bottom:1px solid var(--line)}
.sprite{max-height:96px;object-fit:contain}

.baking{display:grid;grid-template-columns:220px 1fr;gap:12px;align-items:start}
.baking-img{width:100%;aspect-ratio:4/3;border-radius:14px;border:1px solid var(--line);object-fit:cover}
.footer{display:flex;gap:10px;align-items:center;justify-content:space-between;border:1px solid var(--line);border-radius:14px;background:#fff;padding:10px 12px;box-shadow:0 1px 2px rgba(0,0,0,.04)}

/* LIGHTBOX OVERLAY */
.lb{position:fixed;inset:0;z-index:100;display:flex;align-items:center;justify-content:center;background:rgba(15,17,20,.75);backdrop-filter:saturate(120%) blur(6px);animation:lb-fade-in .18s ease;}
@keyframes lb-fade-in{from{opacity:0}to{opacity:1}}
.lb-stage{position:relative;max-width:min(1100px,92vw);max-height:86vh;width:100%;height:100%;display:flex;align-items:center;justify-content:center;padding:24px}
.lb-figure{margin:0;display:grid;gap:12px;align-content:center;justify-items:center}
.lb-img{max-width:100%;max-height:68vh;border-radius:14px;box-shadow:0 12px 30px rgba(0,0,0,.35);animation:lb-zoom-in .22s ease}
@keyframes lb-zoom-in{from{transform:scale(.92);opacity:.3}to{transform:scale(1);opacity:1}}
.lb-caption{width:min(900px,90vw);background:#0c0f13;color:#f8fafc;border:1px solid rgba(255,255,255,.12);border-radius:12px;padding:12px 14px;box-shadow:0 6px 18px rgba(0,0,0,.25)}
.lb-title{font-weight:700;margin-bottom:4px}
.lb-desc{color:#cbd5e1;font-size:14px;line-height:1.4}
.lb-count{margin-top:6px;font-size:12px;color:#94a3b8}


.lb-close{position:absolute;top:20px;right:20px;border:0;background:rgba(255,255,255,.9);width:36px;height:36px;border-radius:999px;box-shadow:0 6px 16px rgba(0,0,0,.25);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center}
.lb-nav{position:absolute;top:50%;transform:translateY(-50%);border:0;background:rgba(255,255,255,.9);width:40px;height:40px;border-radius:999px;box-shadow:0 6px 16px rgba(0,0,0,.25);cursor:pointer;font-size:26px;display:flex;align-items:center;justify-content:center}
.lb-prev{left:20px}
.lb-next{right:20px}
.lb-close:hover,.lb-nav:hover{filter:brightness(.96)}
.lb-close:active,.lb-nav:active{transform:scale(0.98)}
`;
