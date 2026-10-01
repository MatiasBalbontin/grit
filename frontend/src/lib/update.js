import { t } from './i18n.js'

export async function checkUpdate() {
  try {
    const res = await fetch('https://api.github.com/repos/MatiasBalbontin/grit/commits/main')
    if (!res.ok) return { error: t('No se pudo buscar actualizaciones.') }
    const data = await res.json()
    
    const current = typeof __COMMIT_HASH__ !== 'undefined' ? __COMMIT_HASH__ : 'unknown'
    const latest = data.sha ? data.sha.substring(0, 7) : 'unknown'
    
    if (current !== 'unknown' && latest !== 'unknown' && current !== latest) {
      return { 
        updateAvailable: true, 
        version: latest, 
        notes: `Nuevo commit detectado: ${data.commit.message}`, 
        downloadUrl: '/GRIT.apk' 
      }
    }
    return { updateAvailable: false }
  } catch (e) {
    return { error: t('Error de conexión al buscar actualizaciones.') }
  }
}
