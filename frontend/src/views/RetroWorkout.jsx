import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore.js'
import { EXIDX } from '../lib/exercises.js'
import { fmtNum, todayISO, uid } from '../lib/format.js'
import { bestWeightFor, workoutVolume, setLabel } from '../lib/history.js'
import { t } from '../lib/i18n.js'
import { exercisePicker } from '../sheets.jsx'
import { useUI } from '../store/useUI.js'
import Icon from '../components/Icon.jsx'
import { Button } from '../components/ui.jsx'

const update = (...a) => useStore.getState().update(...a)

export default function RetroWorkout() {
  const nav = useNavigate()
  const st = useStore(s => s.S)
  const [exCount_, setExCount] = useState(3)
  const [step, setStep] = useState(0)
  const [exercises, setExercises] = useState([])

  const addSet = idx => setExercises(prev => prev.map((e, i) => i === idx
    ? { ...e, sets: [...e.sets, { w: e.sets[e.sets.length - 1]?.w || 0, r: e.sets[e.sets.length - 1]?.r || 0, done: true }] }
    : e))

  const setSetField = (idx, si, field, v) => setExercises(prev => prev.map((e, i) => {
    if (i !== idx) return e
    const sets = e.sets.map((s, j) => j === si ? { ...s, [field]: v } : s)
    return { ...e, sets }
  }))

  const tagSet = (idx, si) => setExercises(prev => prev.map((e, i) => {
    if (i !== idx) return e
    const sets = e.sets.map((s, j) => {
      if (j !== si) return s
      if (!s.type && !s.pr) return { ...s, type: 'drop', drops: [{ w: s.w || 0, r: s.r || 0 }, { w: Math.max(0, (s.w || 0) - 5), r: s.r || 0 }] }
      if (s.type === 'drop') { const { type: _, drops: __, ...rest } = s; return { ...rest, pr: true } }
      const { pr: _, ...rest } = s; return rest
    })
    return { ...e, sets }
  }))

  const save = () => {
    const now = Date.now()
    const entries = exercises.map(e => ({ id: e.id, sets: e.sets, topW: null, target: { id: e.id, mode: 'reps', sets: e.sets.length, reps: e.sets[0]?.r || 0, weight: e.sets[0]?.w || 0 } }))
      .filter(e => e.sets.length)
    const w = { id: uid(), d: todayISO(), start: now, end: now, routineId: null, name: t('Freestyle'), bw: null, entries, prs: [], retroactive: true }
    w.vol = workoutVolume(w)
    update(s => {
      entries.forEach(e => {
        e.sets.forEach(set => {
          if (set.pr && set.w > 0) {
            const cur = s.personalRecords[e.id]
            if (!cur || set.w > cur.w || (set.w === cur.w && set.r > cur.r)) {
              s.personalRecords[e.id] = { w: set.w, r: set.r, d: todayISO() }
            }
          }
        })
        const mx = Math.max(0, ...e.sets.filter(x => x.done).map(x => x.w || 0))
        if (mx > 0) { const cur = s.exWeights[e.id]; if (!cur || mx > cur.w) s.exWeights[e.id] = { w: mx, d: todayISO() } }
        if (e.sets.some(x => x.w > 0 && bestWeightFor(s, e.id) < mx)) w.prs.push(e.id)
      })
      s.workouts.push(w)
    })
    useUI.getState().toast(t('Workout saved'))
    nav('/history')
  }

  if (step === 0) return (
    <div className="narrow">
      <div className="hdr">
        <button className="iconbtn" onClick={() => nav(-1)} aria-label={t('Back')}><Icon name="chevronLeft" /></button>
        <h1>{t('Log a finished workout')}</h1>
      </div>
      <div className="card">
        <div className="muted small" style={{ marginBottom: 16 }}>{t('How many exercises did you do?')}</div>
        <div className="row" style={{ justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <button className="bw-pm" onClick={() => setExCount(c => Math.max(1, c - 1))}><Icon name="minus" /></button>
          <span style={{ fontSize: 32, fontWeight: 700, minWidth: 40, textAlign: 'center' }}>{exCount_}</span>
          <button className="bw-pm" onClick={() => setExCount(c => Math.min(20, c + 1))}><Icon name="plus" /></button>
        </div>
        <Button variant="primary" onClick={() => {
          setExercises(Array.from({ length: exCount_ }, () => ({ id: null, sets: [{ w: 0, r: 10, done: true }] })))
          setStep(1)
        }}>{t('Next')}</Button>
      </div>
    </div>
  )

  const exIdx = step - 1
  const ex = exercises[exIdx]
  const exInfo = ex?.id ? (EXIDX[ex.id] || {}) : null

  return (
    <div className="narrow">
      <div className="hdr">
        <button className="iconbtn" onClick={() => step > 1 ? setStep(s => s - 1) : setStep(0)} aria-label={t('Back')}><Icon name="chevronLeft" /></button>
        <h1>{t('Exercise {0} of {1}', step, exCount_)}</h1>
      </div>

      <div className="card">
        {!exInfo
          ? <Button icon="plus" onClick={() => exercisePicker(picked => {
              setExercises(prev => prev.map((e, i) => i === exIdx ? { ...e, id: picked.id } : e))
            })}>{t('Pick exercise')}</Button>
          : <div className="row between" style={{ marginBottom: 12 }}>
              <span style={{ fontWeight: 600, textTransform: 'capitalize' }}>{exInfo.n}</span>
              <button className="iconbtn" onClick={() => exercisePicker(picked => {
                setExercises(prev => prev.map((e, i) => i === exIdx ? { ...e, id: picked.id } : e))
              })}><Icon name="shuffle" /></button>
            </div>}

        {exInfo && <>
          <div className="sethead"><span className="n-sp" /><span className="w-sp">{t('Weight ({0})', st.unit)}</span><span className="r-sp">{t('Reps')}</span><span className="ck-sp" /></div>
          {ex.sets.map((s, si) => {
            const isDrop = s.type === 'drop'
            const tagLabel = isDrop ? 'D' : s.pr ? '★' : '·'
            const tagStyle = isDrop ? { color: 'var(--acc)', fontWeight: 700 } : s.pr ? { color: '#f59e0b', fontWeight: 700 } : { opacity: 0.3 }
            return <div key={si} className="setrow">
              <div className="n">{si + 1}</div>
              {!isDrop && <div className="stp w">
                <button onClick={() => setSetField(exIdx, si, 'w', Math.max(0, Math.round(((s.w || 0) - 2.5) * 100) / 100))}><Icon name="minus" /></button>
                <span className="val"><input type="number" value={s.w ?? ''} onChange={e => setSetField(exIdx, si, 'w', parseFloat(e.target.value) || 0)} style={{ width: 48, textAlign: 'center', background: 'transparent', border: 'none', color: 'inherit', fontSize: 'inherit' }} /></span>
                <button onClick={() => setSetField(exIdx, si, 'w', Math.round(((s.w || 0) + 2.5) * 100) / 100)}><Icon name="plus" /></button>
              </div>}
              {!isDrop && <div className="stp r">
                <button onClick={() => setSetField(exIdx, si, 'r', Math.max(0, (s.r || 0) - 1))}><Icon name="minus" /></button>
                <span className="val"><input type="number" value={s.r ?? ''} onChange={e => setSetField(exIdx, si, 'r', parseInt(e.target.value) || 0)} style={{ width: 40, textAlign: 'center', background: 'transparent', border: 'none', color: 'inherit', fontSize: 'inherit' }} /></span>
                <button onClick={() => setSetField(exIdx, si, 'r', (s.r || 0) + 1)}><Icon name="plus" /></button>
              </div>}
              {isDrop && <div style={{ flex: 1, fontSize: 12, color: 'var(--muted)', padding: '0 4px' }}>{(s.drops || []).map(d => `${d.w}×${d.r}`).join(' → ')}</div>}
              <button className="iconbtn" style={{ ...tagStyle, fontSize: 14, minWidth: 24 }} onClick={() => tagSet(exIdx, si)}>{tagLabel}</button>
            </div>
          })}
          <div style={{ height: 8 }} />
          <Button size="sm" icon="plus" onClick={() => addSet(exIdx)}>{t('Add set')}</Button>
        </>}
      </div>

      {exInfo && <div className="row" style={{ gap: 8, padding: '0 0 24px' }}>
        {step < exCount_ && <Button trailingIcon="chevronRight" onClick={() => setStep(s => s + 1)}>{t('Next')}</Button>}
        {step === exCount_ && <Button variant="primary" onClick={save}>{t('Done — save workout')}</Button>}
      </div>}
    </div>
  )
}
