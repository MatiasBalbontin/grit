// ---------- i18n ----------
const TRANSLATIONS = {
  es: {
    'nav.features': 'Características', 'nav.screenshots': 'Capturas',
    'nav.docs': 'Docs', 'nav.about': 'Nosotros', 'nav.download': 'Descargar',
    'nav.bmc': 'Invítame un café',
    'hero.badge': 'Gratis y Código Abierto',
    'hero.tag': 'Tu entrenamiento. Tu peso. Tus datos.',
    'hero.sub': 'Rastreador de gimnasio y peso corporal, gratis y código abierto. Sin suscripción, sin cuenta, sin telemetría — nunca.',
    'feat.kicker': 'Todo lo que necesita un registro de entrenamiento',
    'feat.h2': 'Hecho en el gimnasio, no en una sala de juntas',
    'feat.lead': 'Cada función existe porque era necesaria en el suelo del gimnasio — nada está ahí para venderte algo.',
    'feat.dl.android': 'Descargar para Android', 'feat.dl.selfhost': 'Guía de autoalojamiento',
    'screens.kicker': 'Capturas de pantalla', 'screens.h2': 'Cinco pantallas, cero desorden',
    'download.kicker': 'Obtener GRIT', 'download.h2': 'Una app, dos sabores',
    'download.lead': 'El mismo código, tu elección de dónde viven los datos: completamente en tu teléfono, o en un servidor que tú controlas.',
    'card.recommended': 'Recomendado',
    'download.mobile.title': '📱 App Móvil',
    'download.mobile.for': 'Para cualquiera — instala y listo.',
    'download.mobile.li1': 'Todo se queda en tu teléfono',
    'download.mobile.li2': 'Sin cuenta, sin servidor, sin configuración',
    'download.mobile.li3': 'Recordatorios nativos del día de entrenamiento',
    'download.mobile.li4': 'Copias de seguridad vía la hoja de compartir',
    'download.mobile.li5': 'Sin sincronización entre dispositivos',
    'download.mobile.btn': 'Descargar para Android',
    'download.mobile.meta': 'v1.2.4 · 4.3 MB · Android 6.0+ · APK firmado',
    'download.mobile.iphone': '<b>¿iPhone?</b> Apple no permite instalaciones fuera de la App Store — usa la versión autoalojada como app en pantalla de inicio, o consulta <a href="docs.html#iphone">los docs</a>.',
    'download.server.title': '🖥️ Autoalojado',
    'download.server.for': 'Para homelab — y sus amigos y familia.',
    'download.server.li1': 'Sincroniza en todos tus dispositivos',
    'download.server.li2': 'Perfiles con passkey para múltiples personas',
    'download.server.li3': 'Tus datos legibles en el escritorio',
    'download.server.li4': 'Funciona como app de pantalla de inicio en iPhone y Android',
    'download.server.li5': 'Un solo <code>docker compose up</code>',
    'download.server.btn': 'Guía de autoalojamiento',
    'download.server.meta': 'AGPL-3.0 · imágenes para amd64 + arm64',
    'story.kicker': '¿Por qué existe GRIT?',
    'story.quote': 'GRIT comenzó como <strong>una pequeña app que hice para mí mismo</strong> — solo quería registrar mis entrenamientos y peso sin que una app de suscripción reclamara mis datos de entrenamiento. Luego los amigos quisieron unirse, y luego creció con vida propia.',
    'story.who': '— Duarte Santos · <a href="about.html">leer la historia completa →</a>',
    'os.kicker': 'Código abierto', 'os.h2': 'Con licencia AGPL, para siempre',
    'os.lead': 'El código es público, la licencia mantiene abierto cada fork, y no hay una versión comercial esperando detrás de una cortina. Si GRIT te es útil, una ⭐ en GitHub ayuda a que más personas lo encuentren.',
    'os.stat.stars': 'estrellas GitHub', 'os.stat.forks': 'forks',
    'os.stat.issues': 'issues abiertos', 'os.stat.exercises': 'ejercicios', 'os.stat.langs': 'idiomas',
    'os.btn.github': 'GRIT en GitHub', 'os.btn.contributing': 'Contribuir', 'os.btn.changelog': 'Changelog',
    'footer.docs': 'Docs', 'footer.about': 'Nosotros', 'footer.demo': 'Demo en vivo',
    'f1.title': 'Entrenamientos guiados', 'f1.desc': 'Sabe qué día es, inicia la sesión de hoy, rellena tus pesos de la última vez, cronometra tu descanso, detecta PRs.',
    'f2.title': '1.324 ejercicios', 'f2.desc': 'Biblioteca con demos animados, filtrable por parte del cuerpo y el equipo que realmente tienes — más tus propios ejercicios.',
    'f3.title': 'Plan semanal', 'f3.desc': 'Una rutina por día de la semana, y cualquier día se puede reprogramar cuando la vida pasa — sin tocar el plan.',
    'f4.title': 'Peso corporal y objetivo', 'f4.desc': 'Gráfico interactivo con tu línea de objetivo; cada cambio se colorea según si se acerca o aleja.',
    'f5.title': 'Mapa muscular', 'f5.desc': 'Un diagrama corporal sombreado por cuánto trabajo recibió cada músculo — y cuáles no recibieron nada.',
    'f6.title': 'Mapa de calor de actividad', 'f6.desc': 'Una vista anual estilo GitHub de tu tiempo de entrenamiento. Rachas incluidas.',
    'f7.title': 'Progresión con reglas', 'f7.desc': 'Lineal, Greyskull LP, progresión doble o tiempo añadido — por rutina, con override por ejercicio.',
    'f8.title': 'Series cronometradas', 'f8.desc': 'Planchas, colgadas y acarreos se registran por tiempo, con un temporizador para la serie misma.',
    'f9.title': '1RM estimado', 'f9.desc': 'Por ejercicio, de tu mejor serie elegible — y nombra cuál. No adivina por encima de 12 repeticiones.',
    'f10.title': 'Superseries y cardio', 'f10.desc': 'Empareja ejercicios uno tras otro con un descanso, y registra tiempo + velocidad donde peso × reps no aplica.',
    'f11.title': 'Compartir un plan', 'f11.desc': 'Envía tus rutinas como un archivo pequeño o imprímelo como PDF limpio. Importar combina, nunca sobreescribe.',
    'f12.title': 'Esfuerzo por serie', 'f12.desc': 'Califica una serie como RIR o RPE — la escala en la que ya piensas. Opcional.',
    'f13.title': 'Pantalla despierta', 'f13.desc': 'Sin desbloquear el teléfono entre series. La pantalla permanece encendida durante el entrenamiento.',
    'f14.title': 'Trae tu historial', 'f14.desc': 'Importa desde FitNotes, Strong, Hevy — incluyendo el RPE — o peso corporal de un export de Apple Health.',
    'f15.title': '12 idiomas', 'f15.desc': 'Traducción completa de UI, instrucciones de ejercicios en 10 idiomas, cargados bajo demanda.',
    'f16.title': 'Passkeys, no contraseñas', 'f16.desc': 'Los perfiles autoalojados inician con Face ID / huella digital. Los datos de cada persona quedan suyos.',
    'f17.title': 'Diseñado, no ensamblado', 'f17.desc': 'Temas claro y oscuro, 8 colores de acento, iconos dibujados a mano. Se ve igual en todos los teléfonos.',
    'f18.title': 'Tuyo para siempre', 'f18.desc': 'Exportación e importación JSON con un toque. Tu registro es un archivo que tú posees, no una fila en la nube de alguien.',
  },
  en: {
    'nav.features': 'Features', 'nav.screenshots': 'Screenshots',
    'nav.docs': 'Docs', 'nav.about': 'About', 'nav.download': 'Download',
    'nav.bmc': 'Buy me a coffee',
    'hero.badge': 'Free & Open Source',
    'hero.tag': 'Your workouts. Your weights. Your data.',
    'hero.sub': 'A free, open-source gym & body-weight tracker. No subscription, no account required, no telemetry — ever.',
    'feat.kicker': 'Everything a training log needs',
    'feat.h2': 'Built in the gym, not in a boardroom',
    'feat.lead': 'Every feature exists because it was needed on the gym floor — nothing is there to sell you anything.',
    'feat.dl.android': 'Download for Android', 'feat.dl.selfhost': 'Self-hosting guide',
    'screens.kicker': 'Screenshots', 'screens.h2': 'Five screens, zero clutter',
    'download.kicker': 'Get GRIT', 'download.h2': 'One app, two flavors',
    'download.lead': 'Same codebase, your choice of where the data lives: entirely on your phone, or on a server you control.',
    'card.recommended': 'Recommended',
    'download.mobile.title': '📱 Mobile app',
    'download.mobile.for': "For anyone — install and you're done.",
    'download.mobile.li1': 'Everything stays on your phone',
    'download.mobile.li2': 'No account, no server, no setup',
    'download.mobile.li3': 'Native workout-day reminders',
    'download.mobile.li4': 'Backups via the share sheet',
    'download.mobile.li5': 'No cross-device sync',
    'download.mobile.btn': 'Download for Android',
    'download.mobile.meta': 'v1.2.4 · 4.3 MB · Android 6.0+ · signed APK',
    'download.mobile.iphone': "<b>iPhone?</b> Apple doesn't allow installs outside the App Store — use the self-hosted version as a home-screen app instead, or see <a href=\"docs.html#iphone\">the docs</a>.",
    'download.server.title': '🖥️ Self-hosted',
    'download.server.for': 'For homelabbers — and their friends & family.',
    'download.server.li1': 'Sync across all your devices',
    'download.server.li2': 'Passkey profiles for multiple people',
    'download.server.li3': 'Your data readable on the desktop',
    'download.server.li4': 'Works as a home-screen app on iPhone & Android',
    'download.server.li5': 'One <code>docker compose up</code>',
    'download.server.btn': 'Self-hosting guide',
    'download.server.meta': 'AGPL-3.0 · prebuilt images for amd64 + arm64',
    'story.kicker': 'Why GRIT exists',
    'story.quote': 'GRIT started as <strong>a tiny app I built for myself</strong> — I just wanted to log my workouts and weight without a subscription app claiming my training data. Then friends wanted in, then it grew a mind of its own.',
    'story.who': '— Duarte Santos · <a href="about.html">read the whole story →</a>',
    'os.kicker': 'Open source', 'os.h2': 'AGPL-licensed, forever',
    'os.lead': 'The code is public, the license keeps every fork open, and there is no commercial version waiting behind a curtain. If GRIT is useful to you, a ⭐ on GitHub helps more people find it.',
    'os.stat.stars': 'GitHub stars', 'os.stat.forks': 'forks',
    'os.stat.issues': 'open issues', 'os.stat.exercises': 'exercises', 'os.stat.langs': 'languages',
    'os.btn.github': 'GRIT on GitHub', 'os.btn.contributing': 'Contributing', 'os.btn.changelog': 'Changelog',
    'footer.docs': 'Docs', 'footer.about': 'About', 'footer.demo': 'Live demo',
    'f1.title': 'Guided workouts', 'f1.desc': "Knows what day it is, starts today's session, pre-fills your weights from last time, times your rest, spots PRs.",
    'f2.title': '1,324 exercises', 'f2.desc': 'Searchable library with animated demos, filterable by body part and the equipment you actually own — plus your own custom exercises.',
    'f3.title': 'Weekly plan', 'f3.desc': 'A routine per weekday, and any day can be rescheduled when life happens — without touching the plan.',
    'f4.title': 'Body weight & goal', 'f4.desc': 'Interactive chart with your goal line; every change is colored by whether it moves toward it.',
    'f5.title': 'Muscle map', 'f5.desc': 'A body diagram shaded by how much work each muscle got — and which ones got nothing.',
    'f6.title': 'Activity heatmap', 'f6.desc': 'A GitHub-style year view of your training time. Streaks included.',
    'f7.title': 'Progression that follows a rule', 'f7.desc': 'Linear, Greyskull LP, double progression or added time — per routine, overridable per exercise.',
    'f8.title': 'Timed sets', 'f8.desc': 'Planks, hangs and carries are logged by time, with a timer for the set itself.',
    'f9.title': 'Estimated 1RM', 'f9.desc': "Per exercise, from your best eligible set — and it names which one. Won't guess above 12 reps.",
    'f10.title': 'Supersets & cardio', 'f10.desc': 'Pair exercises back-to-back with one rest, and log time + speed where weight × reps makes no sense.',
    'f11.title': 'Share a plan', 'f11.desc': 'Send someone your routines as a small file or print it as a clean PDF. Importing merges, never overwrites.',
    'f12.title': 'Effort per set', 'f12.desc': 'Rate a set as RIR or RPE — whichever scale you already think in. Optional.',
    'f13.title': 'Screen stays awake', 'f13.desc': 'No unlocking the phone between sets. The screen stays lit while a workout runs.',
    'f14.title': 'Bring your history', 'f14.desc': 'Import from FitNotes, Strong, Hevy — including the RPE they recorded — or body weight from an Apple Health export.',
    'f15.title': '12 languages', 'f15.desc': 'Full UI translation, exercise instructions in 10 languages, loaded on demand.',
    'f16.title': 'Passkeys, not passwords', 'f16.desc': "Self-hosted profiles sign in with Face ID / fingerprint. Each person's data stays their own.",
    'f17.title': 'Designed, not assembled', 'f17.desc': 'Light & dark themes, 8 accent colors, a hand-drawn icon set. Looks the same on every phone.',
    'f18.title': 'Yours to keep', 'f18.desc': "One-tap JSON export and import. Your training log is a file you own, not a row in someone's cloud.",
  }
}

let currentLang = 'es'

function applyLang(lang) {
  currentLang = lang
  document.documentElement.lang = lang
  const t = TRANSLATIONS[lang]
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n
    if (t[key] !== undefined) el.textContent = t[key]
  })
  // innerHTML is safe here: TRANSLATIONS is a static object defined in this file,
  // never populated from user input or external APIs.
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.dataset.i18nHtml
    if (t[key] !== undefined) el.innerHTML = t[key]
  })
  document.getElementById('btn-es').classList.toggle('active', lang === 'es')
  document.getElementById('btn-en').classList.toggle('active', lang === 'en')
  try { localStorage.setItem('grit_lang', lang) } catch (e) {}
}

function setLang(lang) { applyLang(lang) }

// Restore saved lang preference
;(() => {
  try {
    const saved = localStorage.getItem('grit_lang')
    if (saved && (saved === 'es' || saved === 'en') && saved !== 'es') applyLang(saved)
  } catch (e) {}
})()

// ---------- scroll reveal ----------
;(() => {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target) }
    })
  }, { threshold: 0.07 })
  document.querySelectorAll('.feat, .stat, .card, section h2, .shots figure').forEach((el, i) => {
    el.classList.add('reveal')
    el.style.transitionDelay = (i % 6) * 55 + 'ms'
    obs.observe(el)
  })
})()

// ---------- GitHub stats ----------
// Live numbers in the open-source strip. Fails silently.
;(async () => {
  const set = (id, v) => document.querySelectorAll('[data-gh="' + id + '"]').forEach(el => { el.textContent = v })
  try {
    let d = null
    const cached = sessionStorage.getItem('gh_repo')
    if (cached) d = JSON.parse(cached)
    else {
      const r = await fetch('https://api.github.com/repos/DuarteSantos8/openGym')
      if (!r.ok) return
      d = await r.json()
      sessionStorage.setItem('gh_repo', JSON.stringify({
        stargazers_count: d.stargazers_count,
        forks_count: d.forks_count,
        open_issues_count: d.open_issues_count
      }))
    }
    set('stars-n', d.stargazers_count)
    set('forks-n', d.forks_count)
    set('issues-n', d.open_issues_count)
  } catch (e) { /* offline / rate-limited */ }
})()

// ---------- About page: milestone timeline from GitHub releases ----------
;(async () => {
  const tl = document.getElementById('milestones')
  if (!tl) return
  try {
    let rel = null
    const cached = sessionStorage.getItem('gh_releases')
    if (cached) rel = JSON.parse(cached)
    else {
      const r = await fetch('https://api.github.com/repos/DuarteSantos8/openGym/releases?per_page=100')
      if (!r.ok) return
      rel = (await r.json()).filter(x => !x.draft && !x.prerelease)
        .map(x => ({ tag: x.tag_name, name: x.name, at: x.published_at, body: x.body || '', url: x.html_url }))
      sessionStorage.setItem('gh_releases', JSON.stringify(rel))
    }
    if (!rel.length) return
    const fmt = d => new Date(d).toLocaleDateString('en-GB', { year: 'numeric', month: 'long', day: 'numeric' })
    const blurb = md => {
      const lines = md.replace(/\r/g, '').split('\n')
      let start = lines.findIndex(l => l.trim() && !l.trim().startsWith('#'))
      if (start < 0) return ''
      let para = []
      for (let i = start; i < lines.length && lines[i].trim(); i++) para.push(lines[i].trim())
      const txt = para.join(' ').replace(/\[([^\]]*)\]\([^)]*\)/g, '$1').replace(/[*_`>]/g, '')
      return txt.length > 220 ? txt.slice(0, 217).replace(/\s+\S*$/, '') + '…' : txt
    }
    tl.querySelectorAll('[data-fallback]').forEach(el => el.remove())
    for (const x of rel.slice().reverse()) {
      const li = document.createElement('li')
      const title = x.name && x.name !== x.tag ? x.name : x.tag
      li.innerHTML = '<b></b><span class="when"></span><p></p>'
      li.querySelector('b').textContent = title.startsWith(x.tag) ? title : x.tag + ' — ' + title
      li.querySelector('.when').textContent = fmt(x.at)
      const p = li.querySelector('p')
      p.textContent = blurb(x.body) + ' '
      const a = document.createElement('a')
      a.href = x.url; a.rel = 'noopener'; a.textContent = 'notes →'
      p.appendChild(a)
      tl.appendChild(li)
    }
  } catch (e) { /* fallback entries stay */ }
})()
