import { useUI } from '../store/useUI.js'
import { useStore } from '../store/useStore.js'
import Icon from './Icon.jsx'
import { fmtNum } from '../lib/format.js'

export default function CelebrationSignal() {
  const signal = useUI(s => s.signal)
  const S = useStore(s => s.S)

  if (!signal) return null

  const { type, data } = signal

  if (type === 'setPR') {
    return (
      <div className="celebration pr-pop">
        <div className="pop-burst">
          <Icon name="star" />
        </div>
        <div className="pop-text">
          <div className="pop-label">New PR!</div>
          <div className="pop-value">{fmtNum(data.weight)} {S.unit} × {data.reps}</div>
        </div>
      </div>
    )
  }

  if (type === 'setComplete') {
    return (
      <div className="celebration set-pop">
        <div className="pop-burst">
          <Icon name="check" />
        </div>
        <div className="pop-text">Set {data.setNum} done!</div>
      </div>
    )
  }

  if (type === 'workoutComplete') {
    return (
      <div className="celebration workout-complete">
        <div className="confetti-burst">
          <span>✨</span><span>🔥</span><span>✨</span>
        </div>
        <div className="pop-text">
          <div className="pop-label">Workout complete!</div>
          <div className="pop-subtitle">
            {data.streak && `${data.streak} week streak 🔥`}
          </div>
        </div>
      </div>
    )
  }

  if (type === 'streakMilestone') {
    return (
      <div className="celebration streak-milestone">
        <div className="pop-burst">
          <Icon name="flame" />
        </div>
        <div className="pop-text">
          <div className="pop-label">{data.weeks} week streak!</div>
          <div className="pop-subtitle">Keep it going 🔥</div>
        </div>
      </div>
    )
  }

  if (type === 'weightGoal') {
    return (
      <div className="celebration goal-reached">
        <div className="pop-burst">
          <Icon name="target" />
        </div>
        <div className="pop-text">
          <div className="pop-label">Goal reached! 🎯</div>
          <div className="pop-value">{fmtNum(data.weight)} {S.unit}</div>
        </div>
      </div>
    )
  }

  return null
}
