<div align="center">

<img src="Logo.png" alt="Grit" width="720">

<br>

**Un rastreador de gimnasio y peso corporal que tú controlas y posees realmente.**

Planifica tu semana, realiza entrenamientos guiados, registra cada serie y tu peso corporal a lo largo del tiempo — en tu teléfono, sincronizado entre dispositivos y protegido por tu propio inicio de sesión con *passkey*. Sin cuentas en servidores de terceros, sin suscripciones, sin anuncios. Simplemente ejecuta `docker compose up`.

<br>

[![License: AGPL v3](https://img.shields.io/badge/license-AGPL--3.0-a3e635?style=flat-square)](LICENSE)
![Self-hosted](https://img.shields.io/badge/self--hosted-%F0%9F%8F%A0-60a5fa?style=flat-square)
![PWA](https://img.shields.io/badge/PWA-installable-a78bfa?style=flat-square)
![React](https://img.shields.io/badge/React-19-38bdf8?style=flat-square&logo=react&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-compose-2496ED?style=flat-square&logo=docker&logoColor=white)
![No tracking](https://img.shields.io/badge/telemetry-none-f472b6?style=flat-square)
<br>
![GitHub last commit](https://img.shields.io/github/last-commit/MatiasBalbontin/grit?style=flat-square)
[![GitHub stars](https://img.shields.io/github/stars/MatiasBalbontin/grit?style=flat-square)](https://github.com/MatiasBalbontin/grit/stargazers)
[![GitHub issues](https://img.shields.io/github/issues/MatiasBalbontin/grit?style=flat-square)](https://github.com/MatiasBalbontin/grit/issues)

</div>

> **Nota:** Grit es un *fork* modificado del excelente proyecto [openGym](https://github.com/DuarteSantos8/openGym) creado por Duarte Santos. Incluye un rediseño visual completo (rebranding), compilaciones nativas para Android y un módulo automatizado dedicado a los Récords Personales (PRs).

## Por qué

La mayoría de las aplicaciones de entrenamiento encierran tus datos detrás de un inicio de sesión en sus servidores, te molestan para que pagues por mejoras, o desaparecen cuando la empresa quiebra. Grit es todo lo contrario: **se ejecuta en tu servidor, tus datos permanecen en una carpeta que tú controlas, y eres libre de crear tu propia versión (fork).** Aún así, se siente moderna: se puede instalar como una aplicación de pantalla de inicio (PWA), permite inicio de sesión con *passkey*, soporta uso sin conexión y sincroniza entre tu teléfono y computadora.

## Características principales

- 🏆 **Récords Personales Inteligentes (PRs)** — módulo especializado para rastrear manual o automáticamente tus PRs según el volumen y las series.
- ⚖️ **Seguimiento de peso corporal** — gráfico interactivo con una línea de meta que tú defines; las ganancias/pérdidas cambian de color según te acerques a tu objetivo.
- 🏋️ **Plan semanal** — una rutina por cada día de la semana, utilizando una biblioteca de **1.324 ejercicios** (con búsqueda avanzada y demostraciones animadas).
- 🗓️ **Reprograma cualquier día** — ¿Te enfermaste, perdiste una sesión o fuiste menos días al gimnasio esta semana? Mueve un entrenamiento a otro día sin alterar tu plan semanal.
- ▶️ **Entrenamientos guiados** — la app sabe qué día es e inicia la sesión de hoy; primero te pregunta tu peso corporal, autocompleta los pesos de la última vez, incluye temporizador de descanso, detección automática de PRs y seguimiento de peso por ejercicio.
- ☀️ **La pantalla no se apaga mientras entrenas** — se acabaron los problemas de desbloquear el teléfono y buscar dónde estabas después de cada serie. Se mantiene encendida mientras el entrenamiento está activo y se libera en el momento en que terminas (opción desactivable en los Ajustes).
- 🔗 **Superseries** — créalas y regístralas de forma consecutiva con un descanso solo al finalizar el par.
- ⏱️ **Ejercicios por tiempo** — las planchas, dominadas isométricas, sentadillas en pared y caminata de granjero se registran por tiempo, no por repeticiones. Cuenta con un temporizador de trabajo que mide la serie en sí (independiente del temporizador de descanso) y registra el tiempo real que aguantaste. También pueden llevar peso extra.
- 📈 **Progresión estructurada** — elige una regla por rutina, o anúlala por ejercicio: progresión lineal, **Greyskull LP** (última serie AMRAP, saltos dobles de peso, reinicios del 10%), progresión doble por rango de repeticiones o aumento de tiempo. Los pesos ya están configurados correctamente cuando abres la sesión, y cada objetivo explica *por qué* es ese número. Fallar repeticiones nunca aumenta la carga, estancarse provoca una semana de descarga (deload), y los ejercicios de peso corporal progresan sumando repeticiones.
- 💪 **1RM Estimado** — cálculo automático por ejercicio desde tu mejor serie elegible (te muestra cuál usó), con su propia curva de progreso y una calculadora para series que aún no has hecho. No hace estimaciones basadas en series de más de 12 repeticiones.
- 🎯 **Esfuerzo por serie (RIR/RPE)** — una tercera columna opcional que califica cuán difícil fue una serie mediante **RIR** (repeticiones en reserva) o **RPE** (escala de esfuerzo del 1 al 10). Apagado por defecto; cada serie guarda la escala con la que se registró, y nada más lee este valor: tu progresión y cálculo de 1RM no se ven afectados.
- ↔️ **Repeticiones por lado** — para estocadas (lunges), remo a un brazo, etc. Tú registras el total, la aplicación muestra la división ("8 por lado"), y el objetivo siempre avanza de dos en dos para evitar números impares imposibles.
- 🏃 **Cardio** — registra tiempo + velocidad, no solo peso × repeticiones.
- 📥 **Trae tu historial contigo** — importa tus entrenamientos desde **FitNotes**, **Strong** o **Hevy**, o tu historial de peso corporal directamente desde una exportación de **Apple Health**.
- 📦 **Tus datos son tuyos** — exportación/importación en JSON con un solo toque, modo invitado, y **cero telemetría (sin rastreo)**.
- 📱 **Aplicación Android Nativa** — el rastreador completo como un archivo APK instalable: sin cuenta, sin servidor, los datos se guardan solo en el teléfono e incluye recordatorios de entrenamiento nativos.

## Inicio rápido (Auto-alojado / Self-host)

Necesitas tener [Docker](https://docs.docker.com/get-docker/) con Compose instalado.

```bash
git clone https://github.com/MatiasBalbontin/grit
cd grit
cp .env.example .env
docker compose up -d --build
```

Abre **http://localhost:8080**, pulsa en **Crear perfil (Create profile)** y ya estás dentro. El primer inicio descargará la base de datos de los medios visuales de los ejercicios (~140 MB) una sola vez.

> ¿Quieres que sea accesible desde tu teléfono a través de Internet utilizando *passkeys*? Necesitarás un dominio HTTPS — es un cambio de dos líneas en el archivo `.env`. Revisa **[docs/SELF_HOSTING.md](docs/SELF_HOSTING.md)**.

## Aplicación móvil (Sin servidor)

El mismo código base genera una **aplicación móvil independiente** (mediante Capacitor): sin necesidad de cuenta, sin sincronización, sin backend — todo permanece en el teléfono. Cuenta con notificaciones nativas recordándote entrenar y opción de hacer copias de seguridad (backups) para compartir.

- **Android:** Ve a la sección [GitHub Releases](https://github.com/MatiasBalbontin/grit/releases) para descargar el archivo APK pre-compilado e instálalo (sideload).
- **iPhone:** Apple no permite instalar aplicaciones fuera de la App Store, por lo que no hay descarga de iOS. Puedes auto-alojar el proyecto (self-host) y agregarlo a tu pantalla de inicio desde Safari (funciona como una PWA completa).

## ¿Cómo funciona?

```
┌──────────────┐       ┌──────────────────────────────┐
│  Tu teléfono │─HTTPS─▶│  web  (nginx)               │
│   / laptop   │       │   ├─ sirve la app frontend   │
└──────────────┘       │   └─ redirige /api ─────────┐│
                       └─────────────────────────────┘│
                                                      ▼
                                       ┌──────────────────────────┐
                                       │  api (Node + WebAuthn)   │
                                       │   └─ ./data (archivos JSON)
                                       └──────────────────────────┘
```

## Tus datos

Se guardan localmente en la carpeta `./data` en tu servidor: `db.json` (perfiles + passkeys públicos), `state-<usuario>.json` (el plan de cada usuario, entrenamientos, peso corporal, ajustes), y `secret` (la clave de la cookie de sesión). **Haz una copia de seguridad de la carpeta `./data` y habrás respaldado absolutamente todo.** Las claves privadas de los Passkeys nunca tocan el servidor — se mantienen de forma segura en el hardware de tu teléfono o en tu gestor de contraseñas.

## Configuración

Todo se gestiona mediante el archivo `.env` (mira el ejemplo `.env.example`):

| Variable      | Descripción                                          | Por defecto             |
|---------------|------------------------------------------------------|-------------------------|
| `RP_ID`       | Hostname al que están atados los passkeys            | `localhost`             |
| `ORIGIN`      | URL completa desde donde se sirve la app             | `http://localhost:8080` |
| `WEB_PORT`    | Puerto de host para la interfaz web                  | `8080`                  |
| `RP_NAME`     | Nombre mostrado en la solicitud de Passkey           | `Grit`                  |
| `ADMIN_UIDS`  | IDs de usuarios con panel de administrador (separados por comas) | *(ninguno)*  |
| `INVITE_ONLY` | Requiere un código de invitación para crear un perfil | *(apagado)*           |


## Licencia

[GNU AGPL v3.0](LICENSE) — software libre y de código abierto. Puedes auto-alojarlo, usarlo, modificarlo y compartirlo; sin embargo, si ejecutas una versión modificada como un servicio de red, estás obligado a ofrecer el código fuente de tu versión bajo esta misma licencia. Nadie puede convertir a Grit en un producto cerrado y propietario.

Las imágenes y GIFs de los ejercicios provienen de un dataset externo y mantienen sus propios términos — revisa [NOTICE.md](NOTICE.md) para conocer los detalles completos sobre este fork y la herencia de la licencia AGPL.
