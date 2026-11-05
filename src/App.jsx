import { useEffect, useRef, useState } from "react";

/* ================== CONFIGURAÇÕES ================== */
const NOME = "Império da Pintura";
const INSTAGRAM_USER = "imperiodapintura21";
const INSTAGRAM_URL = `https://instagram.com/${INSTAGRAM_USER}`;
const WHATS_NUM = "5577998570294";
const WHATS_TXT = "(77) 99857-0294";
const WHATS_URL = `https://wa.me/${WHATS_NUM}?text=${encodeURIComponent(
  "Olá! Vim pelo site da Império da Pintura e gostaria de um orçamento."
)}`;

/* Fotos na pasta public (sem extensão: o código testa png, jpg, jpeg e webp) */
const FOTOS = ["/foto1", "/foto2", "/foto3", "/foto4", "/foto5"];
const EXTS = ["png", "jpg", "jpeg", "webp", "PNG", "JPG", "JPEG", "WEBP"];

const SERVICOS = [
  { icon: "🏠", t: "Pintura Residencial", d: "Paredes, tetos, portas e janelas com acabamento liso e uniforme." },
  { icon: "🏢", t: "Pintura Comercial", d: "Lojas, escritórios e salas com agilidade e capricho no resultado." },
  { icon: "🧱", t: "Textura e Grafiato", d: "Efeitos decorativos que dão personalidade e valorizam o ambiente." },
  { icon: "🪣", t: "Massa Corrida", d: "Preparação correta da superfície para um acabamento perfeito." },
  { icon: "🏡", t: "Fachadas", d: "Proteção e beleza para o exterior, com tintas de alta resistência." },
  { icon: "🎨", t: "Verniz e Esmalte", d: "Madeiras, portões e grades renovados com brilho e durabilidade." },
];

const PASSOS = [
  { n: "01", t: "Orçamento", d: "Você chama no WhatsApp e combinamos a visita." },
  { n: "02", t: "Preparação", d: "Proteção dos móveis, lixa e massa onde precisar." },
  { n: "03", t: "Pintura", d: "Aplicação das demãos com técnica e acabamento fino." },
  { n: "04", t: "Entrega", d: "Limpeza do local e entrega do ambiente renovado." },
];

const CORES = {
  rosa: ["#ff9ac8", "#ff2e93", "#a3005a"],
  azul: ["#9be1ff", "#13a8ff", "#004f9c"],
  amarelo: ["#fff3a1", "#ffd000", "#b88a00"],
  verde: ["#b8ffb0", "#2fd45a", "#0b7a2b"],
  laranja: ["#ffd0a0", "#ff7a1a", "#b53d00"],
  roxo: ["#e0b8ff", "#9a3dff", "#4d0aa8"],
  turquesa: ["#a8fff0", "#12d6c0", "#00776b"],
};

const DROPS = [
  { c: "rosa", s: 90, x: 8, y: 0.05, sp: 0.25, sw: 30, spin: 0.12, ph: 0 },
  { c: "azul", s: 70, x: 82, y: 0.2, sp: 0.4, sw: 40, spin: -0.1, ph: 1 },
  { c: "amarelo", s: 110, x: 70, y: 0.55, sp: 0.18, sw: 25, spin: 0.08, ph: 2 },
  { c: "verde", s: 60, x: 20, y: 0.4, sp: 0.5, sw: 35, spin: 0.15, ph: 3 },
  { c: "laranja", s: 80, x: 90, y: 0.8, sp: 0.3, sw: 30, spin: -0.12, ph: 4 },
  { c: "roxo", s: 100, x: 4, y: 0.7, sp: 0.22, sw: 45, spin: 0.1, ph: 5 },
  { c: "turquesa", s: 55, x: 50, y: 0.1, sp: 0.55, sw: 20, spin: -0.18, ph: 6 },
  { c: "rosa", s: 50, x: 62, y: 0.9, sp: 0.45, sw: 28, spin: 0.14, ph: 7 },
  { c: "azul", s: 95, x: 35, y: 0.65, sp: 0.2, sw: 38, spin: -0.09, ph: 8 },
  { c: "amarelo", s: 45, x: 92, y: 0.45, sp: 0.6, sw: 22, spin: 0.2, ph: 9 },
  { c: "verde", s: 85, x: 48, y: 0.95, sp: 0.28, sw: 32, spin: -0.11, ph: 10 },
  { c: "laranja", s: 52, x: 14, y: 0.3, sp: 0.5, sw: 26, spin: 0.16, ph: 11 },
];

const BLOBS = [
  { c: "#ff2e93", x: -10, y: 5, s: 520, start: 0.0 },
  { c: "#13a8ff", x: 70, y: 18, s: 560, start: 0.08 },
  { c: "#ffd000", x: 10, y: 45, s: 500, start: 0.2 },
  { c: "#2fd45a", x: 75, y: 60, s: 540, start: 0.35 },
  { c: "#ff7a1a", x: -5, y: 75, s: 520, start: 0.5 },
  { c: "#9a3dff", x: 65, y: 85, s: 560, start: 0.65 },
];

/* ================== FOTO (testa várias extensões) ================== */
function Foto({ base, alt, ...props }) {
  const [i, setI] = useState(0);
  const [erro, setErro] = useState(false);

  if (erro) {
    return <div className="foto-erro">Não achei {base}.png na pasta public</div>;
  }

  return (
    <img
      src={`${base}.${EXTS[i]}`}
      alt={alt}
      onError={() => (i + 1 < EXTS.length ? setI(i + 1) : setErro(true))}
      {...props}
    />
  );
}

/* ================== GOTA 3D (SVG) ================== */
function Gota({ cor, size, id }) {
  const [luz, base, sombra] = CORES[cor];
  return (
    <svg
      className="gota-svg"
      width={size}
      height={size * 1.25}
      viewBox="0 0 100 125"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id={`g${id}`} cx="35%" cy="55%" r="75%">
          <stop offset="0%" stopColor={luz} />
          <stop offset="55%" stopColor={base} />
          <stop offset="100%" stopColor={sombra} />
        </radialGradient>
        <radialGradient id={`h${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path
        d="M50 4 C50 4 12 52 12 82 a38 38 0 0 0 76 0 C88 52 50 4 50 4 Z"
        fill={`url(#g${id})`}
      />
      <ellipse cx="34" cy="78" rx="9" ry="17" fill={`url(#h${id})`} transform="rotate(18 34 78)" />
      <ellipse cx="64" cy="102" rx="14" ry="6" fill="#fff" opacity="0.18" />
    </svg>
  );
}

/* ================== APP ================== */
export default function App() {
  const dropRefs = useRef([]);
  const blobRefs = useRef([]);
  const barRef = useRef(null);
  const [aberta, setAberta] = useState(null);
  const [menu, setMenu] = useState(false);

  /* Scroll: move as gotas em 3D e "colore" o fundo */
  useEffect(() => {
    let raf = null;

    const atualizar = () => {
      raf = null;
      const y = window.scrollY;
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const total = Math.max(1, document.documentElement.scrollHeight - vh);
      const prog = Math.min(1, Math.max(0, y / total));
      const faixa = vh + 300;

      DROPS.forEach((d, i) => {
        const el = dropRefs.current[i];
        if (!el) return;
        const py = ((d.y * faixa + y * d.sp) % faixa) - 150;
        const px = (d.x / 100) * vw + Math.sin(y * 0.002 + d.ph) * d.sw;
        const ry = y * d.spin;
        const rz = Math.sin(y * 0.003 + d.ph) * 18;
        el.style.transform = `translate3d(${px}px, ${py}px, 0) rotateY(${ry}deg) rotateZ(${rz}deg)`;
      });

      BLOBS.forEach((b, i) => {
        const el = blobRefs.current[i];
        if (!el) return;
        const t = Math.min(1, Math.max(0, (prog - b.start) / 0.15));
        el.style.opacity = String(t * 0.32);
        el.style.transform = `translate(-50%, -50%) scale(${0.5 + t * 0.8})`;
      });

      if (barRef.current) barRef.current.style.transform = `scaleX(${prog})`;
    };

    const onScroll = () => {
      if (raf == null) raf = requestAnimationFrame(atualizar);
    };

    atualizar();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /* Revelar elementos ao rolar */
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("on");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* Fechar lightbox com ESC */
  useEffect(() => {
    const k = (e) => e.key === "Escape" && setAberta(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, []);

  const irPara = (id) => {
    setMenu(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="site">
      <style>{css}</style>

      {/* barra de progresso colorida */}
      <div className="barra">
        <div ref={barRef} className="barra-fill" />
      </div>

      {/* manchas de tinta coloridas no fundo */}
      <div className="blobs" aria-hidden="true">
        {BLOBS.map((b, i) => (
          <div
            key={i}
            ref={(el) => (blobRefs.current[i] = el)}
            className="blob"
            style={{
              background: b.c,
              left: `${b.x}%`,
              top: `${b.y}%`,
              width: b.s,
              height: b.s,
            }}
          />
        ))}
      </div>

      {/* gotas 3D */}
      <div className="gotas" aria-hidden="true">
        {DROPS.map((d, i) => (
          <div key={i} ref={(el) => (dropRefs.current[i] = el)} className="gota">
            <Gota cor={d.c} size={d.s} id={i} />
          </div>
        ))}
      </div>

      {/* NAV */}
      <header className="nav">
        <div className="nav-in">
          <button className="logo" onClick={() => irPara("inicio")}>
            <span className="logo-dot" />
            {NOME}
          </button>
          <nav className={`links ${menu ? "open" : ""}`}>
            <button onClick={() => irPara("servicos")}>Serviços</button>
            <button onClick={() => irPara("galeria")}>Galeria</button>
            <button onClick={() => irPara("processo")}>Como funciona</button>
            <button onClick={() => irPara("contato")}>Contato</button>
          </nav>
          <a className="btn btn-sm" href={WHATS_URL} target="_blank" rel="noreferrer">
            Orçamento
          </a>
          <button className="burger" onClick={() => setMenu(!menu)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section id="inicio" className="hero">
          <div className="hero-card reveal">
            <span className="tag">🎨 Pintura com capricho</span>
            <h1>
              Dê <span className="grad">cor</span> e vida
              <br /> ao seu espaço
            </h1>
            <p>
              Na <strong>{NOME}</strong> transformamos ambientes com acabamento
              profissional, limpeza e compromisso com o prazo.
            </p>
            <div className="hero-btns">
              <a className="btn" href={WHATS_URL} target="_blank" rel="noreferrer">
                Pedir orçamento no WhatsApp
              </a>
              <button className="btn btn-ghost" onClick={() => irPara("galeria")}>
                Ver trabalhos
              </button>
            </div>
            <div className="rola">Role para colorir ↓</div>
          </div>
        </section>

        {/* SERVIÇOS */}
        <section id="servicos" className="sec">
          <div className="titulo reveal">
            <span className="tag">Serviços</span>
            <h2>O que fazemos</h2>
            <p>Soluções completas em pintura para sua casa ou empresa.</p>
          </div>
          <div className="grid-serv">
            {SERVICOS.map((s, i) => (
              <div key={s.t} className="card serv reveal" style={{ transitionDelay: `${(i % 3) * 90}ms` }}>
                <div className="serv-ic">{s.icon}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* GALERIA */}
        <section id="galeria" className="sec">
          <div className="titulo reveal">
            <span className="tag">Galeria</span>
            <h2>Nossos trabalhos</h2>
            <p>Toque em uma foto para ampliar.</p>
          </div>
          <div className="galeria">
            {FOTOS.map((f, i) => (
              <button
                key={f}
                className={`foto foto-${i + 1} reveal`}
                onClick={() => setAberta(i)}
                aria-label={`Abrir foto ${i + 1}`}
              >
                <Foto base={f} alt={`Trabalho de pintura ${i + 1}`} />
              </button>
            ))}
          </div>
        </section>

        {/* PROCESSO */}
        <section id="processo" className="sec">
          <div className="titulo reveal">
            <span className="tag">Como funciona</span>
            <h2>Simples do início ao fim</h2>
          </div>
          <div className="passos">
            {PASSOS.map((p, i) => (
              <div key={p.n} className="card passo reveal" style={{ transitionDelay: `${i * 90}ms` }}>
                <span className="passo-n">{p.n}</span>
                <h3>{p.t}</h3>
                <p>{p.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CONTATO */}
        <section id="contato" className="sec">
          <div className="cta card reveal">
            <h2>Vamos pintar o seu projeto?</h2>
            <p>Fale com a gente agora e peça seu orçamento.</p>
            <div className="cta-btns">
              <a className="btn btn-whats" href={WHATS_URL} target="_blank" rel="noreferrer">
                💬 WhatsApp {WHATS_TXT}
              </a>
              <a className="btn btn-insta" href={INSTAGRAM_URL} target="_blank" rel="noreferrer">
                📸 @{INSTAGRAM_USER}
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div>
          © {new Date().getFullYear()} {NOME}. Todos os direitos reservados.
        </div>
      </footer>

      {/* botão flutuante WhatsApp */}
      <a className="fab" href={WHATS_URL} target="_blank" rel="noreferrer" aria-label="WhatsApp">
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16 3C9 3 3.3 8.6 3.3 15.5c0 2.4.7 4.7 1.9 6.6L3 29l7.1-2.1c1.8 1 3.8 1.5 5.9 1.5 7 0 12.7-5.6 12.7-12.5S23 3 16 3zm0 22.8c-1.9 0-3.7-.5-5.300-1.500l-.4-.2-4.200 1.200 1.300-4-.3-.4a10.200 10.200 0 0 1-1.600-5.400C5.500 9.900 10.200 5.300 16 5.300s10.500 4.600 10.500 10.200S21.800 25.800 16 25.800zm5.700-7.600c-.3-.2-1.900-.9-2.200-1-.3-.1-.5-.2-.7.200-.2.300-.8 1-1 1.200-.2.200-.4.200-.7.100-.3-.2-1.400-.5-2.600-1.600-1-.9-1.600-1.900-1.800-2.200-.2-.3 0-.5.100-.7l.5-.5c.1-.2.200-.3.300-.5.100-.2 0-.4 0-.5l-1-2.300c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.100-.8.400-.3.300-1.100 1.100-1.100 2.600s1.100 3 1.300 3.200c.2.200 2.200 3.300 5.300 4.600.7.300 1.300.5 1.800.7.800.2 1.400.2 2 .1.600-.1 1.900-.8 2.200-1.500.3-.7.300-1.400.2-1.500-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </a>

      {/* LIGHTBOX */}
      {aberta !== null && (
        <div className="lightbox" onClick={() => setAberta(null)}>
          <button className="lb-x" onClick={() => setAberta(null)} aria-label="Fechar">
            ✕
          </button>
          <button
            className="lb-nav lb-prev"
            onClick={(e) => {
              e.stopPropagation();
              setAberta((aberta - 1 + FOTOS.length) % FOTOS.length);
            }}
            aria-label="Anterior"
          >
            ‹
          </button>
          <Foto
            key={aberta}
            base={FOTOS[aberta]}
            alt={`Trabalho ${aberta + 1}`}
            onClick={(e) => e.stopPropagation()}
          />
          <button
            className="lb-nav lb-next"
            onClick={(e) => {
              e.stopPropagation();
              setAberta((aberta + 1) % FOTOS.length);
            }}
            aria-label="Próxima"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}

/* ================== ESTILOS ================== */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');

*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:#fff;font-family:'Poppins',system-ui,sans-serif;color:#1c1c28;overflow-x:hidden}
.site{position:relative;min-height:100vh;background:#fff;overflow-x:hidden}
button{font-family:inherit;cursor:pointer;border:none;background:none;color:inherit}
a{text-decoration:none;color:inherit}

/* barra de progresso */
.barra{position:fixed;top:0;left:0;right:0;height:5px;z-index:100;background:transparent}
.barra-fill{height:100%;transform-origin:left;transform:scaleX(0);
  background:linear-gradient(90deg,#ff2e93,#ff7a1a,#ffd000,#2fd45a,#13a8ff,#9a3dff)}

/* fundo colorido */
.blobs{position:fixed;inset:0;z-index:0;pointer-events:none;overflow:hidden}
.blob{position:absolute;border-radius:50%;filter:blur(90px);opacity:0;will-change:transform,opacity;
  transform:translate(-50%,-50%) scale(.5)}

/* gotas 3D */
.gotas{position:fixed;inset:0;z-index:1;pointer-events:none;perspective:900px;overflow:hidden}
.gota{position:absolute;top:0;left:0;will-change:transform;transform-style:preserve-3d}
.gota-svg{display:block;filter:drop-shadow(0 14px 14px rgba(0,0,0,.22));animation:bob 4s ease-in-out infinite}
.gota:nth-child(even) .gota-svg{animation-duration:5.5s;animation-direction:reverse}
@keyframes bob{0%,100%{translate:0 -6px}50%{translate:0 8px}}

/* conteúdo acima do fundo */
.nav,main,.footer{position:relative;z-index:5}

/* NAV */
.nav{position:fixed;top:14px;left:0;right:0;z-index:50;padding:0 14px}
.nav-in{max-width:1100px;margin:0 auto;display:flex;align-items:center;justify-content:space-between;gap:12px;
  background:rgba(255,255,255,.8);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);
  border:1px solid rgba(0,0,0,.06);border-radius:999px;padding:10px 12px 10px 20px;
  box-shadow:0 10px 30px rgba(20,20,60,.08);position:relative}
.logo{display:flex;align-items:center;gap:10px;font-weight:700;font-size:1rem}
.logo-dot{width:16px;height:20px;border-radius:50% 50% 50% 50%/60% 60% 40% 40%;
  background:radial-gradient(circle at 35% 35%,#ffb0d8,#ff2e93 60%,#a3005a);display:inline-block;
  box-shadow:0 3px 6px rgba(255,46,147,.4)}
.links{display:flex;gap:4px}
.links button{padding:8px 14px;border-radius:999px;font-weight:500;font-size:.9rem;transition:.2s}
.links button:hover{background:rgba(0,0,0,.05)}
.burger{display:none;flex-direction:column;gap:4px;padding:10px}
.burger span{width:22px;height:2.5px;background:#1c1c28;border-radius:3px}

/* botões */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:8px;padding:15px 28px;border-radius:999px;
  font-weight:600;font-size:1rem;color:#fff;
  background:linear-gradient(135deg,#ff2e93,#9a3dff);
  box-shadow:0 12px 26px rgba(154,61,255,.35);transition:transform .2s,box-shadow .2s}
.btn:hover{transform:translateY(-3px);box-shadow:0 16px 32px rgba(154,61,255,.45)}
.btn-sm{padding:10px 20px;font-size:.9rem}
.btn-ghost{background:#fff;color:#1c1c28;box-shadow:0 10px 24px rgba(0,0,0,.1);border:1px solid rgba(0,0,0,.06)}
.btn-whats{background:linear-gradient(135deg,#25d366,#0a9c46);box-shadow:0 12px 26px rgba(37,211,102,.4)}
.btn-insta{background:linear-gradient(135deg,#feda75,#fa7e1e 30%,#d62976 60%,#962fbf 85%,#4f5bd5);
  box-shadow:0 12px 26px rgba(214,41,118,.35)}

/* seções */
.sec{max-width:1100px;margin:0 auto;padding:90px 18px}
.titulo{text-align:center;margin-bottom:44px}
.tag{display:inline-block;padding:8px 16px;border-radius:999px;background:rgba(255,255,255,.85);
  border:1px solid rgba(0,0,0,.06);font-weight:600;font-size:.85rem;box-shadow:0 6px 16px rgba(0,0,0,.06)}
h2{font-size:clamp(1.9rem,5vw,3rem);font-weight:800;margin:16px 0 8px;letter-spacing:-.02em}
.titulo p{color:#555;font-size:1.05rem}

.card{background:rgba(255,255,255,.82);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:1px solid rgba(255,255,255,.9);border-radius:32px;padding:30px;
  box-shadow:0 18px 40px rgba(30,30,80,.09)}

/* reveal */
.reveal{opacity:0;transform:translateY(40px) scale(.97);transition:opacity .8s ease,transform .8s ease}
.reveal.on{opacity:1;transform:none}

/* hero */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;padding:120px 18px 60px}
.hero-card{max-width:760px;text-align:center;background:rgba(255,255,255,.72);backdrop-filter:blur(14px);
  -webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,.9);border-radius:48px;
  padding:clamp(30px,6vw,60px);box-shadow:0 30px 70px rgba(30,30,80,.12)}
.hero h1{font-size:clamp(2.3rem,8vw,4.4rem);font-weight:800;line-height:1.05;letter-spacing:-.03em;margin:22px 0 18px}
.grad{background:linear-gradient(90deg,#ff2e93,#ff7a1a,#ffd000,#2fd45a,#13a8ff,#9a3dff,#ff2e93);
  background-size:200% auto;-webkit-background-clip:text;background-clip:text;color:transparent;
  animation:shine 6s linear infinite}
@keyframes shine{to{background-position:200% center}}
.hero p{font-size:1.1rem;color:#444;line-height:1.7;max-width:560px;margin:0 auto 28px}
.hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
.rola{margin-top:30px;font-size:.85rem;color:#777;animation:pulse 2s infinite}
@keyframes pulse{50%{opacity:.4;transform:translateY(4px)}}

/* serviços */
.grid-serv{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:22px}
.serv{transition:transform .3s,box-shadow .3s}
.serv:hover{transform:translateY(-8px) rotate(-.6deg);box-shadow:0 26px 50px rgba(30,30,80,.15)}
.serv-ic{width:64px;height:64px;border-radius:22px;display:grid;place-items:center;font-size:1.9rem;margin-bottom:16px;
  background:linear-gradient(135deg,#fff0f8,#eef4ff);box-shadow:inset 0 -4px 8px rgba(0,0,0,.05),0 8px 16px rgba(0,0,0,.06)}
.serv h3,.passo h3{font-size:1.2rem;font-weight:700;margin-bottom:8px}
.serv p,.passo p{color:#555;line-height:1.6;font-size:.97rem}

/* galeria */
.galeria{display:grid;gap:16px;grid-template-columns:repeat(6,1fr);grid-auto-rows:150px}
.foto{position:relative;display:block;border-radius:30px;overflow:hidden;padding:0;min-height:0;
  background:linear-gradient(135deg,#ffd6ec,#d6e8ff,#fff2c4);
  box-shadow:0 16px 36px rgba(30,30,80,.14)}
.foto img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block;transition:transform .6s}
.foto:hover img{transform:scale(1.08)}
.foto-erro{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:12px;font-size:.8rem;color:#777}
.foto-1{grid-column:span 4;grid-row:span 2}
.foto-2{grid-column:span 2;grid-row:span 2}
.foto-3{grid-column:span 2;grid-row:span 2}
.foto-4{grid-column:span 2;grid-row:span 2}
.foto-5{grid-column:span 2;grid-row:span 2}

/* processo */
.passos{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px}
.passo-n{display:inline-grid;place-items:center;width:54px;height:54px;border-radius:50%;color:#fff;font-weight:700;margin-bottom:14px;
  background:radial-gradient(circle at 30% 30%,#ffb0d8,#ff2e93 55%,#8f0050);box-shadow:0 10px 20px rgba(255,46,147,.35)}
.passo:nth-child(2) .passo-n{background:radial-gradient(circle at 30% 30%,#9be1ff,#13a8ff 55%,#004f9c);box-shadow:0 10px 20px rgba(19,168,255,.35)}
.passo:nth-child(3) .passo-n{background:radial-gradient(circle at 30% 30%,#fff3a1,#ffb800 55%,#a37000);box-shadow:0 10px 20px rgba(255,184,0,.35)}
.passo:nth-child(4) .passo-n{background:radial-gradient(circle at 30% 30%,#b8ffb0,#2fd45a 55%,#0b7a2b);box-shadow:0 10px 20px rgba(47,212,90,.35)}

/* CTA */
.cta{text-align:center;padding:clamp(34px,6vw,64px);border-radius:48px}
.cta p{color:#555;margin-bottom:26px;font-size:1.05rem}
.cta-btns{display:flex;gap:14px;justify-content:center;flex-wrap:wrap}

.footer{text-align:center;padding:30px 18px 100px;color:#666;font-size:.9rem}

/* FAB */
.fab{position:fixed;right:18px;bottom:18px;z-index:60;width:62px;height:62px;border-radius:50%;display:grid;place-items:center;
  background:linear-gradient(135deg,#25d366,#0a9c46);box-shadow:0 12px 28px rgba(37,211,102,.5);animation:fab 2.4s infinite}
@keyframes fab{0%,100%{transform:scale(1)}50%{transform:scale(1.08)}}

/* lightbox */
.lightbox{position:fixed;inset:0;z-index:200;background:rgba(10,10,25,.88);backdrop-filter:blur(8px);
  display:flex;align-items:center;justify-content:center;padding:20px;animation:fade .25s}
@keyframes fade{from{opacity:0}}
.lightbox img{max-width:92vw;max-height:86vh;border-radius:28px;box-shadow:0 30px 80px rgba(0,0,0,.5);object-fit:contain}
.lightbox .foto-erro{position:static;color:#fff}
.lb-x{position:absolute;top:18px;right:18px;width:46px;height:46px;border-radius:50%;background:#fff;font-size:1.1rem}
.lb-nav{position:absolute;top:50%;transform:translateY(-50%);width:48px;height:48px;border-radius:50%;background:#fff;font-size:1.8rem;line-height:1}
.lb-prev{left:14px}.lb-next{right:14px}

/* mobile */
@media(max-width:820px){
  .burger{display:flex}
  .links{position:absolute;top:calc(100% + 10px);left:0;right:0;flex-direction:column;background:rgba(255,255,255,.96);
    border-radius:28px;padding:10px;box-shadow:0 20px 40px rgba(0,0,0,.12);display:none}
  .links.open{display:flex}
  .links button{padding:14px;text-align:left}
  .nav-in .btn-sm{margin-left:auto}
  .galeria{grid-template-columns:repeat(2,1fr);grid-auto-rows:150px}
  .foto-1{grid-column:span 2;grid-row:span 2}
  .foto-2,.foto-3,.foto-4,.foto-5{grid-column:span 1;grid-row:span 2}
  .sec{padding:70px 16px}
  .hero-card{border-radius:36px}
}
@media(prefers-reduced-motion:reduce){
  .gota-svg,.grad,.fab,.rola{animation:none}
  .reveal{transition:none;opacity:1;transform:none}
}
`;