/* ==========================================================================
   Lógica del calendario. No hace falta tocar nada aquí.
   (Para probar sin esperar a diciembre: añade ?demo=24 a la URL.
    ?demo=5 abre hasta el día 5, ?demo=0 simula que aún no ha empezado.)
   ========================================================================== */

(function () {
  "use strict";

  const anio = CONTENIDO.anio;
  const STORAGE_KEY = "adviento_" + anio + "_abiertas";

  const rejilla = document.getElementById("rejilla");
  const aviso = document.getElementById("aviso");
  const final = document.getElementById("final");
  const params = new URLSearchParams(window.location.search);
  const demo = params.has("demo") ? Math.max(0, Math.min(24, parseInt(params.get("demo"), 10) || 0)) : null;

  /* ---------- Días disponibles según la fecha real ---------- */
  function diasDisponibles() {
    if (demo !== null) return demo;

    const hoy = new Date();
    const inicio = new Date(anio, 11, 1);   // 1 de diciembre
    const fin = new Date(anio, 11, 25);     // 25 de diciembre

    if (hoy < inicio) return 0;             // Aún no ha llegado diciembre
    if (hoy >= fin) return 24;              // Adviento terminado: se pueden ver todas
    return Math.min(24, hoy.getDate());
  }

  /* ---------- Progreso guardado en el navegador ---------- */
  function leerAbiertas() {
    try {
      const guardadas = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
      return new Set(Array.isArray(guardadas) ? guardadas.filter(n => n >= 1 && n <= 24) : []);
    } catch (e) {
      return new Set();
    }
  }

  const abiertas = leerAbiertas();

  function guardar() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(abiertas)));
    } catch (e) {
      /* Si el navegador bloquea el almacenamiento, la web sigue funcionando. */
    }
  }

  /* ---------- Avisos ---------- */
  let avisoTimer;
  function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.classList.add("visible");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(() => aviso.classList.remove("visible"), 3200);
  }

  /* ---------- Confeti para la puerta de cumpleaños ---------- */
  function lanzarConfeti() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const colores = ["#f2d99a", "#d4ad57", "#fbf3e4", "#e88fa0", "#c94f63", "#ffffff"];
    const capa = document.createElement("div");
    capa.className = "confeti";
    capa.setAttribute("aria-hidden", "true");

    for (let i = 0; i < 70; i++) {
      const pieza = document.createElement("span");
      pieza.className = "confeti-pieza";
      pieza.style.left = (Math.random() * 100) + "vw";
      pieza.style.width = (5 + Math.random() * 6) + "px";
      pieza.style.height = (7 + Math.random() * 9) + "px";
      pieza.style.background = colores[Math.floor(Math.random() * colores.length)];
      pieza.style.animationDuration = (2.4 + Math.random() * 2) + "s";
      pieza.style.animationDelay = (Math.random() * 0.5) + "s";
      pieza.style.setProperty("--giro", (Math.random() * 240 - 120) + "px");
      capa.appendChild(pieza);
    }

    document.body.appendChild(capa);
    setTimeout(() => capa.remove(), 5200);
  }

  /* ---------- Nieve ---------- */
  function crearNieve() {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const contenedor = document.getElementById("nieve");
    const fragmento = document.createDocumentFragment();

    for (let i = 0; i < 42; i++) {
      const copo = document.createElement("span");
      const tamano = 4 + Math.random() * 9;
      copo.className = "copo";
      copo.textContent = Math.random() > 0.25 ? "❄" : "✦";
      copo.style.left = (Math.random() * 100) + "%";
      copo.style.fontSize = tamano + "px";
      copo.style.opacity = (0.25 + Math.random() * 0.55).toFixed(2);
      copo.style.animationDuration = (9 + Math.random() * 13).toFixed(1) + "s";
      copo.style.animationDelay = (-Math.random() * 20).toFixed(1) + "s";
      copo.style.setProperty("--deriva", (Math.random() * 140 - 70) + "px");
      fragmento.appendChild(copo);
    }
    contenedor.appendChild(fragmento);
  }

  /* ---------- Texto de estado ---------- */
  function actualizarEstado(disponibles) {
    const estado = document.getElementById("estado");
    const hoy = new Date();

    if (demo !== null) {
      estado.textContent = "✨ Modo prueba: hasta la puerta " + demo;
    } else if (hoy < new Date(anio, 11, 1)) {
      const faltan = Math.ceil((new Date(anio, 11, 1) - hoy) / 86400000);
      estado.textContent = "Faltan " + faltan + " días para que empiece la magia ✨";
    } else if (disponibles >= 24) {
      estado.textContent = "Todas las puertas están abiertas ✨";
    } else if (disponibles === 19) {
      estado.textContent = "🎂 Hoy es tu cumpleaños: ¡feliz día, mi amor!";
    } else {
      estado.textContent = "Hoy te toca la puerta " + disponibles + " 💌";
    }
  }

  /* ---------- Progreso ---------- */
  function actualizarProgreso() {
    const total = CONTENIDO.dias.length;
    const n = abiertas.size;
    document.getElementById("progresoTexto").textContent = n + " de " + total + " puertas abiertas";
    document.getElementById("progresoRelleno").style.width = (n / total * 100) + "%";
    document.getElementById("progresoBarra").setAttribute("aria-valuenow", String(n));

    if (n === total) final.hidden = false;
  }

  /* ---------- Construir una puerta ---------- */
  function crearPuerta(dia, disponibles) {
    const numero = Number(dia.dia);
    const regalo = dia.regalo || {};
    const abierta = abiertas.has(numero);
    const desbloqueada = numero <= disponibles;
    const esHoy = demo === null && numero === disponibles && disponibles >= 1 && disponibles <= 24;
    const esCumple = dia.especial === "cumple";

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "puerta";
    boton.dataset.dia = String(numero);
    boton.classList.add(abierta || desbloqueada ? "disponible" : "bloqueada");
    if (abierta) boton.classList.add("abierta");
    if (esHoy) boton.classList.add("hoy");
    if (esCumple) boton.classList.add("cumple");

    const etiqueta = abierta
      ? "Puerta " + numero + " abierta: " + dia.mensaje
      : desbloqueada
        ? "Abrir puerta " + numero
        : "Puerta " + numero + " cerrada hasta el " + numero + " de diciembre";
    boton.setAttribute("aria-label", etiqueta);
    boton.setAttribute("aria-pressed", String(abierta));

    const inner = document.createElement("div");
    inner.className = "puerta-inner";

    /* --- Cara cerrada --- */
    const cerrada = document.createElement("div");
    cerrada.className = "cara cara-cerrada";
    cerrada.innerHTML =
      (esCumple ? '<span class="cinta-cumple">🎂 CUMPLEAÑOS</span>' : "") +
      '<span class="esquina esquina-tl" aria-hidden="true">✦</span>' +
      '<span class="esquina esquina-tr" aria-hidden="true">✦</span>' +
      '<span class="esquina esquina-bl" aria-hidden="true">✦</span>' +
      '<span class="esquina esquina-br" aria-hidden="true">✦</span>' +
      '<span class="numero">' + numero + '</span>' +
      '<span class="palabra">' + (esCumple ? "FELIZ DÍA" : "ADVIENTO") + '</span>' +
      (desbloqueada
        ? '<span class="fecha">✨ Ábreme</span>'
        : '<span class="candado" aria-hidden="true">🔒</span><span class="fecha">Dic ' + numero + '</span>') +
      (esHoy && !esCumple ? '<span class="hoy-etiqueta">HOY</span>' : "");

    /* --- Cara abierta --- */
    const abiertaCara = document.createElement("div");
    abiertaCara.className = "cara cara-abierta";

    const diaLabel = document.createElement("span");
    diaLabel.className = "dia-etiqueta" + (esCumple ? " especial" : "");
    diaLabel.textContent = esCumple
      ? (dia.etiquetaEspecial || "🎂 Cumpleaños") + " · Día " + numero
      : "Día " + numero;

    const mensaje = document.createElement("p");
    mensaje.className = "mensaje";
    mensaje.textContent = dia.mensaje || "";

    const bloqueRegalo = document.createElement("div");
    bloqueRegalo.className = "regalo";
    const emoji = document.createElement("span");
    emoji.className = "regalo-emoji";
    emoji.textContent = regalo.emoji || "🎁";
    const nombre = document.createElement("span");
    nombre.className = "regalo-nombre";
    nombre.textContent = regalo.nombre || "";
    bloqueRegalo.appendChild(emoji);
    if (regalo.nombre) bloqueRegalo.appendChild(nombre);

    if (regalo.descripcion) {
      const desc = document.createElement("span");
      desc.className = "regalo-desc";
      desc.textContent = regalo.descripcion;
      bloqueRegalo.appendChild(desc);
    }
    if (regalo.enlace) {
      const enlace = document.createElement("a");
      enlace.className = "regalo-enlace";
      enlace.href = regalo.enlace;
      enlace.textContent = "Ver regalo →";
      enlace.target = "_blank";
      enlace.rel = "noopener noreferrer";
      bloqueRegalo.appendChild(enlace);
    }

    abiertaCara.appendChild(diaLabel);
    abiertaCara.appendChild(mensaje);
    abiertaCara.appendChild(bloqueRegalo);

    inner.appendChild(cerrada);
    inner.appendChild(abiertaCara);
    boton.appendChild(inner);

    boton.addEventListener("click", () => {
      if (!desbloqueada) {
        boton.classList.remove("sacudir");
        void boton.offsetWidth;
        boton.classList.add("sacudir");
        mostrarAviso("Todavía no, " + CONTENIDO.nombre + ". Te espero el " + numero + " de diciembre 🔒");
        return;
      }

      if (!abiertas.has(numero)) {
        abiertas.add(numero);
        guardar();
        boton.classList.add("abierta", "disponible");
        boton.classList.remove("hoy");
        cerrada.querySelector(".hoy-etiqueta")?.remove();
        boton.setAttribute("aria-pressed", "true");
        boton.setAttribute("aria-label", "Puerta " + numero + " abierta: " + dia.mensaje);
        actualizarProgreso();
      } else {
        /* Si ya está abierta, se cierra y se vuelve a abrir para relerla. */
        boton.classList.remove("abierta");
        void boton.offsetWidth;
        boton.classList.add("abierta");
      }

      if (esCumple) lanzarConfeti();
    });

    return boton;
  }

  /* ---------- Inicio ---------- */
  function iniciar() {
    document.getElementById("titulo").textContent = CONTENIDO.titulo;
    document.getElementById("subtitulo").textContent = CONTENIDO.subtitulo;
    document.getElementById("mensajeFinal").textContent = CONTENIDO.mensajeFinal;
    document.getElementById("anioPie").textContent = String(anio);
    document.title = CONTENIDO.titulo + " ❤ " + CONTENIDO.nombre;

    const disponibles = diasDisponibles();
    actualizarEstado(disponibles);

    const fragmento = document.createDocumentFragment();
    CONTENIDO.dias
      .slice()
      .sort((a, b) => Number(a.dia) - Number(b.dia))
      .forEach(dia => fragmento.appendChild(crearPuerta(dia, disponibles)));
    rejilla.appendChild(fragmento);

    actualizarProgreso();
    crearNieve();
  }

  iniciar();
})();
