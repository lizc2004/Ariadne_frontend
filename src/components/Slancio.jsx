import { useState, useEffect } from 'react'
import { getSessioniInIntervallo } from '../api/sessioni'
import { calcolaSlancio, badgeRaggiunti, settimanaCorrente } from '../utils/slancio'
import Logo from './Logo'

function formatLocalDateTime(date) {
  const pad = (n) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
}

const ETICHETTE = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

function Slancio() {
  const [slancio, setSlancio] = useState(0)
  const [badge, setBadge] = useState([])
  const [settimana, setSettimana] = useState([])

  useEffect(() => {
    carica()
  }, [])

  async function carica() {
    const a = new Date()
    const da = new Date()
    da.setDate(da.getDate() - 40)
    try {
      const sessioni = await getSessioniInIntervallo(formatLocalDateTime(da), formatLocalDateTime(a))
      setSlancio(calcolaSlancio(sessioni))
      setBadge(badgeRaggiunti(calcolaSlancio(sessioni)))
      setSettimana(settimanaCorrente(sessioni))
    } catch {
      // se fallisce, non mostriamo nulla: niente errori colpevolizzanti su una feature decorativa
    }
  }

  if (settimana.length === 0) return null

  return (
    <div className="card slancio-card" style={{ margin: '20px' }}>
      <h3>Slancio</h3>
      {slancio > 0 && <p className="slancio-numero">{slancio} {slancio === 1 ? 'giorno' : 'giorni'} di studio di fila 🔥</p>}

      <div className="row" style={{ justifyContent: 'center', gap: '14px' }}>
        {settimana.map((g, i) => (
          <div key={i} style={{ textAlign: 'center', flex: '0 0 auto' }}>
            <Logo size={38} className={g.studiato ? '' : 'logo-spento'} />
            <div className="small muted">{ETICHETTE[i]}</div>
          </div>
        ))}
      </div>

      {badge.length > 0 && (
        <div className="row mt-m">
          {badge.map((soglia) => (
            <span key={soglia} className="tag ok">{soglia} giorni</span>
          ))}
        </div>
      )}
    </div>
  )
}

export default Slancio