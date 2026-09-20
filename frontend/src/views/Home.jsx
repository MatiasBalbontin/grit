import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store/useStore.js'
import { effectiveRoutine, effectiveRoutineId, streakWeeks, lastBW, setsDoneActive, consistencyScore } from '../lib/history.js'
import { fmtNum, fmtDate, todayISO, isoOf, weekKey, DAYS } from '../lib/format.js'
import { t, dateLocale } from '../lib/i18n.js'
import { bwSheet, goalSheet, dayOverrideSheet, calendarSheet, startFlow, loadStarterPlan, bwDeltaColor, prManagerSheet } from '../sheets.jsx'
import LineChart from '../components/LineChart.jsx'
import Icon from '../components/Icon.jsx'
import { Button } from '../components/ui.jsx'
import { glyphOf } from '../lib/glyphs.js'
import { EXIDX } from '../lib/exercises.js'

function PRWidget({ S }) {
  const tracked = S.trackedPRExercises || []
  if (!tracked.length) return <div className="card tappable" style={{ cursor: 'pointer' }} onClick={prManagerSheet}>
    <div className="row" style={{ gap: 9 }}>
      <span className="lrow-i" style={{ color: '#f59e0b' }}><Icon name="trophy" /></span>
      <div>
        <div style={{ fontWeight: 600 }}>{t('Your records')}</div>
        <div className="muted small">{t('Pick exercises to track')}</div>
      </div>
    </div>
  </div>
  return <div className="card tappable" style={{ cursor: 'pointer' }} onClick={prManagerSheet}>
    <div className="row between" style={{ marginBottom: 10 }}>
      <div className="row" style={{ gap: 6 }}>
        <Icon name="trophy" style={{ color: '#f59e0b' }} />
        <h2 style={{ margin: 0 }}>{t('Your records')}</h2>
      </div>
      <span className="iconbtn"><Icon name="chevronRight" className="chev" /></span>
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {tracked.slice(0, 4).map(id => {
        const ex = EXIDX[id] || {}
        const pr = S.personalRecords[id]
        return <div key={id} className="row between">
          <span className="small capitalize" style={{ color: 'var(--fg)', flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{ex.n || id}</span>
          {pr
            ? <span className="small" style={{ color: '#f59e0b', fontWeight: 600, flexShrink: 0 }}>★ {fmtNum(pr.w)} {S.unit} × {pr.r}</span>
            : <span className="small muted">{t('No PR logged yet')}</span>}
        </div>
      })}
    </div>
  </div>
}

// Home = what to do now + a quick glance. Deep charts & history live in Stats.
export default function Home() {
  const nav = useNavigate()
  const S = useStore(s => s.S)
  const user = useStore(s => s.user)
  const [weekOffset, setWeekOffset] = useState(0)
  const [bwExpanded, setBwExpanded] = useState(false)

  const today = new Date()
  const routine = effectiveRoutine(S, todayISO())
  const todayOvr = S.dayPlan[todayISO()] !== undefined
  const bw = lastBW(S)
  const prevBW = S.bodyweight.length > 1 ? S.bodyweight[S.bodyweight.length - 2] : null
  const delta = bw && prevBW ? bw.w - prevBW.w : null
  const consistency = consistencyScore(S, 28)

  const monday = new Date(today); monday.setDate(today.getDate() - ((today.getDay() + 6) % 7) + weekOffset * 7)
  const doneDays = new Set(S.workouts.map(w => w.d))
  const strip = []
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday); d.setDate(monday.getDate() + i)
    const iso = isoOf(d)
    const eff = effectiveRoutineId(S, iso), ovr = S.dayPlan[iso] !== undefined, done = doneDays.has(iso)
    const dot = done ? ' done' : ovr && eff ? ' ovr' : eff ? ' plan' : ''
    strip.push(<div key={i} className={'wday' + (iso === todayISO() ? ' today' : '')} onClick={() => dayOverrideSheet(iso)}>
      <div className="lbl">{t(DAYS[d.getDay()])}</div><div className="num">{d.getDate()}</div><div className={'dot' + dot} /></div>)
  }
  const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6)
  const wkLabel = weekOffset === 0 ? t('This week') : `${monday.getDate()} ${monday.toLocaleDateString(dateLocale(), { month: 'short' })} – ${sunday.getDate()} ${sunday.toLocaleDateString(dateLocale(), { month: 'short' })}`

  const wThisWeek = S.workouts.filter(w => weekKey(w.d) === weekKey(todayISO())).length
  const plannedPerWeek = Object.keys(S.week).filter(k => S.week[k]).length
  const bwPoints = S.bodyweight.slice(-30).map(b => ({ t: b.t || new Date(b.d).getTime(), y: b.w, d: b.d }))

  // today's session shown right under the week strip
  const onToday = () => { if (S.active) nav('/workout'); else if (routine) startFlow(routine.id); else dayOverrideSheet(todayISO()) }

  return <div className="narrow">
    <div className="hdr">
      <div><h1>{user ? t('Hi {0}', user.name) : 'Grit'}</h1><div className="sub">{today.toLocaleDateString(dateLocale(), { weekday: 'long', day: 'numeric', month: 'long' })}</div></div>
      <button className="iconbtn" onClick={() => nav('/settings')} aria-label={t('Settings')}><Icon name="gear" /></button>
    </div>

    <div className="card">
      <div className="row between" style={{ marginBottom: 8 }}>
        <button className="iconbtn" style={{ width: 30, height: 30, fontSize: 15 }} onClick={() => setWeekOffset(w => w - 1)} aria-label="Previous week"><Icon name="chevronLeft" /></button>
        <div className="small muted" style={{ fontWeight: 500 }}>{wkLabel}</div>
        <button className="iconbtn" style={{ width: 30, height: 30, fontSize: 15 }} onClick={() => setWeekOffset(w => w + 1)} aria-label="Next week"><Icon name="chevronRight" /></button>
      </div>
      <div className="week">{strip}</div>
      <div className="today-row" onClick={onToday}>
        <div className="row" style={{ gap: 9, minWidth: 0 }}>
          <span className="lrow-i" style={{ background: S.active ? 'var(--orange)' : routine ? 'var(--acc)' : 'var(--surface-3)' }}>
            <Icon name={S.active ? 'timer' : routine ? glyphOf(routine.emoji) : 'moon'} />
          </span>
          <div style={{ minWidth: 0 }}>
            <div className="lbl2">{t('Today')}</div>
            <div className="ttl">{S.active ? t('{0} — in progress', S.active.name) : routine ? routine.name : t('Rest day')}{todayOvr && routine ? ' · ' + t('rescheduled') : ''}</div>
          </div>
        </div>
        {S.active ? <span className="tag" style={{ color: 'var(--orange)', background: 'color-mix(in srgb,var(--orange) 16%,transparent)' }}>{t('Resume')}</span>
          : routine ? <span className="tag acc">{t('Start')}</span>
          : <Icon name="plus" className="chev" />}
      </div>
    </div>

    {!S.routines.length && !S.active && (
      <div className="card">
        <div className="row" style={{ gap: 10, marginBottom: 6 }}>
          <span className="lrow-i"><Icon name="sparkles" /></span>
          <div className="big" style={{ fontSize: 22 }}>{t('Welcome!')}</div>
        </div>
        <div className="muted small" style={{ marginBottom: 12 }}>{t('Set up your weekly routine to get going — or load a ready-made Push / Pull / Legs plan.')}</div>
        <Button variant="primary" icon="sparkles" onClick={loadStarterPlan}>{t('Load starter plan (PPL)')}</Button>
        <div style={{ height: 8 }} /><Button onClick={() => nav('/plan')}>{t('Build my own plan')}</Button>
      </div>
    )}

    {/* Consistency card — primary metric */}
    <div className="card tappable" style={{ cursor: 'pointer' }} onClick={() => calendarSheet()}>
      <div className="row between">
        <div>
          <div className="row" style={{ gap: 7, fontSize: 22, fontWeight: 600, letterSpacing: '-.021em' }}>
            <Icon name="flame" style={{ color: 'var(--orange)' }} />
            {t('{0} week streak', streakWeeks(S))}
          </div>
          <div className="muted small" style={{ marginTop: 2 }}>
            {consistency.planned > 0
              ? t('{0}% consistency', consistency.pct) + ' · ' + t('{0} of {1} sessions', consistency.trained, consistency.planned)
              : `${wThisWeek}${plannedPerWeek ? ' / ' + plannedPerWeek : ''} ${t('this week')}`}
            {' · '}{t(S.workouts.length === 1 ? '{0} workout total' : '{0} workouts total', S.workouts.length)}
          </div>
        </div>
        <Icon name="calendar" className="chev" style={{ fontSize: 20 }} />
      </div>
    </div>

    {/* PR widget */}
    <PRWidget S={S} />

    {/* Body weight — secondary */}
    <div className="card">
      <div className="row between" style={{ marginBottom: bwExpanded ? 6 : 0 }}>
        <button className="row" style={{ gap: 7, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'inherit' }} onClick={() => setBwExpanded(v => !v)}>
          <h2 style={{ margin: 0 }}>{t('Body weight')}</h2>
          {bw && <span className="muted small">{fmtNum(bw.w)} {S.unit}</span>}
          {!!delta && <span className="small row" style={{ gap: 2, fontWeight: 500, color: bwDeltaColor(delta, bw.w) }}>
            <Icon name={delta > 0 ? 'arrowUp' : 'arrowDown'} style={{ fontSize: 11 }} />{fmtNum(Math.abs(delta))}
          </span>}
          <Icon name={bwExpanded ? 'chevronUp' : 'chevronDown'} style={{ fontSize: 13, opacity: 0.5 }} />
        </button>
        <div className="row" style={{ gap: 8 }}>
          <Button size="sm" icon="plus" onClick={() => bwSheet()}>{t('Log')}</Button>
        </div>
      </div>
      {bwExpanded && <>
        {bw ? <>
          <div className="row" style={{ gap: 8, alignItems: 'baseline' }}>
            <div className="big">{fmtNum(bw.w)} <span className="muted" style={{ fontSize: '1rem' }}>{S.unit}</span></div>
            <span className="dim small" style={{ marginLeft: 'auto' }}>{fmtDate(bw.d, true)}</span>
          </div>
          {S.targetW && (
            <div className="small row" style={{ color: 'var(--yellow)', marginTop: 4, gap: 5 }}>
              <Icon name="target" style={{ fontSize: 13 }} />
              <span>{t('Goal')} {fmtNum(S.targetW)} {S.unit} · {Math.abs(S.targetW - bw.w) < 0.05 ? t('reached!') : t(S.targetW > bw.w ? '{0} to gain' : '{0} to lose', fmtNum(Math.abs(S.targetW - bw.w)) + ' ' + S.unit)}</span>
            </div>
          )}
          <div className="chart" style={{ marginTop: 8 }}><LineChart points={bwPoints} h={110} unit={S.unit} goal={S.targetW} /></div>
        </> : <div className="muted small" style={{ marginTop: 6 }}>{t("No entries yet — log your weight to start the curve.")}</div>}
        <div style={{ height: 8 }} />
        <Button size="sm" icon="target" style={S.targetW ? { color: 'var(--yellow)' } : undefined} onClick={goalSheet}>{S.targetW ? fmtNum(S.targetW) + ' ' + S.unit : t('Goal')}</Button>
      </>}
    </div>
  </div>
}
