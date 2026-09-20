import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useStore } from '../store/useStore.js'
import { exOr } from '../lib/exercises.js'
import { uid, fmtNum } from '../lib/format.js'
import { t } from '../lib/i18n.js'
import { supersetUnits, cleanupSg, exLine, modeOf, isPerSide, resolveSetWeight, resolveSetReps } from '../lib/history.js'
import { Thumb } from '../components/Media.jsx'
import { glyphPicker, exercisePicker, exConfigSheet, confirmSheet } from '../sheets.jsx'
import Icon from '../components/Icon.jsx'
import { glyphOf } from '../lib/glyphs.js'
import { Button, SelectRow, Stepper, Switch, Row } from '../components/ui.jsx'
import { POLICIES_FOR, POLICY_NAME, POLICY_DESC } from '../lib/progression.js'
import BodyMap from '../components/BodyMap.jsx'
import { loadOfRoutine, rankOf, MUSCLE_NAME } from '../lib/muscles.js'

export default function RoutineEdit() {
  const nav = useNavigate()
  const { id } = useParams()
  const S = useStore(s => s.S)
  const update = useStore(s => s.update)
  const r = S.routines.find(x => x.id === id)
  useEffect(() => { if (!r) nav('/plan') }, [!!r])
  if (!r) return null

  const [open, setOpen] = useState(-1)
  const edit = fn => update(s => { fn(s.routines.find(x => x.id === id).ex) })
  const move = (i, dir) => edit(ex => { const j = i + dir; if (j < 0 || j >= ex.length) return;[ex[i], ex[j]] = [ex[j], ex[i]]; cleanupSg(ex) })
  const toggleLink = i => edit(ex => {
    if (i < 1) return
    const cur = ex[i], prev = ex[i - 1]
    if (cur.sg && prev.sg && cur.sg === prev.sg) delete cur.sg
    else { const gid = prev.sg || ('sg' + uid()); prev.sg = gid; cur.sg = gid }
    cleanupSg(ex)
  })

  const units = supersetUnits(r.ex)
  const unitFirst = new Set(units.filter(u => u.length > 1).map(u => u[0]))
  const inSS = new Set(units.filter(u => u.length > 1).flat())

  return <div className="narrow">
    <div className="hdr">
      <button className="iconbtn" onClick={() => nav('/plan')} aria-label={t('Plan')}><Icon name="chevronLeft" /></button>
      <div style={{ flex: 1, margin: '0 12px' }}>
        <input className="input" defaultValue={r.name} style={{ fontWeight: 600, fontSize: 20, letterSpacing: '-.021em' }}
          onChange={e => update(s => { s.routines.find(x => x.id === id).name = e.target.value.trim() || t('Routine') })} />
      </div>
      <button className="iconbtn" aria-label={t('Pick an icon')} onClick={() => glyphPicker(r.emoji, g => update(s => { s.routines.find(x => x.id === id).emoji = g }))}><Icon name={glyphOf(r.emoji)} /></button>
    </div>

    <div className="sect-b" style={{ marginBottom: 16 }}>
      <SelectRow icon="chartLine" title={t('Progression')} sheetTitle={t('Progression')}
        value={r.prog || 'linear'} onChange={v => update(s => { s.routines.find(x => x.id === id).prog = v })}
        options={POLICIES_FOR.reps.map(p => ({ value: p, label: t(POLICY_NAME[p]), subtitle: t(POLICY_DESC[p]) }))} />
    </div>
    <div className="small dim" style={{ margin: '-10px 2px 16px' }}>
      {t('Applies to every exercise in this routine that does not set its own rule.')}
    </div>

    {r.ex.length ? <div className="list">{r.ex.map((e, i) => {
      // An unresolvable id is shown rather than skipped — hiding it left an entry you
      // could neither see nor delete, but that still turned up in the workout.
      const ex = exOr(e.id)
      const linkedPrev = i > 0 && e.sg && r.ex[i - 1].sg === e.sg
      // Easy mode expands a simple inline editor for reps exercises; cardio/timed still use the
      // full sheet (their fields don't fit the simple row).
      const easy = S.easyMode && modeOf({ ...e, id: e.id }) === 'reps'
      const onItem = () => {
        if (easy) { setOpen(open === i ? -1 : i); return }
        exConfigSheet(ex, e, cfg => edit(x => { x[i] = { id: x[i].id, sg: x[i].sg, ...cfg } }), () => edit(x => { x.splice(i, 1); cleanupSg(x) }), r)
      }
      return <div key={i}>
        {unitFirst.has(i) && <div className="ss-label"><Icon name="link" />{t('Superset')}</div>}
        <div className={'item' + (inSS.has(i) ? ' in-ss' : '')} onClick={onItem}>
          <Thumb ex={ex} />
          <div className="grow"><div className="tt capitalize">{ex.n}</div><div className="ss">{exLine(e, S.unit)}</div></div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2, flex: 'none', alignItems: 'center' }}>
            {i > 0 && <button className={'iconbtn' + (linkedPrev ? ' on-ss' : '')} title={t('Superset with exercise above')} style={{ width: 32, height: 28, borderRadius: 8, fontSize: 15 }} onClick={ev => { ev.stopPropagation(); toggleLink(i) }}><Icon name="link" /></button>}
            <div style={{ display: 'flex', gap: 2 }}>
              <button className="iconbtn" aria-label="Move up" style={{ width: 28, height: 24, borderRadius: 7, fontSize: 12 }} onClick={ev => { ev.stopPropagation(); move(i, -1) }}><Icon name="chevronUp" /></button>
              <button className="iconbtn" aria-label="Move down" style={{ width: 28, height: 24, borderRadius: 7, fontSize: 12 }} onClick={ev => { ev.stopPropagation(); move(i, 1) }}><Icon name="chevronDown" /></button>
            </div>
            {easy && <Icon name={open === i ? 'chevronUp' : 'chevronDown'} className="chev" />}
          </div>
        </div>
        {easy && open === i && <EasyExRow e={e} i={i} unit={S.unit} edit={edit}
          onRemove={() => { edit(x => { x.splice(i, 1); cleanupSg(x) }); setOpen(-1) }} />}
      </div>
    })}</div> : <div className="empty"><div className="ico"><Icon name="dumbbell" /></div>{t('No exercises yet — add your first one.')}</div>}

    {/* Coverage of the routine as planned, so a gap shows up while you're building it
        rather than after a month of training around it. */}
    {r.ex.length > 0 && (() => {
      const load = loadOfRoutine(r)
      const { worked } = rankOf(load)
      return <div className="card" style={{ marginTop: 12 }}>
        <h2>{t('What this session hits')}</h2>
        <BodyMap load={load} body={S.body} />
        <div className="mchips">
          {worked.slice(0, 6).map(m => <span key={m} className="mchip">{t(MUSCLE_NAME[m])}</span>)}
        </div>
      </div>
    })()}

    <div className="small dim row" style={{ margin: '10px 2px', gap: 5 }}><Icon name="link" style={{ fontSize: 13 }} />{t('Tap the link button on an exercise to superset it with the one above — you’ll do them back-to-back.')}</div>
    <Button variant="primary" onClick={() => exercisePicker(ex => exConfigSheet(ex, null, cfg => edit(x => { x.push({ id: ex.id, ...cfg }) }), null, r))} icon="plus">{t('Add exercise')}</Button>
    <div style={{ height: 10 }} />
    <Button variant="danger" onClick={() => confirmSheet({
      title: t('Delete routine?'), message: t('“{0}” and its exercises will be removed.', r.name), confirmText: t('Delete'), danger: true,
      onConfirm: () => {
        update(s => {
          s.routines = s.routines.filter(x => x.id !== id)
          Object.keys(s.week).forEach(k => { if (s.week[k] === id) delete s.week[k] })
          Object.keys(s.dayPlan).forEach(k => { if (s.dayPlan[k] === id) delete s.dayPlan[k] })
        })
        nav('/plan')
      }
    })}>{t('Delete routine')}</Button>
  </div>
}

/* ---------- easy-mode inline editor: sets, reps, unilateral, weight, optional per-set weights ---------- */
function EasyExRow({ e, i, unit, edit, onRemove }) {
  const perSide = isPerSide(e)
  const hasSeries = Array.isArray(e.series) && e.series.length > 0
  const sets = Math.max(1, e.sets || 1)
  const patch = fn => edit(ex => fn(ex[i]))

  const setSets = v => patch(c => {
    const n = Math.max(1, Math.round(v) || 1)
    c.sets = n
    // Keep per-set rows in step with the set count, seeding new rows from the last one.
    if (Array.isArray(c.series)) {
      const seed = c.series[c.series.length - 1] || { w: c.weight || 0, r: c.reps }
      while (c.series.length < n) c.series.push({ ...seed })
      c.series.length = n
    }
  })
  const setReps = v => patch(c => { let n = Math.max(1, Math.round(v) || 1); c.reps = perSide ? Math.ceil(n / 2) * 2 : n })
  const setWeight = v => patch(c => { c.weight = Math.max(0, v || 0) })
  // Unilateral rounds the total up to an even number so each side gets a whole rep.
  const toggleSide = on => patch(c => { if (on) { c.side = true; c.reps = Math.ceil((c.reps || 0) / 2) * 2 } else delete c.side })
  const togglePerSeries = on => patch(c => {
    if (on) c.series = Array.from({ length: Math.max(1, c.sets || 1) }, () => ({ w: c.weight || 0, r: c.reps }))
    else delete c.series
  })
  const setSeriesField = (k, field, v) => patch(c => {
    if (!Array.isArray(c.series)) return
    const clean = field === 'w' ? Math.max(0, v || 0) : Math.max(1, Math.round(v) || 1)
    c.series[k] = { ...c.series[k], [field]: clean }
  })

  return <div className="card" style={{ marginTop: 6, marginBottom: 8 }}>
    <div className="row cfgrow" style={{ marginBottom: 12 }}>
      <Stepper label={t('Sets')} value={sets} step={1} decimal={false} onChange={setSets} />
      <Stepper label={t('Reps')} value={e.reps || 0} step={perSide ? 2 : 1} decimal={false} onChange={setReps} />
      {!hasSeries && <Stepper label={t('Weight ({0})', unit)} value={e.weight || 0} step={2.5} onChange={setWeight} />}
    </div>
    <Row icon="shuffle" iconTint="var(--blue)" title={t('Unilateral (per side)')}
      subtitle={perSide ? t('You still log the total: {0} is {1} per side.', e.reps || 0, fmtNum((e.reps || 0) / 2)) : null}>
      <Switch checked={perSide} onChange={toggleSide} />
    </Row>
    <Row icon="scale" iconTint="var(--teal)" title={t('Weight per set')}
      subtitle={t('A different weight for each set instead of one for all.')}>
      <Switch checked={hasSeries} onChange={togglePerSeries} />
    </Row>
    {hasSeries && <div style={{ marginTop: 10 }}>
      {e.series.map((s, k) => <div key={k} className="row cfgrow" style={{ marginBottom: 6, alignItems: 'flex-end' }}>
        <span className="small dim" style={{ minWidth: 52, paddingBottom: 10 }}>{t('Set {0}', k + 1)}</span>
        <Stepper label={t('Weight ({0})', unit)} value={resolveSetWeight(s, e)} step={2.5} onChange={v => setSeriesField(k, 'w', v)} />
        <Stepper label={t('Reps')} value={resolveSetReps(s, e)} step={perSide ? 2 : 1} decimal={false} onChange={v => setSeriesField(k, 'r', v)} />
      </div>)}
    </div>}
    <div style={{ height: 10 }} />
    <Button size="sm" variant="danger" icon="trash" onClick={onRemove}>{t('Remove from routine')}</Button>
  </div>
}
