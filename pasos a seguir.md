# Pasos a seguir — Grit

Estado del proyecto para retomar la sesión. Plan completo en:
`C:\Users\matia\.claude\plans\audita-el-proyecto-necesito-lively-origami.md`

Proyecto: OpenGym (React 19 + Vite + Capacitor). Licencia AGPL v3 (autor Duarte Santos).
Fork propio → repo `opengym-mb` (por crear). Distribución: APK Android sideload.

---

## ✅ Hecho (build + tests verdes, 208 tests)

### Sesión auditoría (`/code-review` 2 ejes) — riesgos/bugs mitigados
Plan: `C:\Users\matia\.claude\plans\crea-un-plan-de-scalable-turtle.md`. Sin deps nuevas. Sin commitear.

- **Bug búsqueda ES — falsos positivos.** `esAliasTerms` hacía substring bidireccional: query
  de 1-2 letras (`"ba"`) inyectaba bench/barbell/bar/band. Fix: guard `ql.length < 3` → sin alias.
  Archivos: `lib/search-es.js`, `lib/search-es.test.js` (nuevo, 6 tests).
- **Estándar — lógica de pesaje a helper puro testeado.** Extraído `weighDue(S, now)` +
  `WEIGH_DAYS` a `lib/history.js` (junto a `lastBW`). `startFlow` en `sheets.jsx` adelgazado
  (sin aritmética de fechas inline). Tests: `history.test.js` (+6).
- **Estándar — prescripción del swap a helper puro testeado.** Extraído `swapEntry(S, ex, cfg,
  routine, prevSg)` a `lib/progression.js` (NO history.js: crearía ciclo — progression ya importa
  de history). `swap` en `Workout.jsx` lo usa. Tests: `progression.test.js` (+2).



- **Fase 0 — No pedir peso antes de cada rutina.**
  Ajuste `weighCadence` (Nunca/Semanal/Mensual, default Semanal). Solo pide pesaje si venció la
  cadencia. Ajustes → During a workout → "Pesarme antes de entrenar".
  Archivos: `store/useStore.js`, `sheets.jsx` (startFlow), `views/Settings.jsx`, `locales/es.js`.

- **Fase 7 — Búsqueda de ejercicios en español.**
  Escribir "sentadilla" encuentra "squat", "polea"→cable/pulldown, etc. (~130 alias).
  Archivos: `lib/search-es.js` (nuevo), `sheets.jsx` (ExercisePicker).

- **Fase 6 — Modo fácil (editor de rutina simple).**
  Toggle en Ajustes → General. Con él activado, tocar un ejercicio en la rutina lo despliega inline
  (acordeón): Series · Reps · Unilateral · Peso, y switch "Peso por serie" (peso/reps por cada
  serie). Guarda `series:[{w,r}]` opcional; la auto-progresión no pisa pesos manuales.
  Archivos: `store/useStore.js`, `lib/history.js` (buildSets + exLine), `lib/progression.js`,
  `views/Settings.jsx`, `views/RoutineEdit.jsx`, `locales/es.js`, `lib/history.test.js`.

- **Fase 4 — Cambiar ejercicio en sesión.**
  En el workout activo, botón ↻ por ejercicio: cambia el ejercicio en el mismo lugar (mantiene
  superserie e historial propio), sin alterar la plantilla de la rutina. Para cuando te ocupan la
  máquina. También ya existía "Freestyle workout (pick as you go)" en la pantalla de inicio.
  Archivos: `views/Workout.jsx`, `locales/es.js`.

- **Módulo de PRs Inteligente y Manual (Nuevo).**
  Detección inmediata de PRs al tildar una serie, celebraciones limitadas a tus "Ejercicios Trackeados", 
  deshacer automático de récords si te equivocas, y un módulo en el Home para cargar tus récords manualmente.
  Archivos: `views/Workout.jsx`, `views/Home.jsx`, `sheets.jsx`.

- **Cronómetro de serie / Tiempo bajo tensión (Completado).**
  Botón de "Play" al lado del número de serie que mide cuánto dura la serie (tiempo activo). Al tildarla, 
  calcula los segundos activos y arranca automáticamente el temporizador de descanso.
  Archivos: Ya integrado en `views/Workout.jsx` (botón `exec-timer`).

- **Fase 1+2 — Rebrand "Grit" + Íconos Cuadrados Capacitor.**
  `capacitor.config.json` y `manifest.json` actualizados a `com.mb.opengym` / "Grit".
  Se generaron nuevos splash screens e íconos usando `grit-isotipo.svg`.
  Archivos: `frontend/resources/*`, `capacitor.config.json`, `public/manifest.json`.

---

## ⬜ Pendiente

### Deuda técnica diagnosticada (auditoría — no crítico)
- **Refactor `resolveSet(s, cfg)`.** Fallback `s.w != null ? s.w : cfg.weight` de `series`
  repetido en `history.js` (buildSets, exLine) y `RoutineEdit.jsx` (EasyExRow). Extraer helper
  en `src/lib` evita que las semánticas diverjan. Fuera de alcance esta sesión; hacer si se
  vuelve a tocar `series`.
- **Cobertura alias ES.** `search-es.js` tiene ~95 claves; el objetivo era ~130. Ampliar
  vocabulario si aparece un término común que no matchea.
- **Chequeo visual Fase 6.** Toggle "Modo fácil" quedó tras el `Row` de unidades en
  `Settings.jsx:116`; confirmar que cae en la sección "General" (spec lo pide explícito).
- **CSS layout-transition (index.css L424/532/623).** Anima `width/height/padding/margin` →
  jank. Preexistente, no tocado esta sesión. Cambiar a `transform`/`grid-template-rows` en un
  pase de rendimiento aparte.

### Fase 3 — Botón "Buscar actualizaciones" (solo build MOBILE)
- `lib/update.js`: fetch a GitHub Releases del repo `opengym-mb`, comparar semver, si hay nueva
  versión abrir sheet con notas + botón descargar APK. Manejo de error (offline/sin releases).
- Fila en Ajustes (sección MOBILE).

### Fase 5 — Repo `opengym-mb` + GitHub Actions (APK automático)
- Crear repo público en GitHub (cuenta Matías), push.
- `.github/workflows/release-apk.yml`: en tag `v*` compila APK firmado y publica Release.
- **Paso manual de Matías**: generar keystore (`keytool`) y cargar secrets en GitHub
  (`ANDROID_KEYSTORE` base64, `KEY_ALIAS`, `KEY_PASSWORD`, `STORE_PASSWORD`).

### Licencia (al crear el repo)
- Mantener `LICENSE` (AGPL) + copyright de Duarte. Añadir aviso de modificación en `NOTICE.md`/README.
- Repo público. AGPL permite comercializar; no se puede quitar el copyleft.

---

## Orden sugerido restante
Fase 3 → Fase 5.

## Comandos útiles (carpeta `frontend/`)
- Dev (Web): `npm run dev`
- Build web: `npm run build`
- Tests: `npm test`
- Sincronizar cambios de app nativa: `npm run build:mobile`
- **Levantar en Emulador Android (Capacitor):** `npx cap run android` 
  *(Requiere tener Android Studio instalado y un AVD / Emulador configurado corriendo).*
- Abrir proyecto nativo: `npx cap open android`

## Cómo probar lo hecho hoy
1. Web: `cd frontend; npm run dev`
2. **Emulador Móvil**: `cd frontend; npx cap run android`
3. PRs Dedicados: Toca en "Tus récords" en el Home, agrega un ejercicio y asienta una marca. Luego entrena ese ejercicio superando la marca.
4. Cronómetro Serie: En un entrenamiento, toca el botón de "Play" pequeño junto a la serie para medir la ejecución.
