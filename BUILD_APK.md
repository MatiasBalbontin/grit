# Generar APK de openGym (Android)

> **APK listo:** `openGym-1.3.0.apk` (4.3 MB) en la raíz del repo.  
> Release firmado con keystore propio — instala en cualquier Android 6.0+ sin restricciones de debug.

---

## Archivos de firma (NO commitear)

| Archivo | Descripción |
|---|---|
| `opengym-release.keystore` | Certificado de firma — guardalo en lugar seguro |
| `keystore.properties` | Contraseña del keystore — nunca al repo |

Ambos ya están en `.gitignore`.

> **Importante:** Si perdés el keystore, la próxima versión no puede actualizarse sobre la instalada — el teléfono pide desinstalar primero.

---

## Requisitos

| Herramienta | Versión | Dónde |
|---|---|---|
| Node.js | 18+ | [nodejs.org](https://nodejs.org) |
| **Java JDK 21** | Exactamente 21 (no el JBR de Android Studio — es Java 25 e incompatible con Gradle 8) | [oracle.com/java/technologies/downloads/#java21](https://www.oracle.com/java/technologies/downloads/#java21) |
| Android Studio | Cualquiera reciente | [developer.android.com/studio](https://developer.android.com/studio) |

**Variables de entorno necesarias** (configurar una sola vez):
```powershell
# Ejecutar en PowerShell como Admin, luego reiniciar la terminal
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME", "C:\Users\matia\AppData\Local\Android\Sdk", "User")
[System.Environment]::SetEnvironmentVariable("JAVA_HOME",    "C:\Program Files\Java\jdk-21",              "User")
```

---

## Proceso para generar un APK nuevo

### Paso 1 — Build web

```powershell
cd frontend

$env:VITE_MOBILE   = "1"
$env:VITE_IMG_BASE = "https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/images/"
$env:VITE_GIF_BASE = "https://cdn.jsdelivr.net/gh/hasaneyldrm/exercises-dataset@main/videos/"

npm install
npm run build
npx cap sync android
```

### Paso 2 — Compilar APK

```powershell
$env:JAVA_HOME = "C:\Program Files\Java\jdk-21"
$env:PATH      = "$env:JAVA_HOME\bin;" + $env:PATH

cd android
.\gradlew.bat assembleRelease
```

APK generado en:
```
android/app/build/outputs/apk/release/app-release.apk
```

### Paso 3 — Copiar con nombre de versión

```powershell
Copy-Item app\build\outputs\apk\release\app-release.apk ..\..\openGym-1.3.0.apk -Force
```

### Paso 4 — Subir al hosting

Opciones más simples:
- **GitHub Releases** → crear release en el repo → subir el `.apk` como asset → enlace directo
- Cualquier hosting estático (Netlify, Vercel, Render) con el archivo `.apk`

---

## Instalar en el teléfono

### Desde la web (flujo del usuario final)
1. Abrir el enlace en el navegador del teléfono
2. Descargar el `.apk`
3. Tocar el archivo descargado → aceptar "Instalar aplicaciones de origen desconocido" (solo la primera vez, para Chrome o el gestor de archivos)

### Por cable USB (desarrollo)
```powershell
adb install openGym-1.3.0.apk
# Para actualizar sobre versión existente:
adb install -r openGym-1.3.0.apk
```

---

## Actualizaciones futuras

1. Editar `frontend/android/app/build.gradle`:
   ```gradle
   versionCode 7        # siempre mayor que el anterior
   versionName "1.4.0"
   ```
2. Repetir Pasos 1–3 usando el **mismo** `opengym-release.keystore`.

| Versión | versionCode | Fecha |
|---|---|---|
| 1.3.0 | 6 | 2026-09-17 |

---

## Solución de problemas

| Error | Causa | Fix |
|---|---|---|
| `Unsupported class file major version 69` | JAVA_HOME apunta al JBR de Android Studio (Java 25) | Fijar `JAVA_HOME` al JDK 21 del sistema |
| `path may not be null` al compilar release | `keystore.properties` no encontrado o tiene BOM | Verificar que el archivo existe en la raíz del repo y no tiene BOM |
| `INSTALL_FAILED_VERSION_DOWNGRADE` | versionCode menor al instalado | Incrementar versionCode |
| `INSTALL_FAILED_UPDATE_INCOMPATIBLE` | Keystore diferente al de la versión instalada | Desinstalar la app primero |
| `sdk.dir` not found | ANDROID_HOME no configurado | Crear `android/local.properties` con `sdk.dir=C\:\\Users\\matia\\AppData\\Local\\Android\\Sdk` |
