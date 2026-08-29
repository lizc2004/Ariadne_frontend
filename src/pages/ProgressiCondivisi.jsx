import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getProgressi } from '../api/condivisioni'
import { calcolaSlancio, settimanaCorrente, badgeRaggiunti } from '../utils/slancio'
import Logo from '../components/Logo'

const ETICHETTE = ['Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab', 'Dom']

function ProgressiCondivisi() {
  const { id } = useParams()
  const [dati, setDati] = useState(null)
  const [errore, setErrore] = useState('')

  useEffect(() => {
    carica()
  }, [id])

  async function carica() {
    try {
      const risposta = await getProgressi(id)
      setDati(risposta)
    } catch (err) {
      setErrore(err.message)
    }
  }

  if (errore) {
    return (
      <div className="card" style={{ margin: '20px' }}>
        <div className="login-message error">{errore}</div>
        <Link to="/condivisione">← Torna alla condivisione</Link>
      </div>
    )
  }

  if (!dati) return null

  const slancio = calcolaSlancio(dati.sessioni)
  const settimana = settimanaCorrente(dati.sessioni)
  const badge = badgeRaggiunti(slancio)

  return (
    <div>
      <Link to="/condivisione" style={{ margin: '20px', display: 'inline-block' }}>← Torna alla condivisione</Link>

      <div className="card slancio-card" style={{ margin: '20px' }}>
        <h3>Slancio</h3>
        {slancio > 0 && (
          <p><span className="slancio-numero">{slancio}</span> {slancio === 1 ? 'giorno' : 'giorni'} di studio di fila 🔥</p>
        )}
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

      <div className="card" style={{ margin: '20px' }}>
        <h3>Task in scadenza</h3>
        {dati.taskInScadenza.length === 0 ? (
          <p className="muted">Nessuna task in scadenza. 🎉</p>
        ) : (
          <div className="stack">
            {dati.taskInScadenza.map((t) => (
              <div key={t.id} className="task">
                <div className="task-body">
                  <div className="task-title">{t.titolo}</div>
                  <div className="task-meta">{t.materia} · {t.scadenza}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="card" style={{ margin: '20px' }}>
        <h3>Carte da ripassare</h3>
        {dati.carteDaRipassare === 0 ? (
          <p className="muted">Nessuna carta da ripassare oggi. 🎉</p>
        ) : (
          <p>{dati.carteDaRipassare} {dati.carteDaRipassare === 1 ? 'carta' : 'carte'} pronte per il ripasso.</p>
        )}
      </div>
    </div>
  )
}

export default ProgressiCondivisi