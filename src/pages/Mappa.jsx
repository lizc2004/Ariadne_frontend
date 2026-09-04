import { useState } from 'react'
import mermaid from 'mermaid'
import { generaMappa } from '../api/mappe'

mermaid.initialize({ startOnLoad: false, theme: 'neutral' })

function Mappa() {
  const [testo, setTesto] = useState('')
  const [svg, setSvg] = useState('')
  const [contenutoMermaid, setContenutoMermaid] = useState('')
  const [errore, setErrore] = useState('')
  const [caricando, setCaricando] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setErrore('')
    setSvg('')
    setCaricando(true)
    try {
      const mappa = await generaMappa(testo)
      setContenutoMermaid(mappa.contenutoMermaid)
      const { svg: svgGenerato } = await mermaid.render('mappa-svg', mappa.contenutoMermaid)
      setSvg(svgGenerato)
    } catch (err) {
      setErrore(err.message)
    } finally {
      setCaricando(false)
    }
  }

  return (
    <div className="card" style={{ margin: '20px' }}>
      <h1>Mappa concettuale</h1>
      <p className="hint">Incolla un testo di studio: viene generata una mappa concettuale in sola lettura.</p>

      <form onSubmit={handleSubmit} className="stack">
        <textarea
          rows={6}
          placeholder="Incolla qui il testo da trasformare in mappa..."
          value={testo}
          onChange={(e) => setTesto(e.target.value)}
          maxLength={4000}
          required
        />
        <button type="submit" className="btn" disabled={caricando}>Genera mappa</button>
      </form>

      {caricando && <div className="ai-loading">Generazione in corso...</div>}
      {errore && <div className="mindmap-error">{errore}</div>}

      {svg && (
        <div className="mindmap-preview mt-m" dangerouslySetInnerHTML={{ __html: svg }} />
      )}

      {contenutoMermaid && (
        <details className="bulk-details">
          <summary>Sintassi Mermaid generata</summary>
          <pre className="mindmap-code">{contenutoMermaid}</pre>
        </details>
      )}
    </div>
  )
}

export default Mappa
