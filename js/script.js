/* ============================================================
   EDITA AQUÍ tus recuerdos: título (rótulo de la foto),
   nombre de la carta y mensaje. Las fotos se leen de
   images/foto1.jpg ... images/foto8.jpg
   ============================================================ */
const RECUERDOS = [
  { rotulo: "Tu sonrisa", titulo: "Tu sonrisa", chispa: "✦",
    mensaje: "Hay sonrisas bonitas, y después está la tuya, la que mejora mi día de una manera increible." },
  { rotulo: "Mi lugar favorito", titulo: "Mi lugar favorito", chispa: "♥",
    mensaje: "A veces el lugar importa menos de lo que parece. Lo que me hace sentir en casa es la calma que encuentro cuando lo comparto con vos." },
  { rotulo: "Un recuerdo contigo", titulo: "Un recuerdo contigo", chispa: "✧",
    mensaje: "Para cualquiera es solo una fotografía, pero para mí guarda un momento que me alegra poder recordar." },
  { rotulo: "Lo que me haces sentir", titulo: "Lo que me haces sentir", chispa: "♥",
    mensaje: "Me gusta quien soy cuando estoy con vos: las risas que nadie planeó, las conversaciones largas y esos detalles pequeños que terminan significando tanto." },
  { rotulo: "Lo que todavía quiero vivir contigo", titulo: "Lo que aún nos falta", chispa: "★",
    mensaje: "Si estos momentos ya son tan bonitos, me ilusiona pensar en todas las fotografías, aventuras y risas que todavía nos quedan por crear." },
  { rotulo: "Tu forma de hacerme feliz", titulo: "Tu forma de hacerme feliz", chispa: "♥",
    mensaje: "No sé si te das cuenta de lo bonito que es tenerte en mi vida. A veces basta con una conversación con vos, una sonrisa tuya o un pequeño momento juntos para hacer que un día normal se convierta en uno que quiero recordar. Tienes esa manera tan tuya de hacerme feliz, y es una de las cosas que más me gustan de vos." },
  { rotulo: "Si pudiera detener el tiempo", titulo: "Si pudiera detener el tiempo", chispa: "✧",
    mensaje: "Hay momentos que quisiera guardar en una cajita para poder volver a ellos cuando los extrañe. Momentos en los que quisiera que el tiempo fuera un poquito más lento, para disfrutar cada risa, cada mirada y cada segundo a tu lado. Porque cuando algo me hace feliz de verdad, siempre aparece ese deseo de que dure un poquito más. Y muchos de esos momentos tienen algo en común: vos." },
  { rotulo: "Te amo demasiado", titulo: "Te amo demasiado", chispa: "✦",
    mensaje: "Entre tantas personas, coincidí con vos, y eso es algo que me parece muy bonito. Me gusta conocerte cada día un poquito más, descubrir nuevas cosas de vos y crear recuerdos que sean solamente nuestros. No necesito que todo sea perfecto para disfrutar lo que compartimos; me basta con que sigamos sumando momentos sinceros, sonrisas y razones para elegirnos. Y si algo tengo claro, es que quiero compartir el resto de mi vida con vos." }
];

/* ---------- Utilidades ---------- */
const $ = (id) => document.getElementById(id);
const reducir = matchMedia("(prefers-reduced-motion: reduce)").matches;
const vistas = new Set();
let ultimoBoton = null;

/* ---------- Bienvenida ---------- */
$("abrir").addEventListener("click", (e) => {
  explosion(e.clientX || innerWidth / 2, e.clientY || innerHeight / 2, "♥", 14);
  $("bienvenida").classList.add("sale");
  $("principal").hidden = false;
  scrollTo(0, 0);
  crearFlotantes();
  setTimeout(() => { $("bienvenida").hidden = true; }, 1000);
});

/* ---------- Corazones flotantes ---------- */
function crearFlotantes() {
  if (reducir) return;
  const caja = $("flotantes");
  for (let i = 0; i < 12; i++) {
    const s = document.createElement("span");
    s.textContent = i % 4 === 0 ? "✦" : "♥";
    s.style.left = Math.random() * 100 + "%";
    s.style.fontSize = 10 + Math.random() * 14 + "px";
    s.style.animationDuration = 16 + Math.random() * 14 + "s";
    s.style.animationDelay = -Math.random() * 20 + "s";
    caja.appendChild(s);
  }
}

/* ---------- Destellos ---------- */
function explosion(x, y, simbolo, n = 8) {
  if (reducir) return;
  for (let i = 0; i < n; i++) {
    const c = document.createElement("span");
    const ang = (Math.PI * 2 * i) / n + Math.random() * 0.5;
    const d = 50 + Math.random() * 60;
    c.className = "chispa";
    c.textContent = simbolo;
    c.style.left = x + "px";
    c.style.top = y + "px";
    c.style.setProperty("--x", Math.cos(ang) * d + "px");
    c.style.setProperty("--y", Math.sin(ang) * d + "px");
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 1400);
  }
}

/* ---------- Fotos con respaldo elegante ---------- */
function marcarFalta(img, contenedor, i) {
  const falta = () => {
    contenedor.classList.add("falta");
    contenedor.dataset.falta = "Aquí irá la foto " + (i + 1);
  };
  img.addEventListener("error", falta);
  if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) falta();
}

/* ---------- Galería ---------- */
const galeria = $("galeria");
RECUERDOS.forEach((r, i) => {
  const b = document.createElement("button");
  b.className = "polaroid";
  b.type = "button";
  b.setAttribute("aria-label", "Abrir recuerdo: " + r.titulo);

  const foto = document.createElement("span");
  foto.className = "foto";
  const img = document.createElement("img");
  img.alt = "";
  img.loading = "lazy";
  marcarFalta(img, foto, i);
  img.src = `images/foto${i + 1}.jpg`;
  foto.appendChild(img);

  const rot = document.createElement("span");
  rot.className = "rotulo";
  rot.textContent = r.rotulo;

  const sello = document.createElement("span");
  sello.className = "sello";
  sello.setAttribute("aria-hidden", "true");
  sello.textContent = "♥";

  b.append(foto, rot, sello);
  b.addEventListener("click", () => abrir(i, b));
  galeria.appendChild(b);
});

/* ---------- Carta (modal) ---------- */
const modal = $("modal");
const mFoto = $("m-foto");
const mImg = $("m-img");

function abrir(i, boton) {
  const r = RECUERDOS[i];
  ultimoBoton = boton;
  mFoto.classList.remove("falta");
  mFoto.dataset.falta = "";
  marcarFalta(mImg, mFoto, i);
  mImg.src = `images/foto${i + 1}.jpg`;
  mImg.alt = "Fotografía: " + r.titulo;
  $("m-titulo").textContent = r.titulo;
  $("m-texto").textContent = r.mensaje;

  modal.hidden = false;
  document.body.classList.add("bloqueado");
  requestAnimationFrame(() => requestAnimationFrame(() => modal.classList.add("abierta")));
  $("cerrar").focus({ preventScroll: true });

  const rect = boton.getBoundingClientRect();
  explosion(rect.left + rect.width / 2, rect.top + rect.height / 2, r.chispa);

  vistas.add(i);
  boton.classList.add("vista");
  $("cuenta").textContent = vistas.size;
}

function cerrar() {
  if (modal.hidden) return;
  modal.classList.remove("abierta");
  setTimeout(() => {
    modal.hidden = true;
    document.body.classList.remove("bloqueado");
    if (ultimoBoton) ultimoBoton.focus({ preventScroll: true });
    if (vistas.size === RECUERDOS.length && $("sorpresa").hidden) completar();
  }, reducir ? 0 : 450);
}

modal.addEventListener("click", (e) => { if (e.target.closest("[data-cerrar]")) cerrar(); });
document.addEventListener("keydown", (e) => {
  if (modal.hidden) return;
  if (e.key === "Escape") cerrar();
  if (e.key === "Tab") { e.preventDefault(); $("cerrar").focus(); } /* mantiene el foco dentro de la carta */
});

/* ---------- Al descubrir todos los recuerdos ---------- */
function completar() {
  const s = $("sorpresa");
  s.hidden = false;
  s.scrollIntoView({ behavior: reducir ? "auto" : "smooth", block: "center" });
  setTimeout(() => explosion(innerWidth / 2, innerHeight / 2, "♥", 16), reducir ? 0 : 500);
}

$("repetir").addEventListener("click", () => {
  vistas.clear();
  document.querySelectorAll(".polaroid").forEach((p) => p.classList.remove("vista"));
  $("cuenta").textContent = 0;
  $("sorpresa").hidden = true;
  $("recuerdos").scrollIntoView({ behavior: reducir ? "auto" : "smooth" });
});

/* ---------- Música opcional ---------- */
const audio = $("audio");
const btnMusica = $("musica");
audio.addEventListener("loadedmetadata", () => { btnMusica.hidden = false; });
audio.addEventListener("error", () => { btnMusica.hidden = true; });
btnMusica.addEventListener("click", () => {
  if (audio.paused) {
    audio.play().then(() => {
      btnMusica.setAttribute("aria-pressed", "true");
      btnMusica.setAttribute("aria-label", "Pausar música");
    }).catch(() => {});
  } else {
    audio.pause();
    btnMusica.setAttribute("aria-pressed", "false");
    btnMusica.setAttribute("aria-label", "Activar música");
  }
});