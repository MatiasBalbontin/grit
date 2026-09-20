import { t } from './i18n.js'

export async function checkUpdate() {
  try {
    const res = await fetch('https://api.github.com/repos/MatiasBalbontin/grit/releases/latest')
    if (!res.ok) return { error: t('No se pudo buscar actualizaciones.') }
    const data = await res.json()
    // Compare tag_name with __APP_VERSION__
    // Note: __APP_VERSION__ should be defined by Vite
    const current = typeof __APP_VERSION__ !== 'undefined' ? __APP_VERSION__ : '0.0.0'
    const latest = data.tag_name ? data.tag_name.replace('v', '') : '0.0.0'
    
    // Very simple semantic version comparison (only handles major.minor.patch)
    const curParts = current.split('.').map(Number)
    const latParts = latest.split('.').map(Number)
    
    let isNewer = false
    for (let i = 0; i < 3; i++) {
      const c = curParts[i] || 0
      const l = latParts[i] || 0
      if (l > c) { isNewer = true; break }
      if (l < c) break
    }

    if (isNewer) {
      const apkAsset = data.assets && data.assets.find(a => a.name.endsWith('.apk'))
      return { 
        updateAvailable: true, 
        version: data.tag_name, 
        notes: data.body, 
        downloadUrl: apkAsset ? apkAsset.browser_download_url : data.html_url 
      }
    }
    return { updateAvailable: false }
  } catch (e) {
    return { error: t('Error de conexión al buscar actualizaciones.') }
  }
}
