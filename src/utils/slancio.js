function toDateKey(date) {
  const d = new Date(date)
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

export function calcolaSlancio(sessioni) {
  const giorniConStudio = new Set(
    sessioni.filter((s) => s.completata).map((s) => toDateKey(s.completata))
  )

  let cursore = new Date()
  if (!giorniConStudio.has(toDateKey(cursore))) {
    cursore.setDate(cursore.getDate() - 1)
  }

  let slancio = 0
  while (giorniConStudio.has(toDateKey(cursore))) {
    slancio++
    cursore.setDate(cursore.getDate() - 1)
  }

  return slancio
}

export function badgeRaggiunti(slancio) {
  const soglie = [3, 7, 14, 30]
  return soglie.filter((soglia) => slancio >= soglia)
}

export function settimanaCorrente(sessioni) {
  const giorniConStudio = new Set(
    sessioni.filter((s) => s.completata).map((s) => toDateKey(s.completata))
  )

  const oggi = new Date()
  const giornoSettimana = oggi.getDay() // 0=domenica, 1=lunedì, ... 6=sabato
  const offsetLunedi = giornoSettimana === 0 ? -6 : 1 - giornoSettimana
  const lunedi = new Date(oggi)
  lunedi.setDate(oggi.getDate() + offsetLunedi)

  const giorni = []
  for (let i = 0; i < 7; i++) {
    const giorno = new Date(lunedi)
    giorno.setDate(lunedi.getDate() + i)
    giorni.push({
      data: giorno,
      studiato: giorniConStudio.has(toDateKey(giorno)),
    })
  }
  return giorni
}